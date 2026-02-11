import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer position="top-center" autoClose={2000} rtl />
    </Provider>
  );
}
