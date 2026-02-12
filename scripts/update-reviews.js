const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products-data.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// توليد ملف productReviews.js
let reviewsContent = `// تقييمات المنتجات - تم التوليد تلقائياً\n\nexport const productReviews = {\n`;

products.forEach((product, index) => {
  if (product.reviews && product.reviews.length > 0) {
    reviewsContent += `  ${product.id}: [\n`;
    product.reviews.forEach((review, i) => {
      reviewsContent += `    {\n`;
      reviewsContent += `      name: '${review.name}',\n`;
      reviewsContent += `      rating: ${review.rating},\n`;
      reviewsContent += `      comment: \`${review.comment}\`,\n`;
      reviewsContent += `      verified: ${review.verified},\n`;
      reviewsContent += `      date: '${new Date().toLocaleDateString('ar-EG')}'\n`;
      reviewsContent += `    }${i < product.reviews.length - 1 ? ',' : ''}\n`;
    });
    reviewsContent += `  ]${index < products.length - 1 ? ',' : ''}\n`;
  }
});

reviewsContent += `};\n\n`;
reviewsContent += `export function getProductReviews(productId) {\n`;
reviewsContent += `  return productReviews[productId] || [];\n`;
reviewsContent += `}\n\n`;
reviewsContent += `export function getAverageRating(productId) {\n`;
reviewsContent += `  const reviews = getProductReviews(productId);\n`;
reviewsContent += `  if (reviews.length === 0) return 0;\n`;
reviewsContent += `  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);\n`;
reviewsContent += `  return (sum / reviews.length).toFixed(1);\n`;
reviewsContent += `}\n\n`;
reviewsContent += `export function getProductFAQs(productId) {\n`;
reviewsContent += `  const product = ${JSON.stringify(products, null, 2)}.find(p => p.id === productId);\n`;
reviewsContent += `  return product?.faqs || [];\n`;
reviewsContent += `}\n`;

fs.writeFileSync(
  path.join(__dirname, '../src/data/productReviews.js'),
  reviewsContent,
  'utf8'
);

console.log('✅ تم تحديث ملف productReviews.js');
console.log(`📊 ${products.length} منتج مع تقييمات وأسئلة شائعة`);
