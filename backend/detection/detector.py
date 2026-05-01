import cv2
import numpy as np
from ultralytics import YOLO
import base64
from PIL import Image
import io

class YOLOv8Detector:
    def __init__(self, model_path='yolov8n.pt'):
        # This will download the model automatically on first run
        self.model = YOLO(model_path)

    def detect(self, frame_base64):
        """
        Receives a base64 encoded image frame and returns detections.
        """
        try:
            # Handle data:image/jpeg;base64,... prefix
            if ',' in frame_base64:
                frame_base64 = frame_base64.split(',')[1]
            
            img_data = base64.b64decode(frame_base64)
            img = Image.open(io.BytesIO(img_data))
            img = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
            
            # Run inference
            results = self.model(img, stream=False)
            
            detections = []
            for result in results:
                for box in result.boxes:
                    # Get coordinates
                    x1, y1, x2, y2 = box.xyxy[0].tolist()
                    conf = float(box.conf[0])
                    cls = int(box.cls[0])
                    label = self.model.names[cls]
                    
                    detections.append({
                        'bbox': [x1, y1, x2, y2],
                        'confidence': conf,
                        'label': label
                    })
            return detections
        except Exception as e:
            print(f"Detection error: {e}")
            return []
