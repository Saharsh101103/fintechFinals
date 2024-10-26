// app/api/wallet/route.ts

import { NextResponse } from 'next/server';
import { db } from '~/server/db';


export async function GET(req: Request) {
  const { userId } = await req.json();

  try {
    // Fetch user wallet balance and transactions
    const wallet = await db.token.findMany({
      where: { id: userId },
    });

    return NextResponse.json(wallet, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve wallet' }, { status: 500 });
  }
}
