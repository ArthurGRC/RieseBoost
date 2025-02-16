import { log } from '@logtail/next';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { sessionOptions } from '@/lib/session';
import { NOT_FOUND_USER } from '@/src/helpers/constants/errors';
import redis from '@/src/redis';

export async function GET() {
  const res = NextResponse;
  const { user }: { user: string } = await getIronSession(await cookies(), sessionOptions);
  const { lastLoginTime, name }: { lastLoginTime: Date; name: string } = JSON.parse((await redis.get(user)) as string);

  try {
    if (!user) {
      return res.json({ errors: [NOT_FOUND_USER] }, { status: 404 });
    }

    return res.json({ client: { lastLoginTime, name } }, { status: 200 });
  } catch (error) {
    log.error('Error - api user session', { error });
    return res.json({ error }, { status: 500 });
  }
}
