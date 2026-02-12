import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>الشروط والأحكام - عماني ستور</title>
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-dark mb-8">الشروط والأحكام</h1>
          
          <div className="bg-white rounded-2xl shadow-card p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">قبول الشروط</h2>
              <p className="text-gray-700 leading-relaxed">
                باستخدامك لموقع عماني ستور، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">استخدام الموقع</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>يجب أن تكون بعمر 18 عاماً أو أكثر لإجراء عمليات الشراء</li>
                <li>يجب تقديم معلومات دقيقة وصحيحة عند التسجيل</li>
                <li>أنت مسؤول عن الحفاظ على سرية حسابك</li>
                <li>يحظر استخدام الموقع لأي أغراض غير قانونية</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">الطلبات والدفع</h2>
              <p className="text-gray-700 leading-relaxed mb-3">شروط الطلب والدفع:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>جميع الأسعار معروضة بالريال العماني</li>
                <li>نحتفظ بالحق في رفض أي طلب</li>
                <li>الدفع يتم عند تأكيد الطلب</li>
                <li>نقبل بطاقات الائتمان والدفع عند الاستلام</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">الشحن والتسليم</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>نقوم بالشحن إلى جميع أنحاء سلطنة عمان</li>
                <li>مدة التوصيل من 1-3 أيام عمل</li>
                <li>شحن مجاني لجميع الطلبات</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">الملكية الفكرية</h2>
              <p className="text-gray-700 leading-relaxed">
                جميع المحتويات على هذا الموقع، بما في ذلك النصوص والصور والشعارات، هي ملكية لعماني ستور ومحمية بموجب قوانين حقوق النشر.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">المسؤولية</h2>
              <p className="text-gray-700 leading-relaxed">
                عماني ستور غير مسؤول عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الموقع أو عدم القدرة على استخدامه.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">التعديلات</h2>
              <p className="text-gray-700 leading-relaxed">
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. التعديلات تصبح سارية فور نشرها على الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">القانون الحاكم</h2>
              <p className="text-gray-700 leading-relaxed">
                تخضع هذه الشروط والأحكام لقوانين سلطنة عمان.
              </p>
            </section>
          </div>
        </main>
    </>
  );
}
