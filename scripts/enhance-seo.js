const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products-data.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// توليد مواصفات احترافية مع كلمات مفتاحية
function generateSpecs(product) {
  const keywords = [
    product.name,
    product.category,
    'عمان',
    'مسقط',
    'صلالة',
    'شحن مجاني',
    'توصيل سريع',
    'جودة عالية',
    'أصلي'
  ];

  return {
    name: `**${product.name}**`,
    description: `${product.description}\n\nاحصل على **${product.name}** الأصلي من ${product.category} بأفضل سعر في سلطنة عمان. منتج عالي الجودة مع شحن مجاني لجميع محافظات عمان (مسقط، صلالة، صحار، نزوى). توصيل سريع خلال 1-3 أيام عمل. ${product.name} متوفر الآن في عماني ستور - مخزونك في جيبك.`,
    keywords: keywords.join(', '),
    features: [
      `✓ **${product.name}** أصلي 100%`,
      `✓ شحن مجاني لجميع مناطق عمان`,
      `✓ توصيل سريع 1-3 أيام`,
      `✓ ضمان الجودة والأصالة`,
      `✓ دفع عند الاستلام`,
      `✓ خدمة عملاء 24/7`
    ]
  };
}

// سكيما منتج محسّنة 2026
function generateRichSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": [product.mainImage],
    "brand": {
      "@type": "Brand",
      "name": "عماني ستور"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://oman-makhzoonk.shop/product/${product.id}`,
      "priceCurrency": "OMR",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "OMR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "OM"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 7,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": product.reviews?.length || 5,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": (product.reviews || []).slice(0, 3).map(r => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.rating,
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": r.name
      },
      "reviewBody": r.comment
    })),
    "category": product.category,
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "الشحن",
        "value": "مجاني لجميع مناطق عمان"
      },
      {
        "@type": "PropertyValue",
        "name": "التوصيل",
        "value": "1-3 أيام عمل"
      },
      {
        "@type": "PropertyValue",
        "name": "الدفع",
        "value": "عند الاستلام"
      }
    ]
  };
}

// تحديث المنتجات
let updated = 0;
const updatedProducts = products.map(product => {
  const specs = generateSpecs(product);
  product.specs = specs;
  product.richSchema = generateRichSchema(product);
  updated++;
  return product;
});

fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2), 'utf8');

console.log('✅ تم تحسين المواصفات والسكيما!');
console.log(`📊 ${updated} منتج محدث`);
console.log('📝 تم إضافة:');
console.log('   - مواصفات مع كلمات مفتاحية');
console.log('   - سكيما غنية بصرياً 2026');
console.log('   - تقييمات في السكيما');
console.log('   - سياسة الإرجاع');
console.log('   - تفاصيل الشحن');
