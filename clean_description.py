# -*- coding: utf-8 -*-
import pandas as pd
import os
import re
import sys
from html import unescape

# Fix encoding
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# قراءة الملف النظيف
desktop = os.path.join(os.path.expanduser('~'), 'Desktop')
file_path = os.path.join(desktop, 'مخزون عمان - نظيف.xlsx')
df = pd.read_excel(file_path)

# تنظيف عمود description
def clean_description(text):
    if pd.isna(text):
        return text
    
    # تحويل HTML entities
    text = unescape(str(text))
    
    # إزالة HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    
    # إزالة المسافات الزائدة
    text = re.sub(r'\s+', ' ', text)
    
    # إزالة المسافات في البداية والنهاية
    text = text.strip()
    
    return text

if 'description' in df.columns:
    df['description'] = df['description'].apply(clean_description)
    print("Description column cleaned")
else:
    print("Description column not found")

# حفظ الملف
output_path = os.path.join(desktop, 'مخزون عمان - نظيف.xlsx')
df.to_excel(output_path, index=False)

print(f"\nFile saved: {output_path}")
