import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'GCC Intel — Global Capability Center Intelligence Platform',
  description: 'Attributed intelligence platform for multinational corporations evaluating Global Capability Center (GCC) establishment, commercial real estate, and state policies across India.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-[#FDFBF7] text-[#14171A] min-h-screen antialiased flex flex-col selection:bg-[#16423C] selection:text-white`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            {children}
          </main>
          <footer className="border-t border-[#E8E5DE] bg-[#F7F5F0] py-8 sm:py-12 text-[#5E646A] text-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
                <div className="w-5 h-5 rounded bg-[#16423C] flex items-center justify-center font-bold text-white text-[10px]">
                  G
                </div>
                <span className="font-semibold text-[#14171A] tracking-tight">
                  GCC Intel Global
                </span>
                <span className="text-[#8B929A] hidden sm:inline">•</span>
                <span className="text-[11px] sm:text-xs">The Source of Truth for India GCC Infrastructure</span>
              </div>
              <div className="text-[#8B929A] flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs">
                <span>Sources linked on every record.</span>
                <span>•</span>
                <span>Built for Flexiple Strategy Assignment</span>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
