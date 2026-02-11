import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>الصفحة غير موجودة - متجر إماراتي</title>
      </Head>

      <main className="error-page">
        <div className="container">
          <div className="error-content">
            <h1>404</h1>
            <h2>عذراً، الصفحة غير موجودة</h2>
            <p>الصفحة التي تبحث عنها غير موجودة أو تم نقلها</p>
            <Link href="/">
              <button className="home-button">العودة للرئيسية</button>
            </Link>
          </div>
        </div>
      </main>

      <style jsx>{`
        .error-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .error-content {
          text-align: center;
          color: white;
        }

        .error-content h1 {
          font-size: 120px;
          font-weight: bold;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .error-content h2 {
          font-size: 32px;
          margin-bottom: 15px;
        }

        .error-content p {
          font-size: 18px;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .home-button {
          padding: 15px 40px;
          background-color: white;
          color: #667eea;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .home-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  );
}
