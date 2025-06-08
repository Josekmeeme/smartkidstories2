// pages/index.tsx import Link from "next/link";

export default function Home() { return ( <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 text-gray-800 font-sans"> <div className="max-w-5xl mx-auto px-6 py-20 text-center"> <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6"> 🎓 Welcome to SmartKidStories </h1> <p className="text-lg md:text-xl mb-8"> Fun, educational stories crafted by <strong>MWALIMU-AI</strong> for curious young minds in Grades 1–7. </p>

<div className="space-x-4">
      <Link href="/dashboard">
        <a className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          📅 Go to My Dashboard
        </a>
      </Link>

      <Link href="/upgrade">
        <a className="inline-block px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
          ⬆️ Upgrade Subscription
        </a>
      </Link>
    </div>

    <div className="mt-12 text-left bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">📖 Weekly Story Highlights</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Grade 1:</strong> "Wanja and the Lost Goat" — Civic Responsibility</li>
        <li><strong>Grade 3:</strong> "Tupu the Recycling Genius" — Environment & Innovation</li>
        <li><strong>Grade 6:</strong> "RoboCoach and the Math Olympiad" — AI & Learning</li>
      </ul>

      <div className="mt-4">
        <Link href="/stories">
          <a className="text-blue-600 underline hover:text-blue-800">🔍 View All Stories</a>
        </Link>
      </div>
    </div>

    <div className="mt-10 p-6 bg-yellow-100 rounded-xl shadow text-left">
      <h3 className="text-xl font-semibold text-yellow-700 mb-2">✨ Why Join SmartKidStories?
      </h3>
      <ul className="list-disc list-inside space-y-1">
        <li>Fun stories weekly in English & Kiswahili</li>
        <li>Educational themes like environment, values, governance</li>
        <li>Earn cash via referrals (40% commission!)</li>
        <li>Upgrade for lifetime access & Global Kid's Corner (French & Chinese)</li>
      </ul>
    </div>
  </div>

  <footer className="text-center text-gray-600 mt-16 mb-8">
    © {new Date().getFullYear()} SmartKidStories. Powered by MWALIMU-AI.
  </footer>
</main>

); }
