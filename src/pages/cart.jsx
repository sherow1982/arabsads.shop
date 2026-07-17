import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/redux/features/cartSlice';
import { toast } from 'react-toastify';

export default function Cart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success('تم حذف المنتج من السلة');
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  return (
    <>
      <Head>
        <title>سلة التسوق - إعلانات العرب الكويت</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-dark text-center mb-10">سلة التسوق</h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-card p-16 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-xl text-gray-500 mb-6">سلة التسوق فارغة</p>
              <Link href="/shop" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition">
                تصفح المنتجات
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-card p-6 space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-dark text-sm line-clamp-2 mb-1">{item.title}</h3>
                      <p className="text-primary font-bold">{item.salePrice.toFixed(3)} د.ك</p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2 py-1">
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 bg-white rounded-lg font-bold text-primary hover:bg-primary hover:text-white transition text-lg leading-none">−</button>
                      <span className="text-sm font-bold min-w-[24px] text-center">{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 bg-white rounded-lg font-bold text-primary hover:bg-primary hover:text-white transition text-lg leading-none">+</button>
                    </div>
                    <p className="font-bold text-dark text-sm min-w-[70px] text-center">{(item.salePrice * item.quantity).toFixed(3)} د.ك</p>
                    <button onClick={() => handleRemove(item.id)}
                      className="text-danger hover:text-red-700 transition p-1 flex-shrink-0" aria-label="حذف">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl shadow-card p-6 h-fit sticky top-24">
                <h2 className="text-xl font-bold text-dark mb-6 pb-4 border-b border-gray-100">ملخص الطلب</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>المجموع الفرعي</span>
                    <span>{total.toFixed(3)} د.ك</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>التوصيل</span>
                    <span className="text-green-600 font-medium">مجاني 🎉</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-bold text-dark pt-4 border-t border-gray-100 mb-6">
                  <span>الإجمالي</span>
                  <span className="text-primary">{total.toFixed(3)} د.ك</span>
                </div>
                <button onClick={() => router.push('/checkout')}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition shadow-lg">
                  إتمام الطلب ←
                </button>
                <Link href="/shop" className="block text-center text-primary hover:underline mt-4 text-sm font-medium">
                  متابعة التسوق
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
