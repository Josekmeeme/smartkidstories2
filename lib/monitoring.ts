// lib/monitoring.ts

import { db } from './db'

export async function logSuspiciousActivity({
  userId,
  action,
  reason,
}: {
  userId: string
  action: string
  reason: string
}) {
  try {
    await db.securityLog.create({
      data: {
        userId,
        action,
        reason,
        timestamp: new Date(),
      },
    })
  } catch (err) {
    console.error('Failed to log security event:', err)
  }
}

export async function flagUser(userId: string, reason: string) {
  try {
    await db.user.update({
      where: { id: userId },
      data: {
        flagged: true,
        flagReason: reason,
      },
    })

    await logSuspiciousActivity({
      userId,
      action: 'User flagged',
      reason,
    })
  } catch (err) {
    console.error('Failed to flag user:', err)
  }
}
