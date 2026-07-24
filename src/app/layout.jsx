import './globals.css';

export const metadata = {
  title: 'Learnuz - Shaping Minds, Building Futures Through Smarter Learning',
  description: 'Partnered with India\'s top UGC-DEB approved universities. Headquartered in Kochi, Kerala, helping students nationwide find and enroll in premium online degrees.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#f8fafc] text-[#0f172a] font-sans antialiased selection:bg-[#2563eb] selection:text-white">
        {children}
      </body>
    </html>
  );
}
