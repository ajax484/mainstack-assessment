"use client";

import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import type { PaymentData } from "@/typings";

interface BalanceChartProps {
  transactions: PaymentData[];
  finalBalance: number;
}

export default function BalanceOverTimeChart({
  transactions,
  finalBalance,
}: BalanceChartProps) {
  const sortedTx = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let balance = 0;
  const data = sortedTx.map((tx) => {
    if (tx.type === "deposit") balance += tx.amount;
    else if (tx.type === "withdrawal") balance -= tx.amount;

    return {
      date: format(parseISO(tx.date), "MMM dd, yyyy"),
      balance,
    };
  });

  const scaleFactor =
    finalBalance !== 0 && data.length > 0
      ? finalBalance / data[data.length - 1].balance
      : 1;

  const adjustedData = data.map((d) => ({
    ...d,
    balance: d.balance * scaleFactor,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="h-64 p-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={adjustedData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <Tooltip
                formatter={(value: number) => `USD${value.toFixed(2)}`}
                labelFormatter={(label) => label}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <XAxis
                dataKey="date"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickLine={false}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
                animationDuration={1200}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
