from fastapi import FastAPI, UploadFile, File, Form
import shutil
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from demo import roof_area
from demo2 import solar_area

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
@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    square_meters_per_pixel: float = Form(...)
):

    image_path = f"uploads/{file.filename}"

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    roof_result = roof_area(
        image_path,
        square_meters_per_pixel
    )

    solar_result = solar_area(
        image_path,
        square_meters_per_pixel
    )

    return {
        "roof_area_m2": roof_result["roof_area_m2"],
        "roof_pixels": roof_result["roof_pixels"],
        "solar_area_m2": solar_result["solar_area_m2"],
        "solar_pixels": solar_result["solar_pixels"],
        "panel_count": solar_result["panel_count"],

        "roof_image":
            "http://127.0.0.1:8000/outputs/roof_result.png",

        "solar_image":
            "http://127.0.0.1:8000/outputs/solar_result.png"
    }