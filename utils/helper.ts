// utils/helper.ts

const rateLimits: Record<string, { [action: string]: number }> = {};

export function isRateLimited(ip: string, action: string, interval: number = 10000): boolean {
  const now = Date.now();

  if (!rateLimits[ip]) rateLimits[ip] = {};
  if (!rateLimits[ip][action]) {
    rateLimits[ip][action] = now;
    return false;
  }

  if (now - rateLimits[ip][action] < interval) return true;

  rateLimits[ip][action] = now;
  return false;
}

export function sanitizeInput(input: string): string {
  return input.replace(/[^a-zA-Z0-9 _@.-]/g, '').trim();
}
