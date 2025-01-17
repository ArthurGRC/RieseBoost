import Customer from '@/database/models/Customer';
import { sessionOptions } from '@/lib/session';
import { roleValidate } from '@/helpers/authValidate';
import { CUSTOMER_ROLES } from '@/helpers/constants/enums';
import { UNAUTHORIZED_ERROR } from '@/helpers/constants/errors';
import redis from '@/src/redis';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const res = NextResponse;
  const { user }: { user: string } = await getIronSession(await cookies(), sessionOptions);
  const client = JSON.parse((await redis.get(user)) as string);

  if (!roleValidate([CUSTOMER_ROLES.admin], client?.roles)) {
    return res.json(UNAUTHORIZED_ERROR, { status: 401 });
  }

  try {
    const { name, email, password, roles } = await req.json();

    const customer = await Customer.create({ name, email, password, roles });
    return res.json(customer, { status: 201 });
  } catch (error: any) {
    const mapedErrors = Object.keys(error.errors).map((key) => ({
      key,
      message: error.errors[key].message,
    }));

    return res.json({ errors: mapedErrors }, { status: 422 });
  }
}
