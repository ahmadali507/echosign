import requests
import mediapipe as mp
import os
from mediapipe.tasks.python import vision

# Create a GestureRecognizer object.
model_path = os.path.abspath("./model/rock_paper_scissors.task")
recognizer = vision.GestureRecognizer.create_from_model_path(model_path)

# Load the input image.
image_path = 'test.jpg'
image = mp.Image.create_from_file(image_path)

# Run gesture recognition.
recognition_result = recognizer.recognize(image)

# Display the most likely gesture.
top_gesture = recognition_result.gestures[0][0]
print(f"Gesture recognized: {top_gesture.category_name} ({top_gesture.score})")

# Set up the URL for the API endpoint
url = "http://127.0.0.1:8000/detect"

# Set up the payload for the POST request
files = {'image': open(image_path, 'rb')}  # Pass the image file directly without encoding

# Send the POST request
response = requests.post(url, files=files)

# Check if the request was successful
if response.status_code == 200:
    # Print the response from the server
    print("Response from server:", response.json())
else:
    print("Error:", response.status_code)
