# -*- coding: utf-8 -*-
import pandas as pd
import os
import sys

# Fix encoding for Windows console
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# قراءة الملف
file_path = r"C:\Users\sherow\Desktop\مخزون عمان.xlsx"
df = pd.read_excel(file_path)

print("Column names:")
print(df.columns.tolist())
print(f"\nTotal rows: {len(df)}")
print(f"\nFirst few rows:")
print(df[['name', 'price', 'gallery-src']].head(10))

# تجميع الصفوف بناءً على name و price
group_cols = ['name', 'price']

# تجميع كل الأعمدة
agg_dict = {}
for col in df.columns:
    if col not in group_cols:
        if 'gallery' in col.lower() or 'image' in col.lower():
            # جمع الصور بفواصل
            agg_dict[col] = lambda x: ', '.join([str(i) for i in x if pd.notna(i) and str(i).strip() != ''])
        else:
            # أخذ أول قيمة للأعمدة الأخرى
            agg_dict[col] = 'first'

df_cleaned = df.groupby(group_cols, as_index=False).agg(agg_dict)

# حفظ الملف على الديسكتوب
desktop = os.path.join(os.path.expanduser('~'), 'Desktop')
output_path = os.path.join(desktop, 'مخزون عمان - نظيف.xlsx')
df_cleaned.to_excel(output_path, index=False)

print(f"\nFile saved: {output_path}")
print(f"Rows before: {len(df)}")
print(f"Rows after: {len(df_cleaned)}")
