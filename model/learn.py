from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mediapipe.tasks.python import vision
import mediapipe as mp
import os
import numpy as np
import io
from PIL import Image

app = FastAPI()

# Define a global variable to hold the model
recognizer = None

# Define a startup event handler to load the model
@app.on_event("startup")
async def load_model():
    global recognizer
    model_path = os.path.abspath("./model/rock_paper_scissors.task")
    recognizer = vision.GestureRecognizer.create_from_model_path(model_path)
    if recognizer:
        print("Model loaded successfully.")
    else:
        print("Failed to load the model.")

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://localhost:5173/dashboard",
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
@app.post("/detect")
async def detect_gesture(image: UploadFile = File(None)):
    print("Received image:", image)

    if not recognizer:
        raise HTTPException(status_code=500, detail="Model not loaded.")

    if not image:
        raise HTTPException(status_code=400, detail="No image provided.")
    
    try:
        # Read image file
        contents = await image.read()
        print("Image contents read successfully.")

        # Convert the bytes to a PIL Image object
        pil_image = Image.open(io.BytesIO(contents))
        print("Image converted to PIL Image successfully.")

        # Convert the PIL Image to a numpy array
        numpy_image = np.array(pil_image)
        print("PIL Image converted to numpy array successfully.")
        print(numpy_image); 

        # Ensure the numpy array has the correct data type (uint8)
        if numpy_image.dtype != np.uint8:
            numpy_image = numpy_image.astype(np.uint8)
        print("Numpy array data type verified.")

        # Create an mp.Image object from the numpy array
        image_data = mp.Image(image_format=mp.ImageFormat.SRGB, data=numpy_image)
        print("mp.Image object created successfully.")

        # Run gesture recognition
        recognition_result = recognizer.recognize(image_data)
        print("Gesture recognition successful.")

        # Get the top gesture
        top_gesture = recognition_result.gestures[0][0]

        # Return the response
        return {"gesture": top_gesture.category_name, "score": top_gesture.score}
    except Exception as e:
        print("Error processing image data:", e)
        raise HTTPException(status_code=500, detail="Error processing image data.")
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
