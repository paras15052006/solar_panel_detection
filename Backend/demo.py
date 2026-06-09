from ultralytics import YOLO
import cv2
import numpy as np
import os

model = YOLO("runs/segment/train-6/weights/best.pt")

# ── Panel spec library (all dims in metres) ───────────────────────────
# Add as many panel types as you have datasheets for
PANEL_SPECS = {
    "2300x1200": {
        "label":          "2300 × 1200 mm (Nominal)",
        "outer_l":        2.266,   # 2266±2 mm — actual outer frame
        "outer_w":        1.133,   # 1133±2 mm
        "active_l":       1.400,   # active cell area length
        "active_w":       0.990,   # active cell area width
        "frame_short":    0.035,   # frame width, short side
        "frame_long":     0.035,   # frame width, long side
        "nominal_l":      2.300,   # nameplate / label size
        "nominal_w":      1.200,
    },
    # Example — add more from other datasheets:
    # "1755x1038": {
    #     "label":      "1755 × 1038 mm",
    #     "outer_l":    1.755,
    #     "outer_w":    1.038,
    #     "active_l":   1.686,
    #     "active_w":   0.990,
    #     "frame_short": 0.035,
    #     "frame_long":  0.035,
    #     "nominal_l":  1.755,
    #     "nominal_w":  1.038,
    # },
}

# Which area to use for installation calculations:
#   "outer"   → full frame footprint (how much roof space one panel occupies)
#   "active"  → photovoltaic cell area only (for energy yield calculations)
#   "nominal" → nameplate size (simpler / quoted in spec sheets)
AREA_MODE = "outer"


def get_panel_area(spec: dict, mode: str) -> float:
    """Return panel area in m² for the chosen dimension mode."""
    if mode == "active":
        return spec["active_l"] * spec["active_w"]
    elif mode == "nominal":
        return spec["nominal_l"] * spec["nominal_w"]
    else:  # "outer" — default, use for roof-space planning
        return spec["outer_l"] * spec["outer_w"]


def count_panels(roof_area_m2: float, panel_area_m2: float,
                 threshold: float = 0.5) -> tuple[int, float]:
    """
    Given a roof area and a single panel footprint:
      - full_panels  : panels that fit completely
      - leftover     : remaining roof area after full panels
      - if leftover >= threshold × panel_area → add 1 (partial panel counts)
    Returns (panel_count, solar_area_m2).
    """
    full_panels   = int(roof_area_m2 / panel_area_m2)
    leftover      = roof_area_m2 - full_panels * panel_area_m2

    panel_count   = full_panels + (1 if leftover >= threshold * panel_area_m2 else 0)
    solar_area_m2 = panel_count * panel_area_m2
    return panel_count, solar_area_m2


def roof_area(
    image_path: str,
    square_meters_per_pixel: float,
    panel_key: str  = "2300x1200",   # which panel spec to use
    area_mode: str  = AREA_MODE,     # "outer" | "active" | "nominal"
    threshold: float = 0.5,          # leftover fraction to round up
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

        masks   = r.masks.data.cpu().numpy()
        classes = r.boxes.cls.cpu().numpy()

        for mask, cls in zip(masks, classes):
            if r.names[int(cls)] != "roof":
                continue

            mask        = cv2.resize(mask, (img.shape[1], img.shape[0]))
            binary_mask = (mask > 0.5).astype(np.uint8)

            colored_mask            = np.zeros_like(img)
            colored_mask[:, :, 1]  = binary_mask * 255
            img = cv2.addWeighted(img, 1.0, colored_mask, 0.5, 0)

            total_roof_pixels  += int(np.sum(binary_mask))
            total_roof_area_m2 += float(np.sum(binary_mask)) * square_meters_per_pixel

    # ── Panel calculations ────────────────────────────────────────────
    spec           = PANEL_SPECS[panel_key]
    panel_area_m2  = get_panel_area(spec, area_mode)
    panel_count, solar_area_m2 = count_panels(
        total_roof_area_m2, panel_area_m2, threshold
    )

    # ── Breakdown across every dimension type ─────────────────────────
    dimension_breakdown = {
        dim: {
            "panel_area_m2": round(get_panel_area(spec, dim), 4),
            "panel_count":   count_panels(total_roof_area_m2,
                                          get_panel_area(spec, dim),
                                          threshold)[0],
            "solar_area_m2": round(count_panels(total_roof_area_m2,
                                                get_panel_area(spec, dim),
                                                threshold)[1], 2),
        }
        for dim in ("outer", "active", "nominal")
    }
    # ─────────────────────────────────────────────────────────────────

    output_path = os.path.join("outputs", "roof_result.png")
    cv2.imwrite(output_path, img)

    return {
        "roof_pixels":          total_roof_pixels,
        "roof_area_m2":         round(total_roof_area_m2, 2),

        # Primary result (uses selected area_mode)
        "panel_key":            panel_key,
        "area_mode":            area_mode,
        "panel_area_m2":        round(panel_area_m2, 4),
        "panel_count":          panel_count,
        "solar_area_m2":        round(solar_area_m2, 2),

        # Full breakdown so the caller can compare all dimension types
        "dimension_breakdown":  dimension_breakdown,

        "roof_image":           output_path,
    }