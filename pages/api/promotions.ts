// /pages/api/Promotions.ts
import { NextApiRequest, NextApiResponse } from 'next';

let promotions = [
  { id: 1, text: '🎉 Upgrade now and access Global Kid's Corner!', tier: 'gold' },
  { id: 2, text: '📣 Share stories and earn 40% from referrals!', tier: 'all' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(promotions);
  } else if (req.method === 'POST') {
    const { text, tier } = req.body;
    if (!text || !tier) {
      return res.status(400).json({ error: 'Text and tier required' });
    }
    const newPromo = { id: Date.now(), text, tier };
    promotions.push(newPromo);
    res.status(201).json(newPromo);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
