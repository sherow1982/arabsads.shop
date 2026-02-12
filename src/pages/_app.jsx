import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import WhatsAppButton from '@/components/Layout/WhatsAppButton';
import FloatingCart from '@/components/Layout/FloatingCart';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="bg-light-gray min-h-screen">
        <Header />
        <main role="main">
          <Component {...pageProps} />
        </main>
        
        {/* Facebook Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">تابعنا على فيسبوك</h2>
              <p className="text-lg text-dark-3 mb-6">كن أول من يعرف بالعروض والمنتجات الجديدة</p>
              <a 
                href="https://www.facebook.com/arabads.me/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition shadow-lg text-lg animate-pulse"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                تابعنا على فيسبوك
              </a>
            </div>
            
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <iframe 
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Farabads.me%2F&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                width="100%" 
                height="600" 
                style={{ border: 'none', overflow: 'hidden' }} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          </div>
        </section>
        
        <Footer />
        <WhatsAppButton />
        <FloatingCart />
        <ToastContainer position="top-center" autoClose={2000} rtl />
      </div>
    </Provider>
  );
}
