'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  MapPin, 
  FileText, 
  Scale, 
  Radio, 
  Briefcase, 
  Terminal, 
  Menu, 
  X,
  ChevronRight,
  Globe2
} from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Overview' },
    { href: '/explorer', label: 'GCC Registry' },
    { href: '/pipeline', label: 'Pipeline Signals', isNew: true },
    { href: '/comparator', label: 'City Comparator' },
    { href: '/reconciliation', label: 'Count Audit' },
    { href: '/policies', label: 'State Policies' },
    { href: '/providers', label: 'Providers' },
    { href: '/ask', label: 'Intelligence Terminal' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E5DE] bg-[#FDFBF7]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#16423C] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm group-hover:bg-[#2D6A4F] transition">
            G
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-[#14171A]">
                GCC Intel
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.2 bg-[#F0EDE6] text-[#16423C] rounded border border-[#E0DCD3]">
                Global
              </span>
            </div>
            <span className="text-[11px] text-[#5E646A] tracking-tight">
              Single Source of Truth for India GCCs
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#16423C] text-white'
                    : 'text-[#4A5056] hover:text-[#14171A] hover:bg-[#F0EDE6]'
                }`}
              >
                <span>{link.label}</span>
                {link.isNew && (
                  <span className={`text-[9px] font-mono px-1 py-0.2 rounded font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#E76F51]/15 text-[#E76F51]'
                  }`}>
                    NEW
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Global Access / Action */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/ask"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#16423C] hover:bg-[#2D6A4F] text-white text-xs font-semibold transition shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Launch Terminal</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-[#4A5056] hover:text-[#14171A] hover:bg-[#F0EDE6]"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E8E5DE] bg-[#FDFBF7] px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium ${
                  isActive
                    ? 'bg-[#16423C] text-white'
                    : 'text-[#4A5056] hover:text-[#14171A] hover:bg-[#F0EDE6]'
                }`}
              >
                <span>{link.label}</span>
                {link.isNew && (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#E76F51]/15 text-[#E76F51]">
                    NEW
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
