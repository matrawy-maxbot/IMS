import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Toaster } from "sonner";
import { UIProvider } from "@/components/providers";
import { WarehouseProvider } from "@/contexts/warehouse-context";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { cookies } from 'next/headers';
import { OnboardingChecklist } from "@/components/onboarding-checklist";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  weight: ["400", "500", "700"],
  subsets: ["arabic"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "Inventory Management System | IMS",
  description: "Comprehensive inventory and sales management system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'ar';
  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tajawal.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UIProvider>
              <WarehouseProvider>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <div className="flex flex-1">
                    <aside className="hidden w-64 border-r border-border/40 md:block bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ height: 'calc(100vh - 4rem)' }}>
                      <Sidebar />
                    </aside>
                    <main className="flex-1 p-6 bg-muted/20">{children}</main>
                  </div>
                  <Toaster position="bottom-right" expand={false} richColors closeButton />
                  <OnboardingChecklist />
                </div>
              </WarehouseProvider>
            </UIProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
