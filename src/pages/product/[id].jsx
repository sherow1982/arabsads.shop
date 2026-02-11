import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { products } from '@/data/products';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>المنتج غير موجود</h2>
        <button onClick={() => router.push('/shop')} style={{ marginTop: '20px', padding: '10px 30px', background: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
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
      <header className="header">
        <div className="container">
          <h1>متجر إماراتي</h1>
          <nav>
            <Link href="/">الرئيسية</Link>
            <Link href="/shop">المتجر</Link>
            <Link href="/cart">السلة ({items.length})</Link>
          </nav>
        </div>
      </header>

      <div className="product-detail-page">
        <div className="container">
          <button className="back-btn" onClick={() => router.back()}>
            ← العودة
          </button>

          <div className="product-detail">
            <div className="product-images">
              <div className="main-image">
                <img src={selectedImage || product.image} alt={product.title} />
                {discount > 0 && (
                  <span className="discount-badge">-{discount}%</span>
                )}
              </div>
              <div className="thumbnail-images">
                <img 
                  src={product.image} 
                  alt={product.title}
                  onClick={() => setSelectedImage(product.image)}
                  className={selectedImage === product.image || !selectedImage ? 'active' : ''}
                />
                {product.additionalImage && product.additionalImage !== product.image && (
                  <img 
                    src={product.additionalImage} 
                    alt={product.title}
                    onClick={() => setSelectedImage(product.additionalImage)}
                    className={selectedImage === product.additionalImage ? 'active' : ''}
                  />
                )}
              </div>
            </div>

            <div className="product-details-info">
              <h1>{product.title}</h1>
              
              <div className="product-meta">
                <span className="category">{product.category}</span>
                <span className="sku">رقم المنتج: {product.sku}</span>
                {product.inStock ? (
                  <span className="in-stock">متوفر</span>
                ) : (
                  <span className="out-of-stock">غير متوفر</span>
                )}
              </div>

              <div className="product-prices">
                <span className="sale-price">{product.salePrice} د.إ</span>
                <span className="original-price">{product.price} د.إ</span>
                {discount > 0 && (
                  <span className="save-amount">وفر {product.price - product.salePrice} د.إ</span>
                )}
              </div>

              {product.description && (
                <div className="product-description">
                  <h3>وصف المنتج</h3>
                  <p>{product.description}</p>
                </div>
              )}

              <div className="product-actions">
                <div className="quantity-selector">
                  <label>الكمية:</label>
                  <div className="quantity-controls">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>

                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  أضف إلى السلة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 20px 0;
          margin-bottom: 30px;
        }

        .header h1 {
          color: #333;
          font-size: 28px;
          margin-bottom: 10px;
        }

        .header nav {
          display: flex;
          gap: 20px;
        }

        .header nav a {
          color: #666;
          text-decoration: none;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 6px;
          transition: all 0.3s;
        }

        .header nav a:hover {
          color: #007bff;
          background: #f0f7ff;
        }

        .product-detail-page {
          min-height: 100vh;
          padding: 40px 0;
          background: #f5f5f5;
        }

        .back-btn {
          background: white;
          border: 1px solid #ddd;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          margin-bottom: 30px;
          font-size: 16px;
          transition: all 0.3s;
        }

        .back-btn:hover {
          background: #f8f9fa;
          border-color: #007bff;
          color: #007bff;
        }

        .product-detail {
          background: white;
          border-radius: 12px;
          padding: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        @media (max-width: 968px) {
          .product-detail {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 20px;
          }
        }

        .product-images {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .main-image {
          position: relative;
          width: 100%;
          height: 500px;
          border-radius: 12px;
          overflow: hidden;
          background: #f8f9fa;
        }

        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .discount-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #ff4444;
          color: white;
          padding: 8px 16px;
          border-radius: 25px;
          font-weight: bold;
          font-size: 16px;
        }

        .thumbnail-images {
          display: flex;
          gap: 15px;
        }

        .thumbnail-images img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s;
        }

        .thumbnail-images img:hover,
        .thumbnail-images img.active {
          border-color: #007bff;
          transform: scale(1.05);
        }

        .product-details-info h1 {
          font-size: 32px;
          color: #333;
          margin-bottom: 20px;
        }

        .product-meta {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 25px;
        }

        .product-meta span {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 14px;
        }

        .category {
          background: #e3f2fd;
          color: #1976d2;
        }

        .sku {
          background: #f5f5f5;
          color: #666;
        }

        .in-stock {
          background: #e8f5e9;
          color: #2e7d32;
        }

        .out-of-stock {
          background: #ffebee;
          color: #c62828;
        }

        .product-prices {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
          padding-bottom: 30px;
          border-bottom: 1px solid #eee;
        }

        .sale-price {
          font-size: 36px;
          font-weight: bold;
          color: #007bff;
        }

        .original-price {
          font-size: 24px;
          color: #999;
          text-decoration: line-through;
        }

        .save-amount {
          background: #fff3cd;
          color: #856404;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
        }

        .product-description {
          margin-bottom: 30px;
        }

        .product-description h3 {
          font-size: 20px;
          margin-bottom: 15px;
          color: #333;
        }

        .product-description p {
          color: #666;
          line-height: 1.8;
          white-space: pre-wrap;
        }

        .product-actions {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .quantity-selector label {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 15px;
          background: #f8f9fa;
          padding: 8px 15px;
          border-radius: 8px;
        }

        .quantity-controls button {
          width: 36px;
          height: 36px;
          border: none;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 20px;
          font-weight: bold;
          color: #007bff;
          transition: all 0.3s;
        }

        .quantity-controls button:hover {
          background: #007bff;
          color: white;
        }

        .quantity-controls span {
          font-size: 18px;
          font-weight: 600;
          min-width: 40px;
          text-align: center;
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 18px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .add-to-cart-btn:hover {
          background: #0056b3;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,123,255,0.3);
        }
      `}</style>
    </>
  );
}
