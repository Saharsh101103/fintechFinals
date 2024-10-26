import os  # New import to check for file existence
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import joblib  # For saving and loading the model

# Check if the model is already saved
MODEL_PATH = "fraud_detection_model.pkl"

if os.path.exists(MODEL_PATH):
    print("Loading saved model...")
    best_model = joblib.load(MODEL_PATH)
else:
    print("Training a new model...")

    # Load the dataset
    data = pd.read_csv("creditcard.csv")

    # Display the first 5 rows to confirm it loaded correctly
    print("First 5 rows of the dataset:\n", data.head())

    # Step 1: Check for missing values
    print("Missing values in each column:\n", data.isnull().sum())

    # Step 2: Normalize the feature columns
    X = data.drop("Class", axis=1)  # Assuming 'Class' is the target variable
    y = data["Class"]

    # Normalize the features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    print("Data normalization complete.")

    # Step 3: Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    # Step 4: Train the model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Step 5: Hyperparameter tuning using GridSearchCV
    param_grid = {
        'n_estimators': [100, 200],
        'max_features': ['auto', 'sqrt', 'log2'],
        'max_depth': [None, 10, 20, 30],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4]
    }

    grid_search = GridSearchCV(estimator=model, param_grid=param_grid, cv=3, n_jobs=-1, verbose=2)
    grid_search.fit(X_train, y_train)

    print("Best parameters found: ", grid_search.best_params_)

    # Train the model with the best parameters
    best_model = grid_search.best_estimator_

    # Save the best model
    joblib.dump(best_model, MODEL_PATH)
    print(f"Model saved as {MODEL_PATH}")

# Step 6: Make predictions and evaluate the model
y_pred_best = best_model.predict(X_test)

print("Confusion Matrix for Best Model:\n", confusion_matrix(y_test, y_pred_best))
print("Classification Report for Best Model:\n", classification_report(y_test, y_pred_best))
