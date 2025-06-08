// pages/dashboard.tsx
import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [referralEarnings, setReferralEarnings] = useState({
    total: 1280,
    thisWeek: 320,
    withdrawn: 600,
    balance: 680,
  });

  const [subscription, setSubscription] = useState({
    plan: "Grade 3 Monthly Access",
    status: "Active",
    expiry: "2025-07-06",
  });

  const [referralLink] = useState("https://smartkidstories.netlify.app/register?ref=yourname123");

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">👋 Welcome to Your Dashboard</h1>

        {/* SUBSCRIPTION STATUS */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-3 text-green-700">📦 Your Subscription</h2>
          <p><strong>Plan:</strong> {subscription.plan}</p>
          <p><strong>Status:</strong> {subscription.status}</p>
          <p><strong>Expires:</strong> {subscription.expiry}</p>
          <div className="mt-4">
            <Link href="/upgrade">
              <a className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">⬆️ Upgrade Plan</a>
            </Link>
          </div>
        </section>

        {/* REFERRAL EARNINGS */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-3 text-purple-700">💸 Referral Earnings</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Earned</p>
              <p className="text-xl font-bold">Ksh {referralEarnings.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">This Week</p>
              <p className="text-xl font-bold">Ksh {referralEarnings.thisWeek}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Withdrawn</p>
              <p className="text-xl font-bold">Ksh {referralEarnings.withdrawn}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Balance</p>
              <p className="text-xl font-bold">Ksh {referralEarnings.balance}</p>
            </div>
          </div>

          <div className="mt-5 text-center">
            <button className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              💰 Request Withdrawal (Friday)
            </button>
          </div>
        </section>

        {/* REFERRAL LINK */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-3 text-indigo-700">🔗 Your Referral Link</h2>
          <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="w-full bg-transparent focus:outline-none"
            />
            <button
              onClick={() => navigator.clipboard.writeText(referralLink)}
              className="ml-4 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              📋 Copy
            </button>
          </div>
        </section>

        {/* GLOBAL KID'S CORNER PROMPT */}
        <section className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold text-pink-600 mb-2">🌍 Unlock Global Kid’s Corner</h2>
          <p className="mb-3">Learn French 🇫🇷 and Chinese 🇨🇳 with simple fun lessons for kids! Exclusive to Gold Tier.</p>
          <Link href="/upgrade">
            <a className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">Upgrade to Gold (Ksh 1000)</a>
          </Link>
        </section>
      </div>
    </main>
  );
} 
