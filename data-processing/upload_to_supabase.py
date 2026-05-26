import pandas as pd
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../backend/.env"))

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def parse_delivery_time(date_value):
    """Convert order_date string to elapsed minutes (int).
    Returns None if parsing fails.
    """
    try:
        dt = pd.to_datetime(date_value, utc=True)
        now = pd.Timestamp.now('UTC')
        delta = now - dt
        minutes = int(delta.total_seconds() // 60)
        return minutes
    except Exception:
        return None

def parse_age(age_value):
    """Convert age strings to numeric values.
    Handles numeric strings and known categories.
    Returns None for unknown values.
    """
    mapping = {"Adult": 30, "Senior": 65, "Teenager": 21}
    if isinstance(age_value, (int, float)):
        return int(age_value)
    age_str = str(age_value).strip()
    if age_str.isdigit():
        return int(age_str)
    return mapping.get(age_str, None)

# Load cleaned dataset
csv_file = 'cleaned/cleaned_food_delivery.csv'
df = pd.read_csv(csv_file)

# Upload each row
for _, row in df.iterrows():
    data = {
        'restaurant': row['restaurant_name'],
        'city': row['city'],
        'rating': float(row['rating']),
        'delivery_time': parse_delivery_time(row['order_date']),
        'order_value': float(row['price']),
        'category': row['category'],
        'customer_age': parse_age(row['age'])
    }

    supabase.table('food_delivery').insert(data).execute()

print('Dataset uploaded successfully!')