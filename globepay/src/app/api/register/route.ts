// app/api/register/route.ts

import { NextResponse } from 'next/server';
import { db } from '~/server/db';


export async function POST(req: Request) {
  const { name, email, phone, KYC_details, banking_info, kycStatus } = await req.json();
  console.log(".")
  console.log(".")
  console.log(".")
  console.log(".")
  console.log(".")
  console.log("Registering User")
  console.log(".")
  console.log(".")
  console.log(".")
  console.log(".")
  console.log(".")

  try {
    const user = await db.user.create({
      data: {
        kycStatus: "pending",
        name,
        email,
        phone,
        kycDetails: KYC_details,
        bankingInfo: banking_info,
      },
    });
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log({message: "User registered successfully", verified: false})
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'User registration failed' }, { status: 500 });
  }
}
