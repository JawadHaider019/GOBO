import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  title: "Go Booking - Pakistan's First Unified Ticketing Ecosystem",
  description: "A unified platform for Pakistan that simplifies booking for apartments, events, transport, and flights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon Links */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        <meta name="chrome" content="notranslate" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="theme-color" content="#003d2b" />
      </head>
      <body suppressHydrationWarning>
        <AppProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AppProvider>
        
        <script dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined') {
              document.documentElement.removeAttribute('crxlauncher');
              document.documentElement.removeAttribute('chromewebdata');
              document.documentElement.removeAttribute('webdriver');
              document.body.removeAttribute('jstcache');
              document.body.removeAttribute('debug');
            }
          `
        }} />
      </body>
    </html>
  );
}