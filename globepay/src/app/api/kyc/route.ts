// app/api/kyc/route.ts
import { Verified } from "lucide-react";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { useId } from "react";
import { db } from "~/server/db";

export async function POST(req: Request) {
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log({message : "Verifying User", Verified: false})
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
  try {
    const { userId, kycDetails, kycDocument } = await req.json();

    // Validate incoming data
    if (!userId || !kycDetails || !kycDocument) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Save KYC details to the database
    const user = await db.user.update({
      where: { id: userId },
      data: {
        kycDetails: kycDetails,
        kycStatus: 'verified', // Set initial status
        kycDocument, // You might want to store a path or URL to the document
      },
    });
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log({message : "User verified sucessfully", Verified: true})
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error during KYC submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


// Example API route in src/app/api/kyc/route.ts
export async function GET(req: NextApiRequest) {
    try {
      const { id } = req.query; // Correctly destructure id from req.query
  
      if (typeof id !== 'string') {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
      }
  
      const useId = parseInt(id, 10); // Convert the ID to an integer
  
      if (isNaN(useId)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
      }
  
      const kycData = await db.user.findUnique({ where: { id: useId } }); // Fetch the KYC data based on user ID
  
      if (!kycData) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json(kycData); // Return the KYC data as JSON
    } catch (error) {
      console.error("Failed to fetch KYC data:", error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
