import "./globals.css";

export const metadata = {
  description: "Multi Vendor Ecommerce Platform",
  title: "Multi Vendor Ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
