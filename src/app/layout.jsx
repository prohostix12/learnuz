import './globals.css';
import VantaBackground from '../components/VantaBackground';
import ScrollToTop from '../components/ScrollToTop';

export const metadata = {
  title: 'Learnuz - Shaping Minds, Building Futures Through Smarter Learning',
  description: 'Partnered with India\'s top UGC-DEB approved universities. Headquartered in Kochi, Kerala, helping students nationwide find and enroll in premium online degrees.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-transparent text-[#0f172a] font-sans antialiased selection:bg-[#1f3f7a] selection:text-white">
        <VantaBackground />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
