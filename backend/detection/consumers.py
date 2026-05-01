import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .detector import YOLOv8Detector
import asyncio

class DetectionConsumer(AsyncWebsocketConsumer):
    detector = None

    async def connect(self):
        await self.accept()
        # Initialize detector if not already done (singleton-like or instance per connection)
        if DetectionConsumer.detector is None:
            # We initialize it here to avoid blocking startup
            # In a real app, you might want to do this in a thread or separate process
            DetectionConsumer.detector = YOLOv8Detector()
        
        await self.send(text_data=json.dumps({
            'message': 'Connected to AI Detection Server'
        }))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            frame = data.get('frame')
            
            if frame:
                # Run detection in a thread to avoid blocking the async loop
                loop = asyncio.get_event_loop()
                detections = await loop.run_in_executor(None, self.detector.detect, frame)
                
                await self.send(text_data=json.dumps({
                    'detections': detections
                }))
        except Exception as e:
            print(f"WS Receive Error: {e}")
            await self.send(text_data=json.dumps({
                'error': str(e)
            }))
