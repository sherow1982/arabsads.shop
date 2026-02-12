// تم استيراد البيانات من ملف JSON العماني
const productsData = require('./products-data.json');

export const products = productsData.map(product => ({
  id: product.id,
  title: product.name,
  price: parseFloat(product.price.replace(/[^\d.]/g, '')),
  salePrice: parseFloat(product.sale_price.replace(/[^\d.]/g, '')),
  image: product.mainImage,
  additionalImage: product.gallery && product.gallery.length > 0 ? product.gallery[0] : product.mainImage,
  gallery: product.gallery || [],
  description: product.description || product.name,
  category: product.category,
  inStock: true,
  sku: `OM-${product.id}`,
  rating: 4.5,
  reviews: []
}));
