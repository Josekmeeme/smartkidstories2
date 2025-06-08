// /pages/api/referrals.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';

const MAX_ATTEMPTS = 3;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, referralCode } = req.body;

  if (!userId || !referralCode) {
    return res.status(400).json({ error: 'Missing userId or referralCode' });
  }

  // Check if referralCode exists
  const { data: refData, error: refError } = await supabase
    .from('referrals')
    .select('*')
    .eq('referral_code', referralCode)
    .single();

  if (refError || !refData) {
    await logAttempt(userId, 'Invalid referral code');
    return res.status(400).json({ error: 'Invalid referral code' });
  }

  // Check if already referred
  const { data: existing, error: existError } = await supabase
    .from('referrals_log')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (existing) {
    return res.status(409).json({ error: 'User already referred' });
  }

  // Create referral log
  await supabase.from('referrals_log').insert([
    {
      user_id: userId,
      referred_by: referralCode,
      timestamp: new Date().toISOString(),
    },
  ]);

  // Trigger admin alert & fraud protection if suspicious activity
  await detectFraud(userId);

  return res.status(200).json({ message: 'Referral accepted and logged' });
}

async function logAttempt(userId: string, reason: string) {
  await supabase.from('fraud_logs').insert([
    {
      user_id: userId,
      reason,
      time: new Date().toISOString(),
    },
  ]);
}

async function detectFraud(userId: string) {
  const { data, error } = await supabase
    .from('fraud_logs')
    .select('id')
    .eq('user_id', userId);

  if (data && data.length >= MAX_ATTEMPTS) {
    await supabase.from('blacklist').upsert([
      {
        user_id: userId,
        reason: 'Exceeded max fraud attempts',
        flagged_at: new Date().toISOString(),
      },
    ]);
    // Optional: Notify super admin or halt user actions
  }
}
