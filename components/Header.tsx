'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'SW'>('EN');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight hover:text-yellow-300 transition-colors">
          SmartKidStories
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-semibold">
          <Link href="/" className="hover:text-yellow-200 transition">Home</Link>
          <Link href="/library" className="hover:text-yellow-200 transition">Library</Link>
          <Link href="/subscribe" className="hover:text-yellow-200 transition">Subscribe</Link>
        </nav>

        {/* Language Toggle */}
        <button
          onClick={() => setLanguage(language === 'EN' ? 'SW' : 'EN')}
          className="hidden md:inline bg-white text-blue-700 text-xs px-3 py-1 rounded-full font-semibold hover:bg-yellow-200 transition"
        >
          {language === 'EN' ? 'SW' : 'EN'}
        </button>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white text-blue-700 shadow-lg py-4 px-6 space-y-4 text-center rounded-b-lg">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block font-medium hover:text-purple-700">
            {language === 'EN' ? 'Home' : 'Nyumbani'}
          </Link>
          <Link href="/library" onClick={() => setMenuOpen(false)} className="block font-medium hover:text-purple-700">
            {language === 'EN' ? 'Library' : 'Maktaba'}
          </Link>
          <Link href="/subscribe" onClick={() => setMenuOpen(false)} className="block font-medium hover:text-purple-700">
            {language === 'EN' ? 'Subscribe' : 'Jiunge'}
          </Link>
          <button
            onClick={() => {
              setLanguage(language === 'EN' ? 'SW' : 'EN');
              setMenuOpen(false);
            }}
            className="block font-semibold text-sm underline text-blue-600"
          >
            {language === 'EN' ? 'Switch to Kiswahili' : 'Switch to English'}
          </button>
        </div>
      )}
    </header>
  );
}
