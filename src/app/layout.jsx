import '../style/globals.css';

export const metadata = {
  title: 'YouApp Abu',
  description: 'Test FE YouApp',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-inter">{children}</body>
    </html>
  );
}
