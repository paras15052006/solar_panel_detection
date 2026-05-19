from ultralytics import YOLO
import cv2
import numpy as np

model = YOLO("runs/segment/train-6/weights/best.pt")

results = model.predict(
    source="spi8.png",
    conf=0.10,
    imgsz=640,
    retina_masks=True,
    save=True
)

img = cv2.imread("spi8.png")

total_roof_area = 0

for r in results:

    if r.masks is not None:

        masks = r.masks.data.cpu().numpy()
        classes = r.boxes.cls.cpu().numpy()   # ✅ class ids

        for i, (mask, cls) in enumerate(zip(masks, classes)):

            class_name = r.names[int(cls)]   # get label name

            # ✅ ONLY ROOFS
            if class_name != "roof":
                continue

            mask = cv2.resize(mask, (img.shape[1], img.shape[0]))
            binary_mask = (mask > 0.5).astype(np.uint8)

            area_pixels = np.sum(binary_mask)
            total_roof_area += area_pixels

            print(f"Roof {i+1} Area (pixels): {area_pixels}")

            # optional overlay
            colored_mask = np.zeros_like(img)
            colored_mask[:, :, 0] = binary_mask * 255
            img = cv2.addWeighted(img, 1.0, colored_mask, 0.5, 0)

print("\nTotal Roof Area (pixels):", total_roof_area)