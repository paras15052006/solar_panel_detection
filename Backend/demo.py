from ultralytics import YOLO
import cv2
import numpy as np

# Load trained model
model = YOLO("runs/segment/train-6/weights/best.pt")

# Run prediction
results = model.predict(
    source="spi8.png",
    conf=0.20,
    imgsz=640,
    retina_masks=True,
    save=True
)

# Read original image
img = cv2.imread("spi8.png")

# User input: square meters represented by ONE pixel
square_meters_per_pixel = float(
    input("Enter square meters per pixel: ")
)

total_roof_area_pixels = 0
total_roof_area_m2 = 0

for r in results:

    # Check if masks exist
    if r.masks is not None:

        masks = r.masks.data.cpu().numpy()
        classes = r.boxes.cls.cpu().numpy()

        for i, (mask, cls) in enumerate(zip(masks, classes)):

            # Get class name
            class_name = r.names[int(cls)]

            # ONLY process roofs
            if class_name != "roof":
                continue

            # Resize mask to original image size
            mask = cv2.resize(mask, (img.shape[1], img.shape[0]))

            # Convert mask to binary
            binary_mask = (mask > 0.5).astype(np.uint8)

            # Count roof pixels
            area_pixels = np.sum(binary_mask)

            # Convert to square meters
            area_m2 = area_pixels * square_meters_per_pixel

            # Add totals
            total_roof_area_pixels += area_pixels
            total_roof_area_m2 += area_m2

            # Print individual roof area
            print(f"\nRoof {i+1}")
            print(f"Area (pixels): {area_pixels}")
            print(f"Area (m²): {area_m2:.2f}")

            # Optional overlay visualization
            colored_mask = np.zeros_like(img)
            colored_mask[:, :, 1] = binary_mask * 255

            img = cv2.addWeighted(
                img,
                1.0,
                colored_mask,
                0.5,
                0
            )

# Final totals
print("\n==============================")
print("TOTAL ROOF AREA")
print("==============================")
print(f"Total Pixels: {total_roof_area_pixels}")
print(f"Total Area: {total_roof_area_m2:.2f} m²")

# Save result image
cv2.imwrite("roof_area_result.png", img)
