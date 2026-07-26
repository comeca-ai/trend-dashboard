'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-dark/80 backdrop-blur border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg"></div>
          <span className="font-bold text-xl">Trend Dashboard</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-gray-300 hover:text-primary transition">
            Features
          </Link>
          <Link href="/dashboard" className="text-gray-300 hover:text-primary transition">
            Dashboard
          </Link>
          <Link href="/pricing" className="text-gray-300 hover:text-primary transition">
            Preços
          </Link>
          <Link
            href="/login"
            className="px-6 py-2 bg-primary hover:bg-primary/90 rounded-lg font-semibold transition"
          >
            Login
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700">
          <div className="px-6 py-4 space-y-4">
            <Link href="#features" className="block text-gray-300 hover:text-primary">
              Features
            </Link>
            <Link href="/dashboard" className="block text-gray-300 hover:text-primary">
              Dashboard
            </Link>
            <Link href="/pricing" className="block text-gray-300 hover:text-primary">
              Preços
            </Link>
            <Link href="/login" className="block px-6 py-2 bg-primary rounded-lg text-center">
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
