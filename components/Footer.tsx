// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left">
          <p className="text-sm">&copy; {new Date().getFullYear()} SmartKidStories. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm mt-4 sm:mt-0">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/stories" className="hover:underline">Library</Link>
          <Link href="/subscribe" className="hover:underline">Upgrade</Link>
          <Link href="/help" className="hover:underline">Help</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
        </div>
      </div>

      <div className="text-center mt-4 text-xs text-gray-400">
        <p>Empowering kids through stories & civic values. 🌍🌱</p>
      </div>
    </footer>
  );
}
