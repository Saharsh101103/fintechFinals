'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TransactionList from './TransactionList';
import { Transaction } from 'lib/types';
import { Loader2 } from 'lucide-react';

export default function SimplifiedPaymentDashboard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transaction');
        const data = await response.json();
        setTransactions(data); // Already in the desired format
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Payment submitted:', { amount, recipient });

    const newTransaction: Transaction = {
      id: Date.now(),
      title: `Sent $${amount}`,
      description: `To: ${recipient}`,
      type: "sent"
    };
    setTransactions(prev => [newTransaction, ...prev]);

    // Clear form and reset submission state
    setAmount('');
    setRecipient('');
    setIsSubmitting(false);
    setIsDialogOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto p-4 my-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
        <motion.div className="lg:col-span-1 bg-muted-foreground rounded-lg">
          <Card className="h-full flex flex-col justify-center items-center bg-gradient-to-t from-blue-500 to-purple-600 rounded-lg backdrop-blur-3xl">
            <CardContent className="pt-6">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-48 h-48 text-4xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Pay
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Make a Payment</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <div className="relative">
                        <Input
                          id="amount"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          type="number"
                          min="0"
                          step="0.01"
                          required
                          className="pl-8"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient</Label>
                      <Input
                        id="recipient"
                        placeholder="Enter recipient"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Confirm Payment'
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </motion.div>
        <div className="lg:col-span-2 space-y-4">
          <TransactionList transactions={transactions.filter(tx => tx.type === 'sent')} type={'sent'} />
          <TransactionList transactions={transactions.filter(tx => tx.type === 'received')} type={'received'} />
        </div>
      </div>
    </motion.div>
  );
}
