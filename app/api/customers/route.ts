import Customer from '@/database/models/Customer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const res = NextResponse;
  try {
    const { name, email, password, roles } = await req.json();

    const customer = await Customer.create({ name, email, password, roles });
    return res.json(customer, { status: 201 });
  } catch (error: any) {
    const mapedErrors = error.errors.map(({ message, path }: { message: string, path: string }) => ({
      key: path,
      message,
    }));

    return res.json({ errors: mapedErrors }, { status: 422 });
  }
}
