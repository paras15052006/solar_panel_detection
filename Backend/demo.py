from ultralytics import YOLO
import cv2
import numpy as np
import os

# Load trained model
model = YOLO("runs/segment/train-6/weights/best.pt")


def roof_area(image_path, square_meters_per_pixel):

    # Run prediction
    results = model.predict(
        source=image_path,
        conf=0.20,
        imgsz=640,
        retina_masks=True,
        save=True
    )

    # Read original image
    img = cv2.imread(image_path)

    total_roof_area_pixels = 0
    total_roof_area_m2 = 0

    for r in results:

        if r.masks is not None:

            masks = r.masks.data.cpu().numpy()
            classes = r.boxes.cls.cpu().numpy()

            for mask, cls in zip(masks, classes):

                class_name = r.names[int(cls)]

                if class_name != "roof":
                    continue

                mask = cv2.resize(
                    mask,
                    (img.shape[1], img.shape[0])
                )

                binary_mask = (
                    mask > 0.5
                ).astype(np.uint8)

                # Green overlay for roofs
                colored_mask = np.zeros_like(img)
                colored_mask[:, :, 1] = binary_mask * 255

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

                total_roof_area_pixels += area_pixels
                total_roof_area_m2 += area_m2

    output_path = os.path.join(
        "outputs",
        "roof_result.png"
    )

    cv2.imwrite(
        output_path,
        img
    )

    return {
        "roof_pixels": int(total_roof_area_pixels),
        "roof_area_m2": float(total_roof_area_m2),
        "roof_image": output_path
    }