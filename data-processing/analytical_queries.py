import pandas as pd

# Load cleaned dataset
file_path = 'cleaned/cleaned_food_delivery.csv'
df = pd.read_csv(file_path)

query1 = df.groupby('category')['rating'].mean().sort_values(ascending=False)

print('\nHighest Average Rating Per Category')
print(query1)

query2 = df.groupby('city').size().sort_values(ascending=False)

print('\nTotal Orders Per City')
print(query2)

df['order_value'] = df['price'] * df['quantity']

query3 = df.nlargest(5, 'order_value')

print('\nTop 5 Highest Orders')
print(query3[['restaurant_name', 'order_value']])