// TransactionList.tsx
import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Transaction } from 'lib/types';

interface TransactionListProps {
  transactions: Transaction[];
  type: 'sent' | 'received';
}

const TransactionList: FC<TransactionListProps> = ({ transactions, type }) => {
  const filteredTransactions = transactions.filter(tx => tx.type === type);

  return (
    <motion.div>
      <Card>
        <CardHeader>
          <CardTitle>{type === 'sent' ? 'Sent Transactions' : 'Received Transactions'}</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] pr-4">
            {filteredTransactions.map((tx) => (
              <motion.div 
                key={tx.id} 
                className="mb-4 last:mb-0 p-3 rounded-lg bg-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{tx.title}</h3>
                  <Badge variant={type === 'sent' ? 'destructive' : 'default'}>
                    {type === 'sent' ? (
                      <ArrowUpRight className="mr-1 h-3 w-3" /> 
                    ) : (
                      <ArrowDownLeft className="mr-1 h-3 w-3" />
                    )}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{tx.description}</p>
              </motion.div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TransactionList;
