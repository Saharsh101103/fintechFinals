import { NextResponse } from 'next/server';
import { db } from '~/server/db';


export async function POST(req: Request) {
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    setTimeout(()=>{console.log({message: "Creating token"})}, 500)
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    try {
        const { user_id, amount, transaction_reference } = await req.json();

        // Insert logic to create a token in the database
        const token = await db.token.create({
            data: {
                userId: user_id,
                amount: amount,
                transactionReference: transaction_reference,
            },
        });

        console.log(".")
        console.log(".")
        console.log(".")
        console.log(".")
        console.log(".")
        setTimeout(()=>{console.log({message : "Token created and sent to user successfully"})},2000)
        
        console.log(".")
        console.log(".")
        console.log(".")
        console.log(".")
        console.log(".")
        setTimeout(()=>{console.log({message : "Transfer request sent to partnered bank, awaiting response.."})},4000)
        
        console.log(".")
        console.log(".")
        console.log(".")
        console.log(".")
        console.log(".")
        
        return NextResponse.json(token, { status: 201 });
    } catch (error) {
        console.error("Failed to create token:", error);
        return NextResponse.json({ error: "Failed to create token" }, { status: 500 });
    }
}
