# Backend ML - CVD Prediction
An ML API to predict the risk of developing cardiovascular disease based on daily habits.

## API Endpoint
**Get a CVD Prediction** <br>
Endpoint: <br>
```
POST /predict 
```
Request Body Example: <br>
```JSON
{
    "DIABETE4": 0,
    "BPHIGH6": 0,
    "GENHLTH": 5, 
    "MENTHLTH": 10, 
    "CHECKUP1": 4, 
    "EXERANY2": 1, 
    "TOLDHI3": 1, 
    "_AGE80": 11, 
    "WEIGHT2": 60, 
    "HEIGHT3": 170, 
    "SMOKE100": 1, 
    "USENOW3": 0, 
    "ECIGNOW1": 0, 
    "ALCDAY5": 10, 
    "AVEDRNK3": 6, 
    "MAXDRNKS": 10, 
    "FRUIT2": 12, 
    "FRUITJU2": 5, 
    "FVGREEN1": 30, 
    "FRENCHF1": 10, 
    "POTATOE1": 10, 
    "VEGETAB2": 15, 
    "SEXVAR":1
}
```

## Encoding Notes:
- DIABETE4:
    - No: 0
    - No but Borderline Diabetes: 1
    - Yes: 2
    - Yes but female told only during pregnancy:3
- BPHIGH6:
    - No: 0
    - Told Borderline High BP: 1
    - Yes: 2
    - Yes but female told only during pregnancy: 3
- GENHLTH:
    - Excellent: 4
    - Very Good: 3
    - Good: 2
    - Fair: 1
    - Poor: 0
- CHECKUP1:
    - Within the past year: 4
    - Within the past 2 years: 3
    - Within the past 5 years: 2
    - 5 or more years ago: 1
    - Never: 0
- ECIGNOW1:
    - Every Day: 3
    - Some Days: 2
    - Never used e-cigs: 1
    - Not at all: 0
- USENOW3:
    - Every Day: 2
    - Some Days: 1
    - Not at all: 0 
- SEXVAR:
    - Male: 1
    - Female: 0

## How to Run
### Prequisites
1. Make sure docker is installed on your computer
2. Make a local copy of this project on your computer
```shell
git clone https://github.com/bagusrakaop/HealAssist
```

3. Open project directory 
```shell
cd HealAssist
```

4. Open ml-backend directory
```shell
cd ml-backend
```

5. Run backend ml API (at localhost:5000)
```shell
docker build -t cvd-prediction .
docker run -p 5000:5000 cvd-prediction
```