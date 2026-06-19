from ultralytics import YOLO
import cv2
import numpy as np
import os

model = YOLO("solarpd/runs/segment/train-2/weights/best.pt")


def solar_area(image_path, square_meters_per_pixel):
    results = model.predict(
        source=image_path,
        conf=0.05,
        imgsz=1280,
        retina_masks=True,
        show_labels=False,
        show_conf=False,
        iou=0.30,
        save=True
    )

    img = cv2.imread(image_path)

    total_panel_area_pixels = 0
    total_panel_area_m2 = 0
    panel_count = 0

    for r in results:
        if r.masks is not None:
            masks = r.masks.data.cpu().numpy()
            classes = r.boxes.cls.cpu().numpy()

            for mask, cls in zip(masks, classes):
                class_name = r.names[int(cls)]

                if class_name != "solar-pv-panel":
                    continue

                panel_count += 1

                mask = cv2.resize(
                    mask,
                    (img.shape[1], img.shape[0])
                )

                binary_mask = (
                    mask > 0.3
                ).astype(np.uint8)

                # Blue overlay for solar panels
                colored_mask = np.zeros_like(img)
                colored_mask[:, :, 0] = binary_mask * 255

                img = cv2.addWeighted(
                    img,
                    1.0,
                    colored_mask,
                    0.5,
                    0
                )

                area_pixels = np.sum(binary_mask)

                area_m2 = (
                    area_pixels *
                    square_meters_per_pixel
                )

                total_panel_area_pixels += area_pixels
                total_panel_area_m2 += area_m2

    output_path = os.path.join(
        "outputs",
        "solar_result.png"
    )

    cv2.imwrite(
        output_path,
        img
    )

    return {
        "panel_count": int(panel_count),
        "solar_pixels": int(total_panel_area_pixels),
        "solar_area_m2": float(total_panel_area_m2),
        "solar_image": output_path
    }