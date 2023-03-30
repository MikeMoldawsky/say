import '../styles/globals.css';
import {UserProvider} from '../components/react-context/UserContext';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <UserProvider>
          <div className="min-h-screen bg-gray-100 text-gray-900">
            <Component {...pageProps} />
          </div>
      </UserProvider>
  );
}

export default MyApp;