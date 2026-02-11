import { products } from '@/data/products';

function generateProductFeed() {
  const baseUrl = 'https://emeratis-store.com';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>إماراتي ستور - مخزونك في جيبك</title>
    <link>${baseUrl}</link>
    <description>أفضل متجر إلكتروني في 7 دول عربية - شحن مجاني لجميع الطلبات</description>
    ${products.map((product) => {
      const discount = product.price - product.salePrice;
      const discountPercent = Math.round((discount / product.price) * 100);
      
      return `
    <item>
      <g:id>${product.id}</g:id>
      <g:title>${product.title}</g:title>
      <g:description>${product.description || product.title}</g:description>
      <g:link>${baseUrl}/product/${product.id}</g:link>
      <g:image_link>${product.image}</g:image_link>
      ${product.additionalImage ? `<g:additional_image_link>${product.additionalImage}</g:additional_image_link>` : ''}
      <g:availability>${product.inStock ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${product.price} AED</g:price>
      <g:sale_price>${product.salePrice} AED</g:sale_price>
      <g:brand>إماراتي ستور</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>${product.category}</g:google_product_category>
      <g:product_type>${product.category}</g:product_type>
      <g:shipping>
        <g:country>AE</g:country>
        <g:service>Standard</g:service>
        <g:price>0 AED</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>SA</g:country>
        <g:service>Standard</g:service>
        <g:price>0 AED</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>EG</g:country>
        <g:service>Standard</g:service>
        <g:price>0 AED</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>KW</g:country>
        <g:service>Standard</g:service>
        <g:price>0 AED</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>QA</g:country>
        <g:service>Standard</g:service>
        <g:price>0 AED</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>OM</g:country>
        <g:service>Standard</g:service>
        <g:price>0 AED</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>BH</g:country>
        <g:service>Standard</g:service>
        <g:price>0 AED</g:price>
      </g:shipping>
      <g:identifier_exists>no</g:identifier_exists>
    </item>`;
    }).join('')}
  </channel>
</rss>`;
}

export default function ProductFeed() {}

export async function getServerSideProps({ res }) {
  const feed = generateProductFeed();

  res.setHeader('Content-Type', 'application/xml');
  res.write(feed);
  res.end();

  return {
    props: {},
  };
}
