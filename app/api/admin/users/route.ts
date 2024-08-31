import User from '@/database/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const res = NextResponse;
  try {
    const { name, email, password, roles } = await req.json();

    const user = await User.create({ name, email, password, roles });
    return res.json(user, { status: 201 });
  } catch (error: any) {
    const mapedErrors =  Object.keys(error.errors).map(key => ({
      key,
      message: error.errors[key].message
    }));

    return res.json({ errors: mapedErrors }, { status: 422 });
  }
}

