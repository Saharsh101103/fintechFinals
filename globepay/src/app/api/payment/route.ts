// app/api/payment/route.ts

import { NextResponse } from 'next/server';

import { verifyUserKYC } from '../../services/centralBank';
import { db } from '~/server/db';
import { processTransaction } from '~/app/services/interBank';


export async function POST(req: Request) {
  const { senderId, recipientId, amount } = await req.json();
  console.log(".")
  console.log(".")
  console.log(".")
  console.log(".")
  console.log(".")
  setTimeout(() => {console.log({message : "Initialising payement"})},500)
  console.log(".")
  console.log(".")
  console.log(".")
  console.log(".")
  console.log(".")

  try {
    // Verify KYC for both sender and recipient
    await verifyUserKYC(senderId);
    await verifyUserKYC(recipientId);


    const sender_details = await db.user.findUnique({where: {id: senderId}})
    // Create a transaction record
    const transaction = await db.transaction.create({
      data: {
        senderId: senderId,
        recipientId: recipientId,
        amount,
        status: 'In Progress',
      },
    });

    // Prepare transaction details for interbank processing
    const transactionDetails = {
      senderId,
      recipientId,
      amount,
      transactionId: transaction.id,
    };

    // Process the transaction through the interbank service
    const result = await processTransaction(transactionDetails);

    // Update transaction status based on interbank response
    await db.transaction.update({
      where: { id: transaction.id },
      data: { status: result.status.toString() }, // Assuming result contains a status
    });
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
  setTimeout(() => {console.log("Payment Initialised")},2000)

    
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
  }
}
