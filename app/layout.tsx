import { Navbar } from "@/components/navbar/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "@/app/globals.css";
import { Geist_Mono } from "next/font/google";
import Footer from "@/components/footer/footer";
import { auth } from "@/auth";

const GeistMono = Geist_Mono({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${GeistMono.className} antialiased`}
    >
      <body className="min-h-screen bg-background relative flex flex-col w-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar user={session?.user} />
          <main className="flex-1 p-2">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
