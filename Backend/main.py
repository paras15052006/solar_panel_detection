from fastapi import FastAPI, UploadFile, File, Form
import shutil
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import Optional

from demo import roof_area, PANEL_SPECS
from demo2 import solar_area
import os

os.makedirs("uploads", exist_ok=True)
os.makedirs("outputs", exist_ok=True)

app = FastAPI()

app.mount(
    "/outputs",
    StaticFiles(directory="outputs"),
    name="outputs"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Optional: expose available panel specs to the frontend ────────────
@app.get("/panel-specs")
def get_panel_specs():
    """Returns all available panel keys + their labels."""
    return {
        key: {
            "label":         spec["label"],
            "outer_area_m2": round(spec["outer_l"] * spec["outer_w"], 4),
            "active_area_m2":round(spec["active_l"] * spec["active_w"], 4),
            "nominal_area_m2":round(spec["nominal_l"] * spec["nominal_w"], 4),
        }
        for key, spec in PANEL_SPECS.items()
    }


@app.post("/analyze")
async def analyze(
    file:                    UploadFile = File(...),
    square_meters_per_pixel: float      = Form(...),

    # New optional params — frontend can send these or rely on defaults
    panel_key:  Optional[str]   = Form("2300x1200"),
    area_mode:  Optional[str]   = Form("outer"),     # outer | active | nominal
    threshold:  Optional[float] = Form(0.5),
):
    # ── Save upload ───────────────────────────────────────────────────
    image_path = f"uploads/{file.filename}"
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # ── Validate panel_key early so error is clear ────────────────────
    if panel_key not in PANEL_SPECS:
        from fastapi import HTTPException
        raise HTTPException(
            status_code=400,
            detail=f"Unknown panel_key '{panel_key}'. "
                   f"Available: {list(PANEL_SPECS.keys())}"
        )

    # ── Run models ────────────────────────────────────────────────────
    roof_result  = roof_area(
        image_path,
        square_meters_per_pixel,
        panel_key=panel_key,
        area_mode=area_mode,
        threshold=threshold,
    )

    solar_result = solar_area(
        image_path,
        square_meters_per_pixel,
    )

    # ── Build response ────────────────────────────────────────────────
    return {
        # ── Roof ──────────────────────────────────────────────────────
        "roof_area_m2":   roof_result["roof_area_m2"],
        "roof_pixels":    roof_result["roof_pixels"],

        # ── Panel calculation (primary, based on area_mode) ───────────
        "panel_key":      roof_result["panel_key"],
        "area_mode":      roof_result["area_mode"],
        "panel_area_m2":  roof_result["panel_area_m2"],
        "panel_count":    roof_result["panel_count"],
        "solar_area_m2":  roof_result["solar_area_m2"],

        # ── Breakdown across all 3 dimension types ─────────────────────
        "dimension_breakdown": roof_result["dimension_breakdown"],
        # e.g. {
        #   "outer":   { "panel_area_m2": 2.5618, "panel_count": 12, "solar_area_m2": 30.74 },
        #   "active":  { "panel_area_m2": 1.3860, "panel_count": 22, "solar_area_m2": 30.49 },
        #   "nominal": { "panel_area_m2": 2.7600, "panel_count": 11, "solar_area_m2": 30.36 },
        # }

        # ── Solar detection (from demo2) ───────────────────────────────
        "solar_pixels":   solar_result["solar_pixels"],

        # ── Image URLs ────────────────────────────────────────────────
        "roof_image":     "http://127.0.0.1:8000/outputs/roof_result.png",
        "solar_image":    "http://127.0.0.1:8000/outputs/solar_result.png",
    }