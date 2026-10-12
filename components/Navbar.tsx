'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  MapPin, 
  Scale, 
  Radio, 
  Briefcase, 
  Calculator, 
  FileCheck2, 
  Terminal, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dataDropdownOpen, setDataDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Primary curated navigation
  const primaryLinks = [
    { href: '/', label: 'Overview' },
    { href: '/calculator', label: 'Setup Estimator' },
    { href: '/explorer', label: 'GCC Registry' },
    { href: '/comparator', label: 'City Comparator' },
    { href: '/reconciliation', label: 'Count Audit' },
    { href: '/ask', label: 'Terminal Q&A' },
  ];

  // Secondary data/intelligence pages organized cleanly
  const secondaryLinks = [
    { href: '/pipeline', label: 'Incoming Pipeline Signals', desc: 'Forward detection of new 2026 entrants' },
    { href: '/policies', label: 'State Policy Gazettes', desc: 'Quantified subsidies and tax holidays' },
    { href: '/providers', label: 'Provider Delivery Audits', desc: 'Track records & conflict disclosures' },
    { href: '/methodology', label: 'Research Methodology', desc: 'Definitions and verification standard' },
  ];

  const isSecondaryActive = secondaryLinks.some(link => pathname === link.href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E5DE] bg-[#FDFBF7]/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-[#16423C] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs group-hover:bg-[#2D6A4F] transition">
            G
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-[#14171A]">
                GCC Intel
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.2 bg-[#F0EDE6] text-[#16423C] rounded border border-[#E0DCD3]">
                Global
              </span>
            </div>
            <span className="text-[10px] text-[#5E646A] tracking-tight hidden sm:inline">
              Single Source of Truth for India GCCs
            </span>
          </div>
        </Link>

        {/* Clean, Non-Compacted Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {primaryLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition whitespace-nowrap ${
                  isActive
                    ? 'bg-[#16423C] text-white shadow-xs'
                    : 'text-[#4A5056] hover:text-[#14171A] hover:bg-[#F0EDE6]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Clean 'More Intelligence' Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDataDropdownOpen(!dataDropdownOpen)}
              onBlur={() => setTimeout(() => setDataDropdownOpen(false), 200)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1 whitespace-nowrap ${
                isSecondaryActive
                  ? 'bg-[#16423C] text-white'
                  : 'text-[#4A5056] hover:text-[#14171A] hover:bg-[#F0EDE6]'
              }`}
            >
              <span>More Data</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {dataDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E8E5DE] rounded-xl shadow-lg py-2 z-50">
                {secondaryLinks.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setDataDropdownOpen(false)}
                    className={`block px-4 py-2.5 text-xs transition ${
                      pathname === sub.href ? 'bg-[#F7F5F0] text-[#16423C] font-semibold' : 'hover:bg-[#FDFBF7] text-[#14171A]'
                    }`}
                  >
                    <div className="font-medium">{sub.label}</div>
                    <div className="text-[10px] text-[#8B929A] mt-0.5">{sub.desc}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions: Theme Toggle + Estimator CTA */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link
            href="/calculator"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#16423C] hover:bg-[#2D6A4F] text-white text-xs font-semibold transition shadow-xs whitespace-nowrap"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Setup Estimator</span>
          </Link>

          {/* Mobile menu hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#4A5056] hover:text-[#14171A] hover:bg-[#F0EDE6]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E8E5DE] bg-[#FDFBF7] px-4 py-3 space-y-1 shadow-md max-h-[80vh] overflow-y-auto">
          <div className="pb-2 mb-2 border-b border-[#E8E5DE]">
            <span className="text-xs font-bold text-[#14171A]">Platform Navigation</span>
          </div>

          {[...primaryLinks, ...secondaryLinks].map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium transition ${
                  isActive
                    ? 'bg-[#16423C] text-white font-semibold'
                    : 'text-[#4A5056] hover:text-[#14171A] hover:bg-[#F0EDE6]'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-2 mt-2 border-t border-[#E8E5DE]">
            <Link
              href="/calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-3 rounded-lg bg-[#16423C] text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Setup Cost Estimator</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
