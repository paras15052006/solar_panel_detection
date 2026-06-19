from fastapi import FastAPI, UploadFile, File, Form
import shutil
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from demo import roof_area
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
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    square_meters_per_pixel: float = Form(...),
):
    # Save upload
    image_path = f"uploads/{file.filename}"
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run roof analysis
    roof_result = roof_area(
        image_path,
        square_meters_per_pixel,
    )

    # Run solar panel detection
    solar_result = solar_area(
        image_path,
        square_meters_per_pixel,
    )

    # Build response
    return {
        "detected_panels": solar_result["panel_count"],
        "solar_area_m2": solar_result["solar_area_m2"],
        "roof_area_m2": roof_result["roof_area_m2"],
        "max_panels_possible": roof_result["panel_count"],
        "roof_solar_area_m2": roof_result["solar_area_m2"],
        "roof_image": "http://127.0.0.1:8000/outputs/roof_result.png",
        "solar_image": "http://127.0.0.1:8000/outputs/solar_result.png",
    }