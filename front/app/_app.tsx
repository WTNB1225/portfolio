// _app.tsx

import { AppProps } from 'next/app';
import { AdminContextProvider } from '@/components/context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    AdminContextProvider({})
  );
}

export default MyApp;
