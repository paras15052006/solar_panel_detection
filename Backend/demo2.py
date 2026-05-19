from ultralytics import YOLO
import cv2
import numpy as np

model = YOLO("solarpd/runs/segment/train-2/weights/best.pt")

results = model.predict(
    source="spi3.png",

    conf=0.05,          # LOWER confidence
    imgsz=1280,         # BIGGER image size
    retina_masks=True,
    show_labels=False,
    show_conf=False,
    iou=0.30,           # less suppression
    save=True
)

img = cv2.imread("spi3.png")

total_panel_area = 0
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

            mask = cv2.resize(mask, (img.shape[1], img.shape[0]))

            binary_mask = (mask > 0.3).astype(np.uint8)

            area_pixels = np.sum(binary_mask)
            total_panel_area += area_pixels

            print(f"Panel {panel_count}: {area_pixels} pixels")

print("\nTotal Panels:", panel_count)
print("Total Area:", total_panel_area)