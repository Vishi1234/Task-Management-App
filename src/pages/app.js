// src/pages/_app.js

import '../styles/globals.css';  // Correctly import the global CSS

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
