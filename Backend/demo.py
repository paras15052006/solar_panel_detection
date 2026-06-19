from ultralytics import YOLO
import cv2
import numpy as np
import os

model = YOLO("runs/segment/train-6/weights/best.pt")

# ── Panel spec library (all dims in metres) ───────────────────────────
PANEL_SPECS = {
    "2300x1200": {
        "label": "2300 × 1200 mm (Nominal)",
        "outer_l": 2.266,
        "outer_w": 1.133,
        "active_l": 1.400,
        "active_w": 0.990,
        "frame_short": 0.035,
        "frame_long": 0.035,
        "nominal_l": 2.300,
        "nominal_w": 1.200,
    },
}

AREA_MODE = "outer"


def get_panel_area(spec: dict, mode: str) -> float:
    """Return panel area in m² for the chosen dimension mode."""
    if mode == "active":
        return spec["active_l"] * spec["active_w"]
    elif mode == "nominal":
        return spec["nominal_l"] * spec["nominal_w"]
    else:  # "outer"
        return spec["outer_l"] * spec["outer_w"]


def count_panels(roof_area_m2: float, panel_area_m2: float,
                 threshold: float = 0.5) -> tuple[int, float]:
    """
    Count how many panels fit on the roof.
    Returns (panel_count, solar_area_m2).
    """
    full_panels = int(roof_area_m2 / panel_area_m2)
    leftover = roof_area_m2 - full_panels * panel_area_m2

    panel_count = full_panels + (1 if leftover >= threshold * panel_area_m2 else 0)
    solar_area_m2 = panel_count * panel_area_m2
    return panel_count, solar_area_m2


def roof_area(
    image_path: str,
    square_meters_per_pixel: float,
    panel_key: str = "2300x1200",
    area_mode: str = AREA_MODE,
    threshold: float = 0.5,
):
    results = model.predict(
        source=image_path,
        conf=0.20,
        imgsz=640,
        retina_masks=True,
        save=True
    )

    img = cv2.imread(image_path)

    total_roof_pixels = 0
    total_roof_area_m2 = 0.0

    for r in results:
        if r.masks is None:
            continue

        masks = r.masks.data.cpu().numpy()
        classes = r.boxes.cls.cpu().numpy()

        for mask, cls in zip(masks, classes):
            if r.names[int(cls)] != "roof":
                continue

            mask = cv2.resize(mask, (img.shape[1], img.shape[0]))
            binary_mask = (mask > 0.5).astype(np.uint8)

            colored_mask = np.zeros_like(img)
            colored_mask[:, :, 1] = binary_mask * 255
            img = cv2.addWeighted(img, 1.0, colored_mask, 0.5, 0)

            total_roof_pixels += int(np.sum(binary_mask))
            total_roof_area_m2 += float(np.sum(binary_mask)) * square_meters_per_pixel

    # ── Panel calculations ────────────────────────────────────────────
    spec = PANEL_SPECS[panel_key]
    panel_area_m2 = get_panel_area(spec, area_mode)
    panel_count, solar_area_m2 = count_panels(
        total_roof_area_m2, panel_area_m2, threshold
    )

    output_path = os.path.join("outputs", "roof_result.png")
    cv2.imwrite(output_path, img)

    return {
        "roof_pixels": total_roof_pixels,
        "roof_area_m2": round(total_roof_area_m2, 2),
        "panel_key": panel_key,
        "area_mode": area_mode,
        "panel_area_m2": round(panel_area_m2, 4),
        "panel_count": panel_count,
        "solar_area_m2": round(solar_area_m2, 2),
    }