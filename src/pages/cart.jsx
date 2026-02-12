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
    <div className="cart-page">
      <div className="container">
        <h1>سلة التسوق</h1>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>سلة التسوق فارغة</p>
            <button onClick={() => router.push('/shop')}>تصفح المنتجات</button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p className="price">{item.salePrice} ر.ع</p>
                  </div>
                  <div className="item-quantity">
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemove(item.id)}>حذف</button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>ملخص الطلب</h2>
              <div className="summary-row">
                <span>المجموع الفرعي</span>
                <span>{total.toFixed(2)} ر.ع</span>
              </div>
              <div className="summary-row">
                <span>التوصيل</span>
                <span>مجاني</span>
              </div>
              <div className="summary-total">
                <span>الإجمالي</span>
                <span>{total.toFixed(2)} ر.ع</span>
              </div>
              <button className="checkout-btn" onClick={() => router.push('/checkout')}>
                إتمام الطلب
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .cart-page {
          min-height: 100vh;
          padding: 40px 0;
          background: #f5f5f5;
        }

        h1 {
          text-align: center;
          margin-bottom: 40px;
          font-size: 32px;
          color: #333;
        }

        .cart-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 30px;
        }

        @media (max-width: 968px) {
          .cart-content {
            grid-template-columns: 1fr;
          }
        }

        .cart-items {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          border-bottom: 1px solid #f0f0f0;
        }

        .cart-item:last-child {
          border-bottom: none;
        }

        .cart-item img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
        }

        .item-details {
          flex: 1;
        }

        .item-details h3 {
          font-size: 18px;
          color: #333;
          margin-bottom: 8px;
        }

        .price {
          font-size: 20px;
          font-weight: 600;
          color: #007bff;
        }

        .item-quantity {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .item-quantity button {
          width: 32px;
          height: 32px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.3s;
        }

        .item-quantity button:hover {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .item-quantity span {
          font-size: 16px;
          font-weight: 600;
          min-width: 30px;
          text-align: center;
        }

        .remove-btn {
          padding: 8px 16px;
          background: #ff4444;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .remove-btn:hover {
          background: #cc0000;
        }

        .cart-summary {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          height: fit-content;
        }

        .cart-summary h2 {
          font-size: 20px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          color: #666;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
          margin-top: 15px;
          border-top: 2px solid #f0f0f0;
          font-size: 20px;
          font-weight: 700;
          color: #007bff;
        }

        .checkout-btn {
          width: 100%;
          padding: 16px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 20px;
          transition: background 0.3s;
        }

        .checkout-btn:hover {
          background: #0056b3;
        }

        .empty-cart {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 12px;
        }

        .empty-cart p {
          font-size: 20px;
          color: #666;
          margin-bottom: 20px;
        }

        .empty-cart button {
          padding: 12px 30px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .empty-cart button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
}
