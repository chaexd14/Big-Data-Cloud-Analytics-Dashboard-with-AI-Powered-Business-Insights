import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler

# Load dataset
file_path = 'raw/food_delivery.csv'
df = pd.read_csv(file_path)

# Clean column names (important safety step)
df.columns = df.columns.str.strip().str.lower()

# =============================
# HANDLE MISSING VALUES
# =============================

# Rating cleanup
if df['rating'].isnull().sum() > 0:
    df['rating'].fillna(df['rating'].mean(), inplace=True)

# Restaurant name cleanup
df = df.dropna(subset=['restaurant_name'])

# Price cleanup (important for ML/analysis)
if df['price'].isnull().sum() > 0:
    df['price'].fillna(df['price'].median(), inplace=True)

# =============================
# OUTLIER REMOVAL (PRICE)
# =============================

q1 = df['price'].quantile(0.25)
q3 = df['price'].quantile(0.75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

df = df[(df['price'] >= lower_bound) & (df['price'] <= upper_bound)]

# =============================
# FEATURE ENGINEERING
# =============================

# Normalize price
scaler = MinMaxScaler()
df['normalized_price'] = scaler.fit_transform(df[['price']])

# Convert dates
df['order_date'] = pd.to_datetime(df['order_date'], errors='coerce')
df['last_order_date'] = pd.to_datetime(df['last_order_date'], errors='coerce')

# =============================
# EXPORT CLEANED DATA
# =============================

output_path = 'cleaned/cleaned_food_delivery.csv'
df.to_csv(output_path, index=False)

print("Data cleaning completed successfully!")
print(df.head())