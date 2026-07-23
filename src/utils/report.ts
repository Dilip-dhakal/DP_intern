import { Prisma } from "../generated/prisma/index.js";

// export type GroupBy = "daily" | "weekly" | "monthly" | "yearly";

export type GroupBy =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";

export const getPeriod = (
  date: Date,
  groupBy: GroupBy
): string => {
  if (groupBy === "daily") {
    return date.toISOString().split("T")[0];
  }

  if (groupBy === "monthly") {
    return date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  }

  if (groupBy === "yearly") {
    return date.getFullYear().toString();
  }

  // Weekly
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - date.getDay() + 1);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const start = weekStart.toLocaleDateString("default", {
    day: "2-digit",
    month: "short",
  });

  const end = weekEnd.toLocaleDateString("default", {
    day: "2-digit",
    month: "short",
  });

  return `${start} - ${end}`;
};

export const groupTransactions = (
  transactions: {
    transactionDate: Date;
    amount: Prisma.Decimal;
  }[],
  groupBy: GroupBy
) => {
  const grouped = transactions.reduce<Record<string, number>>(
    (acc, transaction) => {
      const period = getPeriod(
        transaction.transactionDate,
        groupBy
      );

      if (!acc[period]) {
        acc[period] = 0;
      }

      acc[period] += Number(transaction.amount);

      return acc;
    },
    {}
  );

  return Object.entries(grouped).map(([period, total]) => ({
    period,
    total,
  }));
};