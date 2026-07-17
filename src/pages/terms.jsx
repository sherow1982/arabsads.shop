import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>الشروط والأحكام - إعلانات العرب الكويت</title>
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-dark mb-8">الشروط والأحكام</h1>
          
          <div className="bg-white rounded-2xl shadow-card p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">قبول الشروط</h2>
              <p className="text-gray-700 leading-relaxed">
                باستخدامك لموقع إعلانات العرب الكويت، فإنك توافق على الالتزام بهذه الشروط والأحكام.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">الطلبات والدفع</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>جميع الأسعار معروضة بالدينار الكويتي</li>
                <li>نحتفظ بالحق في رفض أي طلب</li>
                <li>الدفع يتم عند تأكيد الطلب</li>
                <li>نقبل بطاقات الائتمان والدفع عند الاستلام</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">الشحن والتسليم</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>نقوم بالشحن إلى جميع أنحاء دولة الكويت</li>
                <li>مدة التوصيل من 1-3 أيام عمل</li>
                <li>شحن مجاني لجميع الطلبات داخل الكويت</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">الملكية الفكرية</h2>
              <p className="text-gray-700 leading-relaxed">
                جميع المحتويات على هذا الموقع هي ملكية لإعلانات العرب الكويت ومحمية بموجب قوانين حقوق النشر.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">القانون الحاكم</h2>
              <p className="text-gray-700 leading-relaxed">
                تخضع هذه الشروط والأحكام لقوانين دولة الكويت.
              </p>
            </section>
          </div>
        </main>
    </>
  );
}
