import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Header/>
            <Toaster />
            <main className="flex-grow py-10 px-16">
              {children}
            </main>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
