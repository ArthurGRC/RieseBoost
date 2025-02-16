import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = req;
    return NextResponse.json({ message: url });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'deu erro' }, { status: 500 });
  }
}
