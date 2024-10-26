import { NextResponse } from 'next/server';
import { db } from '~/server/db';


export async function POST(req: Request) {
    setTimeout(() => console.log({message: "Confirmation recieved from partner bank"}), 500)
    
    try {
        const { user_id, unique_id, amount, status } = await req.json();

        // Insert logic to create an invoice in the database
        const invoice = await db.invoice.create({
            data: {
                userId: user_id,
                uniqueId: unique_id,
                amount: amount,
                status: "paid",
            },
        });
        console.log(".")
        console.log(".")
        console.log(".")
        console.log(".")
        console.log(".")
        setTimeout(()=>{console.log({message : "Preparing invoice and deducting GlobCoin from user."})}, 1500)
        console.log(".")
        console.log(".")
        console.log(".")
        console.log(".")
        console.log(".")
        setTimeout(()=>{console.log({message : "Invoice sent to sender and reciever, successfully"})}, 2000)
        console.log(".")
        console.log(".")
        console.log(".")
        console.log(".")
        console.log(".")
        return NextResponse.json(invoice, { status: 201 });
    } catch (error) {
        console.error("Failed to create invoice:", error);
        return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
    }
}
