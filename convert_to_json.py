# -*- coding: utf-8 -*-
import pandas as pd
import json
import os
import sys
import re

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# قراءة الملف
desktop = os.path.join(os.path.expanduser('~'), 'Desktop')
file_path = os.path.join(desktop, 'مخزون عمان - نظيف.xlsx')
df = pd.read_excel(file_path)

# استخراج الرقم من السعر
def extract_price(price_str):
    if pd.isna(price_str):
        return 0
    match = re.search(r'(\d+\.?\d*)', str(price_str))
    return float(match.group(1)) if match else 0

# تطبيق القواعد
products = []
for idx, row in df.iterrows():
    current_price = extract_price(row.get('price', ''))
    
    # حساب sale_price
    if current_price < 10:
        sale_price = current_price + 15
        new_price = current_price + 20
    else:
        sale_price = current_price + 20
        new_price = current_price + 30
    
    # تقسيم الصور
    gallery = []
    if pd.notna(row.get('gallery-src')):
        gallery = [img.strip() for img in str(row['gallery-src']).split(',') if img.strip()]
    
    product = {
        'id': idx + 1,
        'name': row.get('name', ''),
        'price': f"{new_price} ريال عماني",
        'sale_price': f"{sale_price} ريال عماني",
        'mainImage': row.get('mainImage-src', ''),
        'gallery': gallery,
        'description': row.get('description', '')
    }
    products.append(product)

# حفظ JSON
output_path = os.path.join(desktop, 'oman-ma5zoon-products.json')
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f"JSON file created: {output_path}")
print(f"Total products: {len(products)}")
