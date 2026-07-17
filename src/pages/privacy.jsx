import Head from 'next/head';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>سياسة الخصوصية - إعلانات العرب الكويت</title>
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-dark mb-8">سياسة الخصوصية</h1>
          
          <div className="bg-white rounded-2xl shadow-card p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">المقدمة</h2>
              <p className="text-gray-700 leading-relaxed">
                نحن في إعلانات العرب الكويت نلتزم بحماية خصوصيتك. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">المعلومات التي نجمعها</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>الاسم الكامل</li>
                <li>عنوان البريد الإلكتروني</li>
                <li>رقم الهاتف</li>
                <li>عنوان الشحن</li>
                <li>معلومات الدفع</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">حماية المعلومات</h2>
              <p className="text-gray-700 leading-relaxed">
                نستخدم تقنيات أمان متقدمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الاستخدام غير القانوني.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">الاتصال بنا</h2>
              <div className="space-y-2 text-gray-700">
                <p>📧 البريد الإلكتروني: info@arabsads.shop</p>
                <p>📱 الهاتف / واتساب: +201110760081</p>
              </div>
            </section>
          </div>
        </main>
    </>
  );
}
