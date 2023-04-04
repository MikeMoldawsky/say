import '../styles/globals.css';
import {UserProvider} from '../components/react-context/UserContext';
import type { AppProps } from 'next/app';
import {UserBotsProvider} from "../components/react-context/UserBotsContext";
import React from "react";
import Header from "../components/Header";
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <UserProvider>
          <UserBotsProvider>
              <div className="min-h-screen bg-gray-100 text-gray-900">
                  <div className="pt-20">
                    <Header />
                  </div>
                <Component {...pageProps} />
              </div>
          </UserBotsProvider>
      </UserProvider>
  );
}

export default MyApp;