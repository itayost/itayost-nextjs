// app/layout.tsx - Root Layout
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header  from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://itayost.com'),
  title: {
    default: 'ItayOst - פיתוח דיגיטלי מתקדם',
    template: '%s | ItayOst',
  },
  description: 'פתרונות תוכנה מותאמים אישית ברמה הגבוהה ביותר',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#050505',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}