import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>الصفحة غير موجودة - إعلانات العرب الكويت</title>
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
        <div className="text-center text-white px-4">
          <h1 className="text-9xl font-bold mb-5" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>404</h1>
          <h2 className="text-3xl font-bold mb-4">عذراً، الصفحة غير موجودة</h2>
          <p className="text-lg mb-8 opacity-90">الصفحة التي تبحث عنها غير موجودة أو تم نقلها</p>
          <Link href="/" className="inline-block bg-white text-primary px-10 py-4 rounded-lg text-lg font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            العودة للرئيسية
          </Link>
        </div>
      </main>
    </>
  );
}
