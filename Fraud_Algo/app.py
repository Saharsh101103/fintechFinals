from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np

# Load the trained fraud detection model
MODEL_PATH = "fraud_detection_model.pkl"
model = joblib.load(MODEL_PATH)

# Initialize FastAPI app
app = FastAPI()

# Define the request schema
class TransactionData(BaseModel):
    amount: float
    time: int
    v1: float
    v2: float
    v3: float
    # Add other necessary features based on your creditcard.csv dataset structure

# Health check route
@app.get("/")
def home():
    return {"message": "Fraud Detection API is running"}

# Fraud prediction route
@app.post("/predict")
def predict_fraud(data: TransactionData):
    try:
        # Convert input data into a numpy array
        input_features = np.array([[data.amount, data.time, data.v1, data.v2, data.v3]])
        
        # Make a prediction
        prediction = model.predict(input_features)[0]

        # Map prediction to human-readable response
        if prediction == 1:
            return {"fraud": True, "message": "Transaction is flagged as fraudulent"}
        else:
            return {"fraud": False, "message": "Transaction is legitimate"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing the request: {str(e)}")