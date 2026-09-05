import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/context/providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  description: "Nền tảng thương mại điện tử đa nhà cung cấp",
  title: "Thương mại điện tử đa nhà cung cấp",
};

export default function RootLayout({ children }) {
  return (
    <html
      className={cn("font-sans", inter.variable)}
      lang="vi"
      suppressHydrationWarning
    >
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: next-themes anti-flash pattern
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
