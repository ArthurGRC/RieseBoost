import { log } from '@logtail/next';
import { NextRequest, NextResponse } from 'next/server';

import Customer from '@/database/models/Customer';
import { UNEXPECTED_ERROR } from '@/helpers/constants/errors';

export async function POST(req: NextRequest) {
  const res = NextResponse;
  try {
    const { name, email, password, roles } = await req.json();

    const customer = await Customer.create({ name, email, password, roles });
    return res.json(customer, { status: 201 });
  } catch (error: any) {
    log.error('Error - api create customer', { error });

    const mapedErrors = error.errors
      ? Object.keys(error.errors).map((key) => ({
          path: key,
          message: error.errors[key].message,
        }))
      : [UNEXPECTED_ERROR];

    return res.json({ errors: mapedErrors }, { status: 422 });
  }
}
