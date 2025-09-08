// Src/app/layout.tsx
import Navigation from "@/components/layout/Navigation";
import './globals.css';


export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  "params": { locale?: string };
}) {
  const locale = params.locale || 'en';
  const direction = locale === 'he' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <body className={locale === 'he' ? 'font-hebrew' : 'font-sans'}>
        <Navigation/>
        {children}
      </body>
    </html>
  );
}