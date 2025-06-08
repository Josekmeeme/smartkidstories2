// /pages/api/Subscribe.ts
import { NextApiRequest, NextApiResponse } from 'next';

let subscribers: string[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Valid email required' });
    }
    subscribers.push(email);
    res.status(201).json({ success: true, email });
  } else if (req.method === 'GET') {
    res.status(200).json(subscribers);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
