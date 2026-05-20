from ultralytics import YOLO
import cv2
import numpy as np

model = YOLO("solarpd/runs/segment/train-2/weights/best.pt")

results = model.predict(
    source="spi3.png",
    conf=0.05,
    imgsz=1280,
    retina_masks=True,
    show_labels=False,
    show_conf=False,
    iou=0.30,
    save=True
)

img = cv2.imread("spi3.png")

# USER INPUT
square_meters_per_pixel = float(
    input("Enter square meters per pixel: ")
)

total_panel_area_pixels = 0
total_panel_area_m2 = 0
panel_count = 0

for r in results:

    if r.masks is not None:

        masks = r.masks.data.cpu().numpy()
        classes = r.boxes.cls.cpu().numpy()

        for i, (mask, cls) in enumerate(zip(masks, classes)):

            class_name = r.names[int(cls)]

            if class_name != "solar-pv-panel":
                continue

            panel_count += 1

            mask = cv2.resize(
                mask,
                (img.shape[1], img.shape[0])
            )

            binary_mask = (mask > 0.3).astype(np.uint8)

            # Pixel area
            area_pixels = np.sum(binary_mask)

            # Convert to m²
            area_m2 = (
                area_pixels *
                square_meters_per_pixel
            )

            total_panel_area_pixels += area_pixels
            total_panel_area_m2 += area_m2

            print(f"\nPanel {panel_count}")
            print(f"Pixels: {area_pixels}")
            print(f"Area: {area_m2:.2f} m²")

print("\n===================")
print("TOTAL SOLAR AREA")
print("===================")
print(f"Total Panels: {panel_count}")
print(f"Total Pixels: {total_panel_area_pixels}")
print(f"Total Area: {total_panel_area_m2:.2f} m²")