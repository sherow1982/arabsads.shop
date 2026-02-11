import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { products } from '@/data/products';
import { toast } from 'react-toastify';
import Link from 'next/link';
import SEO from '@/components/SEO';
import { useState } from 'react';

export async function getStaticPaths() {
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}

export default function ProductDetail({ product: initialProduct }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const product = initialProduct;

  if (router.isFallback) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center">جاري التحميل...</div>;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-dark mb-6">المنتج غير موجود</h2>
        <button onClick={() => router.push('/shop')} className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition">
          العودة للمتجر
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    toast.success(`تمت إضافة ${quantity} من ${product.title} إلى السلة`);
  };

  const discount = Math.round((1 - product.salePrice / product.price) * 100);

  return (
    <>
      <SEO 
        title={`${product.title} - إماراتي ستور`}
        description={`${product.description || product.title} - شحن مجاني. السعر: ${product.salePrice} د.إ بدلاً من ${product.price} د.إ. توصيل سريع 1-3 أيام`}
        keywords={`${product.title}, ${product.category}, شراء ${product.title}, ${product.sku}`}
        image={product.image}
        url={`https://emeratis-store.com/product/${product.id}`}
        type="product"
        product={product}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <button className="bg-white border border-gray-300 px-6 py-2 rounded-lg mb-8 hover:bg-light-gray transition" onClick={() => router.back()}>
          ← العودة
        </button>

        <div className="bg-white rounded-2xl shadow-card p-8 grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative h-96 rounded-xl overflow-hidden bg-light-gray">
              <img src={selectedImage || product.image} alt={product.title} className="w-full h-full object-cover" />
              {discount > 0 && (
                <span className="absolute top-4 right-4 bg-danger text-white px-4 py-2 rounded-full font-bold">
                  -{discount}%
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <img 
                src={product.image} 
                alt={product.title}
                onClick={() => setSelectedImage(product.image)}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition ${selectedImage === product.image || !selectedImage ? 'border-primary' : 'border-transparent'}`}
              />
              {product.additionalImage && product.additionalImage !== product.image && (
                <img 
                  src={product.additionalImage} 
                  alt={product.title}
                  onClick={() => setSelectedImage(product.additionalImage)}
                  className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition ${selectedImage === product.additionalImage ? 'border-primary' : 'border-transparent'}`}
                />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-dark">{product.title}</h1>
            
            <div className="flex gap-3 flex-wrap">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm">{product.category}</span>
              <span className="bg-light-gray text-gray-600 px-3 py-1 rounded-lg text-sm">رقم المنتج: {product.sku}</span>
              {product.inStock ? (
                <span className="bg-green-100 text-success px-3 py-1 rounded-lg text-sm">متوفر</span>
              ) : (
                <span className="bg-red-100 text-danger px-3 py-1 rounded-lg text-sm">غير متوفر</span>
              )}
            </div>

            <div className="flex items-center gap-4 pb-6 border-b">
              <span className="text-5xl font-bold text-primary">{product.salePrice} د.إ</span>
              <span className="text-2xl text-gray-400 line-through">{product.price} د.إ</span>
              {discount > 0 && (
                <span className="bg-warning bg-opacity-20 text-yellow-800 px-3 py-1 rounded-lg font-bold">وفر {product.price - product.salePrice} د.إ</span>
              )}
            </div>

            {product.description && (
              <div>
                <h3 className="text-xl font-bold text-dark mb-3">وصف المنتج</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="flex gap-3 text-sm">
              <Link href="/return-policy" className="text-primary hover:underline">🔄 سياسة الإرجاع</Link>
              <span className="text-gray-300">|</span>
              <Link href="/shipping-policy" className="text-primary hover:underline">🚚 سياسة الشحن</Link>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-bold text-dark">الكمية:</label>
                <div className="flex items-center gap-4 bg-light-gray px-4 py-2 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-white rounded-lg font-bold text-primary hover:bg-primary hover:text-white transition">
                    -
                  </button>
                  <span className="text-xl font-bold min-w-[40px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-white rounded-lg font-bold text-primary hover:bg-primary hover:text-white transition">
                    +
                  </button>
                </div>
              </div>

              <button onClick={handleAddToCart} className="w-full bg-primary text-white py-4 rounded-full text-lg font-bold hover:bg-primary-dark transition shadow-lg hover:shadow-xl">
                أضف إلى السلة
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
