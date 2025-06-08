import { NextApiRequest, NextApiResponse } from 'next'
import db from '@/lib/db'
import { sendAlertToAdmin, getFingerprintScore } from '@/lib/monitoring'
import { getUserById, logReferralAction } from '@/lib/referralUtils'
import { getDeviceInfo } from '@/lib/deviceInfo'

const MAX_SCORE = 80
const REFERRAL_COMMISSION = 40

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const {
    referrerId,
    referredUserId,
    hasSubscribed,
    hasUnlocked,
    ip,
    userAgent,
    registeredAt,
    unlockedAt,
  } = req.body

  if (!referrerId || !referredUserId || !ip || !userAgent)
    return res.status(400).json({ message: 'Missing fields' })

  try {
    const referrer = await getUserById(referrerId)
    const referred = await getUserById(referredUserId)

    if (!referrer || !referred) return res.status(404).json({ message: 'User not found' })

    if (!hasSubscribed || !hasUnlocked)
      return res.status(403).json({ message: 'Referral invalid — no conversion' })

    // Time delay check (minimum 3 minutes between register and unlock)
    const unlockTime = new Date(unlockedAt)
    const registerTime = new Date(registeredAt)
    const minutesDiff = (unlockTime.getTime() - registerTime.getTime()) / 60000

    if (minutesDiff < 3)
      return res.status(403).json({ message: 'Suspiciously fast conversion — rejected' })

    // Fraud score calculation
    const suspicionScore = await getFingerprintScore({
      referredUserId,
      ip,
      userAgent,
    })

    if (suspicionScore >= MAX_SCORE) {
      await db.flag.create({
        data: {
          userId: referrerId,
          level: 'high',
          reason: 'Suspicious referral behavior (auto-scored)',
        },
      })

      await logReferralAction(referrerId, referredUserId, `Blocked — Suspicion score ${suspicionScore}`)
      await sendAlertToAdmin({
        type: 'fraud-detected',
        userId: referrerId,
        score: suspicionScore,
        message: 'Referral blocked due to suspected abuse',
      })

      return res.status(403).json({ message: 'Referral blocked — flagged as high risk' })
    }

    // Store secure referral
    const referral = await db.referral.create({
      data: {
        referrerId,
        referredUserId,
        earned: REFERRAL_COMMISSION,
        confirmed: true,
        ip,
        userAgent,
        suspicionScore,
      },
    })

    await db.referralSchedule.create({
      data: {
        referralId: referral.id,
        payoutDate: getNextPayoutDate(),
      },
    })

    await logReferralAction(referrerId, referredUserId, 'Approved — Secure referral recorded')
    return res.status(200).json({ success: true, referralId: referral.id })
  } catch (err) {
    console.error('Referral error:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

function getNextPayoutDate() {
  const today = new Date()
  const cutoffDay = 4 // Thursday
  const payoutDay = 5 // Friday

  if (today.getDay() > cutoffDay || (today.getDay() === cutoffDay && today.getHours() >= 6)) {
    today.setDate(today.getDate() + (7 - today.getDay() + payoutDay))
  } else {
    today.setDate(today.getDate() + (payoutDay - today.getDay()))
  }
  today.setHours(9, 0, 0, 0)
  return today
}
