import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <meta charSet="utf-8" />

        {/* Open Graph Default */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="إعلانات العرب الكويت" />
        <meta property="og:locale" content="ar_KW" />
        <meta property="og:title" content="إعلانات العرب الكويت - تسوق أونلاين | شحن مجاني" />
        <meta property="og:description" content="أفضل متجر إلكتروني في الكويت. شحن مجاني لجميع الطلبات. توصيل سريع 1-3 أيام. منتجات أصلية 100%" />
        <meta property="og:image" content="https://arabsads.shop/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://arabsads.shop/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://arabsads.shop" />

        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Font - direct stylesheet */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics - deferred */}
        <script
          defer
          src="https://www.googletagmanager.com/gtag/js?id=G-HGWFC0NSMR"
        />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-HGWFC0NSMR', { send_page_view: true });
              });
            `,
          }}
        />

        {/* Google Tag Manager - deferred */}
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-K4QRRTDW');
              });
            `,
          }}
        />
      </Head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K4QRRTDW"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
