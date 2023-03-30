import '../styles/globals.css';
import {UserProvider} from '../components/react-context/UserContext';
import type { AppProps } from 'next/app';
import {UserBotsProvider} from "../components/react-context/UserBotsContext";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <UserProvider>
          <UserBotsProvider>
              <div className="min-h-screen bg-gray-100 text-gray-900">
                <Component {...pageProps} />
              </div>
          </UserBotsProvider>
      </UserProvider>
  );
}

export default MyApp;