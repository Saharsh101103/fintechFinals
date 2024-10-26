import { NextResponse } from 'next/server';

// Mock function to get user data based on ID
const getUserById = (id: number) => {
  const users = [
    { id: 1, username: 'John Doe' },
    { id: 2, username: 'Jane Smith' },
    { id: 3, username: 'Surya Kumar' },
    { id: 4, username: 'Krish Singh' },
    { id: 5, username: 'Mighty Raju' },
    { id: 6, username: 'Bheem sen' },
    { id: 7, username: 'Yudhisthir Raj' },
    { id: 8, username: 'Arjun Singh' },
    { id: 9, username: 'Nakul Sharma' },
    { id: 10, username: 'Sehdev Yadav' },
    // Add more users as needed
  ];
  return users.find(user => user.id === id);
};

export async function GET() {
  // Simulating fetching transactions from a database
  const transactionsData = {
    sent: [
      { id: 1, senderId: 1, recipientId: 2, amount: 100.51, status: "In Progress", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, senderId: 4, recipientId: 3, amount: 100.51, status: "200", createdAt: new Date(), updatedAt: new Date() },
    ],
    received: [ { id: 4, senderId: 5, recipientId: 2, amount: 1002.5, status: "In Progress", createdAt: new Date(), updatedAt: new Date() },
        { id: 8, senderId: 9, recipientId: 2, amount: 1001.5, status: "200", createdAt: new Date(), updatedAt: new Date() },]
  };

  const { sent, received } = transactionsData;

  // Transform sent transactions
  const transformedSent = sent.map(tx => {
    const sender = getUserById(tx.senderId);
    const recipient = getUserById(tx.recipientId);
    return {
      id: tx.id,
      title: `Sent $${tx.amount}`,
      description: `To: ${recipient?.username || 'Unknown'}`,
      type: 'sent',
    };
  });

  // Transform received transactions
  const transformedReceived = received.map(tx => {
    const sender = getUserById(tx.senderId);
    return {
      id: tx.id,
      title: `Received $${tx.amount}`,
      description: `From: ${sender?.username || 'Unknown'}`,
      type: 'received',
    };
  });

  const transformedTransactions = [...transformedSent, ...transformedReceived];

  return NextResponse.json(transformedTransactions);
}
