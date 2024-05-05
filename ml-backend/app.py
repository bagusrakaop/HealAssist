from flask import Flask, request, jsonify
from catboost import CatBoostClassifier
import pandas as pd

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    # Model definition
    model = CatBoostClassifier()
    model.load_model("./cb_model")

    # Parse data to json
    data = request.get_json()

    # Define simplified keys and their mappings to detailed keys
    keys_mapping = {
        "DIABETE4": ["DIABETE4_No", "DIABETE4_No but Borderline Diabetes", "DIABETE4_Yes", "DIABETE4_Yes but female told only during pregnancy"],
        "BPHIGH6": ["BPHIGH6_No", "BPHIGH6_Told Borderline High BP", "BPHIGH6_Yes", "BPHIGH6_Yes but female told only during pregnancy"]
    }

    # Create detailed data dictionary including other data
    detailed_data = {}
    for key, detailed_keys in keys_mapping.items():
        detailed_value = [data.get(detailed_key, 0) for detailed_key in detailed_keys]
        detailed_data.update(zip(detailed_keys, detailed_value))

    # Update detailed_data with other data
    detailed_data.update((key, value) for key, value in data.items() if key not in keys_mapping)

    # Create DataFrame
    X = pd.DataFrame(detailed_data, index=[0])

    # Add BMI to data
    X['BMI'] = X['WEIGHT2']/((X['HEIGHT3']/100)**2)
    
    # Make a prediction
    preds = model.predict(X)
    
    # Response variable
    res = {"CVD Prediction": int(preds[0])}

    return jsonify(res)

if __name__=="__main__":
    app.run(host="0.0.0.0")