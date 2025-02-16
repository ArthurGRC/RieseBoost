import { log } from '@logtail/next';
import bcrypt from 'bcrypt';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import Customer from '@/database/models/Customer';
import { INCORRECT_PASSWORD, NOT_FOUND_USER, UNEXPECTED_ERROR } from '@/helpers/constants/errors';
import { oneWeekInSeconds, thirtyDaysInSeconds } from '@/helpers/session';
import { sessionOptions } from '@/lib/session';
import redis from '@/src/redis';

export async function POST(req: NextRequest) {
  const res = NextResponse;
  const { email, password, rememberMe } = await req.json();

  sessionOptions.cookieOptions.maxAge = rememberMe ? thirtyDaysInSeconds : oneWeekInSeconds;
  const session: any = await getIronSession(await cookies(), sessionOptions);

  try {
    const customer = await Customer.findOne({
      where: { email },
      attributes: ['password', 'id', 'roles', 'name'],
    });

    if (!customer) return res.json({ errors: [NOT_FOUND_USER] }, { status: 404 });

    const match = await bcrypt.compare(password, customer.password);

    if (!match) return res.json({ errors: [INCORRECT_PASSWORD] }, { status: 401 });

    const randomSessionId = uuidv4();
    session.user = randomSessionId;

    await session.save();
    await redis.set(
      randomSessionId,
      JSON.stringify({
        id: customer?.id,
        roles: customer?.roles,
        email,
        name: customer?.name,
        lastLoginTime: Date.now(),
      }),
    );

    log.info('Logged successfully', { email });
    return res.json({ message: 'Ok' }, { status: 200 });
  } catch (error: any) {
    log.error('Error - api login', { error });

    const mapedErrors = error.errors
      ? Object.keys(error.errors).map((key) => ({
          path: key,
          message: error.errors[key].message,
        }))
      : [UNEXPECTED_ERROR];

    return res.json({ errors: mapedErrors }, { status: 422 });
  }
}
