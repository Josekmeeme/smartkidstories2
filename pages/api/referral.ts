// /pages/api/Referrals.ts
import { NextApiRequest, NextApiResponse } from 'next';

let referralDB: Record<string, number> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (req.method === 'GET') {
    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Invalid userId' });
    }
    const earnings = referralDB[userId] || 0;
    res.status(200).json({ userId, earnings });
  } else if (req.method === 'POST') {
    const { userId, amount } = req.body;
    if (!userId || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Invalid input' });
    }
    referralDB[userId] = (referralDB[userId] || 0) + amount;
    res.status(200).json({ userId, updated: referralDB[userId] });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
