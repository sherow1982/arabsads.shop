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
        <Footer />
        <WhatsAppButton />
        <FloatingCart />
        <ToastContainer position="top-center" autoClose={2000} rtl />
      </div>
    </Provider>
  );
}
