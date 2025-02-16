import { log } from '@logtail/next';
import { NextRequest, NextResponse } from 'next/server';

import Customer from '@/database/models/Customer';
import { NOT_FOUND_TOKEN, PASSWORD_NOT_EQUAL, UNEXPECTED_ERROR } from '@/helpers/constants/errors';
import { verifyToken } from '@/src/helpers/JWT/decode';

export async function POST(req: NextRequest) {
  const res = NextResponse;
  const { token, password, confirmPassword } = await req.json();

  try {
    if (!token) return res.json({ errors: [NOT_FOUND_TOKEN] });

    const { data, error } = verifyToken(token);
    if (error) return res.json({ errors: [error], data: undefined }, { status: 400 });

    if (password === confirmPassword) {
      const customer = await Customer.update(
        { password, password_confirmation_token: null },
        { where: { email: data.email }, individualHooks: true },
      );

      return res.json({ errors: undefined, data: customer }, { status: 200 });
    }

    return res.json({ errors: [PASSWORD_NOT_EQUAL], data: undefined }, { status: 400 });
  } catch (error: any) {
    log.error('Error - api forgotPassword', { error });

    const mapedErrors = error.errors
      ? Object.keys(error.errors).map((key) => ({
          path: key,
          message: error.errors[key].message,
        }))
      : [UNEXPECTED_ERROR];

    return res.json({ errors: mapedErrors }, { status: 422 });
  }
}
