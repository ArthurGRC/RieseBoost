import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { sessionOptions } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { user }: { user: string } = await getIronSession(await cookies(), sessionOptions);

  if (user) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: '/',
};
