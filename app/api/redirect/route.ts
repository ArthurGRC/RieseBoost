import { sessionOptions } from '@/lib/session';
import { roleValidate } from '@/src/helpers/authValidate';
import { USER_ROLES } from '@/src/helpers/constants/enums';
import { UNAUTHORIZED_ERROR } from '@/src/helpers/constants/errors';
import redis from '@/src/redis';
import getAccessToken from '@/src/services/mercadoLivre/POST/accessToken';
import getRefreshToken from '@/src/services/mercadoLivre/POST/refreshToken';
import { log } from '@logtail/next';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const res = NextResponse;
  const { user }: { user: string } = await getIronSession(cookies(), sessionOptions);
  const client: any = JSON.parse((await redis.get(user)) as string);

  if (!roleValidate([USER_ROLES.user], client?.roles)) {
    return res.json(UNAUTHORIZED_ERROR, { status: 401 });
  }

  try {
    const code = req.nextUrl.searchParams.get('code');

    const accessToken = await getAccessToken(code as string);
    const refreshToken = await getRefreshToken(accessToken?.data?.refresh_token);

    await redis.set(
      user,
      JSON.stringify({ id: client.id, email: client.email, roles: client.roles, refreshToken: refreshToken.data }),
    );

    return res.redirect(`${process.env.APP_URL}/dashboard`);
  } catch (error) {
    log.error('Error - api redirect', { error });
    return res.json({ error }, { status: 500 });
  }
}
