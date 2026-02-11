import random
import json

# قوالب وصف احترافية للماس
templates = [
    "يتميز {product} بجودة استثنائية تجعله خياراً مثالياً لمن يبحث عن {keyword1}. تم تصميمه بعناية فائقة ليعكس {keyword2} ويبرز {quality} بشكل لافت.",
    
    "اكتشف جمال {product} الذي يجمع بين {keyword1} والتصميم الفريد. يمثل قمة {keyword2} ويتألق بـ{quality} التي تضيف لمسة من الفخامة لإطلالتك.",
    
    "{product} تجسيد حقيقي لـ{keyword1} ويتميز بـ{quality} المميزة. صُمم ليكون رمزاً للـ{keyword2} والذوق الرفيع.",
    
    "استمتع بروعة {product} الذي يبرز {keyword1} ويتميز بـ{quality} لا مثيل لها. يعد الخيار الأمثل لمحبي {keyword2} والتميز.",
    
    "{product} قطعة فنية تعكس {keyword1} وتتألق بـ{quality} استثنائية. مصمم خصيصاً لعشاق {keyword2} والجمال الأبدي.",
    
    "يجسد {product} معنى {keyword1} الحقيقي ويتميز بـ{quality} الفائقة. إضافة مثالية لمن يقدر {keyword2} والحرفية المتقنة."
]

qualities = [
    "الجودة العالية", "البريق الساحر", "الصنعة الدقيقة", "التصميم الفاخر",
    "النقاء المتميز", "اللمعان الاستثنائي", "الحرفية العالية", "الأناقة الفريدة"
]

categories = [
    "الماس", "الخاتم الماسي", "القلادة الماسية", "الأقراط الماسية",
    "السوار الماسي", "المجوهرات الماسية", "الإكسسوار الفاخر"
]

keywords_sets = [
    {"keyword1": "الفخامة والتميز", "keyword2": "الأناقة الراقية"},
    {"keyword1": "الجودة الاستثنائية", "keyword2": "الذوق الرفيع"},
    {"keyword1": "التصميم العصري", "keyword2": "الجمال الخالد"},
    {"keyword1": "البريق الطبيعي", "keyword2": "الرقي والجاذبية"},
    {"keyword1": "الحرفية المتقنة", "keyword2": "الفخامة الحقيقية"}
]

def generate_description(product_name, category=None, custom_keywords=None):
    """توليد وصف SEO احترافي للمنتج"""
    template = random.choice(templates)
    quality = random.choice(qualities)
    cat = category if category else random.choice(categories)
    keywords = custom_keywords if custom_keywords else random.choice(keywords_sets)
    
    description = template.format(
        product=product_name,
        quality=quality,
        category=cat,
        keyword1=keywords["keyword1"],
        keyword2=keywords["keyword2"]
    )
    
    return description

def generate_multiple_descriptions(products):
    """توليد أوصاف متعددة لقائمة منتجات"""
    results = []
    for product in products:
        desc = generate_description(
            product.get("name", "الماس الفاخر"),
            product.get("category"),
            product.get("keywords")
        )
        results.append({
            "product": product.get("name"),
            "description": desc
        })
    return results

# مثال للاستخدام
if __name__ == "__main__":
    # مثال 1: منتج واحد
    print("=== وصف منتج واحد ===")
    desc = generate_description("خاتم الماس الملكي")
    print(desc)
    print("\n")
    
    # مثال 2: عدة منتجات
    print("=== أوصاف متعددة ===")
    products = [
        {"name": "خاتم الماس الكلاسيكي", "category": "الخاتم الماسي"},
        {"name": "قلادة الماس الفاخرة", "category": "القلادة الماسية"},
        {"name": "أقراط الماس اللامعة", "category": "الأقراط الماسية"}
    ]
    
    results = generate_multiple_descriptions(products)
    for item in results:
        print(f"المنتج: {item['product']}")
        print(f"الوصف: {item['description']}")
        print("-" * 80)
    
    # حفظ النتائج في ملف JSON
    with open("diamond_descriptions.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    
    print("\nتم حفظ الأوصاف في ملف diamond_descriptions.json")
