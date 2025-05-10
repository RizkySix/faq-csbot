import { AppProps } from "next/app";
import { Toaster } from 'react-hot-toast'
import "./styles/globals.css"
import "./styles/style.css"

const App = ({ Component, pageProps }: AppProps) => {
  return (
   <>
    <Toaster position="top-right" />
    <Component {...pageProps} />
   </>
  );
};

export default App;
