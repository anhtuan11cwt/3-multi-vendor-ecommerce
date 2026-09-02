import "./globals.css";

export const metadata = {
  title: "Multi Vendor Ecommerce",
  description: "Multi Vendor Ecommerce Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
