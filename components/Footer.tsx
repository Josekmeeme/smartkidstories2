'use client';
import { useState } from 'react';

export default function Footer() {
  const [language, setLanguage] = useState<'EN' | 'SW'>('EN');
  const [email, setEmail] = useState('');

  const subscribe = async () => {
    if (!email.includes('@')) {
      alert(language === 'EN' ? 'Please enter a valid email.' : 'Tafadhali weka barua pepe sahihi.');
      return;
    }

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    alert(data.message || data.error);
    if (data.success) setEmail('');
  };

  return (
    <footer className="bg-gray-100 text-gray-800 mt-12 px-4 py-8 border-t">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Column */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">SmartKidStories</h2>
          <p className="text-sm mt-1">
            {language === 'EN' ? 'Learning stories for brilliant minds.' : 'Hadithi za kujifunza kwa akili angavu.'}
          </p>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="email"
            placeholder={language === 'EN' ? 'Your email' : 'Barua pepe yako'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border rounded-md w-64"
          />
          <button
            onClick={subscribe}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
          >
            {language === 'EN' ? 'Subscribe' : 'Jiunge'}
          </button>
        </div>

        {/* Language Toggle */}
        <div className="text-sm mt-4 md:mt-0 text-center">
          <button
            onClick={() => setLanguage(language === 'EN' ? 'SW' : 'EN')}
            className="underline text-blue-500 hover:text-blue-700"
          >
            {language === 'EN' ? 'Switch to Kiswahili' : 'Badilisha kwa English'}
          </button>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-6 text-xs text-center text-gray-500">
        &copy; {new Date().getFullYear()} SmartKidStories. All rights reserved.
      </div>
    </footer>
  );
}
