import { useFetch } from "@/hooks/use-fetch";
import { cn } from "@/lib/utils";
import type { FilterType, PaymentData, TransactionType, WalletData } from "@/typings";
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  DownloadSimpleIcon,
  ScrollIcon,
} from "@phosphor-icons/react";
import { format, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import Appbar from "@/components/Appbar";
import BalanceOverTimeChart from "@/components/Chart";
import Filter from "@/components/Filter";
import { useState, useMemo } from "react";

function Home() {
  const { data: paymentData, loading: paymentDataIsLoading } = useFetch<
    PaymentData[]
  >("https://fe-task-api.mainstack.io/transactions");

  const { data: walletData, loading: walletDataIsLoading } =
    useFetch<WalletData>("https://fe-task-api.mainstack.io/wallet");

  const [filters, setFilters] = useState<FilterType>({
    fromDate: undefined,
    toDate: undefined,
    transactionType: [],
    transactionStatus: [],
  });

  const filteredTransactions = useMemo(() => {
    if (!paymentData) return [];

    return paymentData.filter((transaction) => {
      if (filters.fromDate && filters.toDate) {
        const transactionDate = new Date(transaction.date);
        const fromDate = startOfDay(filters.fromDate);
        const toDate = endOfDay(filters.toDate);

        if (
          !isWithinInterval(transactionDate, { start: fromDate, end: toDate })
        ) {
          return false;
        }
      }

      if (filters.transactionType.length > 0) {
        const transactionType =
          transaction.type === "deposit" ? "Get Tipped" : "Withdrawals";
        if (
          !filters.transactionType.includes(transactionType as TransactionType)
        ) {
          return false;
        }
      }

      if (filters.transactionStatus.length > 0) {
        if (!filters.transactionStatus.includes(transaction.status)) {
          return false;
        }
      }

      return true;
    });
  }, [paymentData, filters]);

  const getTransactionCountText = () => {
    const totalCount = paymentData?.length ?? 0;
    const filteredCount = filteredTransactions.length;

    if (filteredCount === totalCount) {
      return `${totalCount} transactions`;
    }
    return `${filteredCount} of ${totalCount} transactions`;
  };

  const getDateRangeText = () => {
    if (filters.fromDate && filters.toDate) {
      return `Your transactions from ${format(
        filters.fromDate,
        "MMM dd, yyyy"
      )} to ${format(filters.toDate, "MMM dd, yyyy")}`;
    }
    return "Your transactions for All time";
  };

  const isFilterActive = useMemo(() => {
    return (
      filters.fromDate ||
      filters.toDate ||
      filters.transactionType.length > 0 ||
      filters.transactionStatus.length > 0
    );
  }, [filters]);

  return (
    <>
      <Appbar />
      <main className="space-y-12 mt-24 py-12 max-w-6xl mx-auto">
        <section className="grid grid-cols-12 gap-24">
          <section className="col-span-8 flex flex-col gap-16 justify-between">
            <div className="flex items-center w-full gap-16">
              <h2 className="flex flex-col gap-4">
                <span className="text-sm text-TK-gray">Available Balance</span>
                <span className="text-4xl font-bold">
                  {walletDataIsLoading ? (
                    <Skeleton className="w-full h-10" />
                  ) : (
                    `USD ${walletData?.balance.toFixed(2)}`
                  )}
                </span>
              </h2>
              <button className="bg-TK-black py-4 px-12 text-white rounded-full">
                Withdraw
              </button>
            </div>
            <BalanceOverTimeChart
              transactions={filteredTransactions}
              finalBalance={walletData?.balance ?? 0}
            />
          </section>
          <section className="col-span-4">
            <ul className="flex flex-col gap-8 justify-between">
              <li className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm ">Ledger Balance</span>
                  <img src="./images/info.svg" alt="info" />
                </div>
                <span className="text-3xl font-bold text-TK-black">
                  {walletDataIsLoading ? (
                    <Skeleton className="w-full h-10" />
                  ) : (
                    `USD ${walletData?.ledger_balance.toFixed(2)}`
                  )}
                </span>
              </li>
              <li className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm ">Total Payout</span>
                  <img src="./images/info.svg" alt="info" />
                </div>
                <span className="text-3xl font-bold text-TK-black">
                  {walletDataIsLoading ? (
                    <Skeleton className="w-full h-10" />
                  ) : (
                    `USD ${walletData?.total_payout.toFixed(2)}`
                  )}
                </span>
              </li>
              <li className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm ">Total Revenue</span>
                  <img src="./images/info.svg" alt="info" />
                </div>
                <span className="text-3xl font-bold text-TK-black">
                  {walletDataIsLoading ? (
                    <Skeleton className="w-full h-10" />
                  ) : (
                    `USD ${walletData?.total_revenue.toFixed(2)}`
                  )}
                </span>
              </li>
              <li className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pending Payout</span>
                  <img src="./images/info.svg" alt="info" />
                </div>
                <span className="text-3xl font-bold text-TK-black">
                  {walletDataIsLoading ? (
                    <Skeleton className="w-full h-10" />
                  ) : (
                    `USD ${walletData?.pending_payout.toFixed(2)}`
                  )}
                </span>
              </li>
            </ul>
          </section>
        </section>
        <section className="space-y-8">
          <div className="flex justify-between items-center py-4 border-b border-TK-border">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">
                {getTransactionCountText()}
              </h2>
              <span className="text-sm">{getDateRangeText()}</span>
              {isFilterActive && (
                <span className="text-xs text-blue-600 mt-1">
                  Filters applied •{" "}
                  <button
                    onClick={() =>
                      setFilters({
                        fromDate: undefined,
                        toDate: undefined,
                        transactionType: [],
                        transactionStatus: [],
                      })
                    }
                    className="underline hover:no-underline"
                  >
                    Clear all
                  </button>
                </span>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <Filter filters={filters} setFilter={setFilters} />
              <button className="flex items-center gap-4 bg-btn-bg px-8 py-4 rounded-full text-TK-black font-semibold">
                <span>Export List</span>
                <DownloadSimpleIcon size={20} weight="bold" />
              </button>
            </div>
          </div>

          <ul className="space-y-6">
            {paymentDataIsLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <Skeleton className="size-10 rounded-full" />
                      <div className="flex flex-col gap-2">
                        <Skeleton className="w-12 h-4" />
                        <Skeleton className="w-12 h-3.5" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Skeleton className="w-12 h-4" />
                      <Skeleton className="w-12 h-3.5" />
                    </div>
                  </li>
                ))}
              </>
            ) : filteredTransactions.length === 0 ? (
              <div className="py-12 text-gray-500">
                {isFilterActive ? (
                  <div className="w-1/2 flex flex-col mx-auto gap-4">
                    <div className="bg-TK-border rounded-2xl p-4 w-fit text-TK-black gap-4 w-fit mx-auto">
                      <ScrollIcon size={20} weight="bold" />
                    </div>
                    <p className="text-3xl font-bold text-TK-black">
                      No matching transaction found for the selected filter
                    </p>
                    <p>
                      Change your filters to see more results, or add a new
                      product.
                    </p>
                    <button
                      onClick={() =>
                        setFilters({
                          fromDate: undefined,
                          toDate: undefined,
                          transactionType: [],
                          transactionStatus: [],
                        })
                      }
                      className="px-6 py-2 bg-TK-border text-TK-black rounded-full font-semibold w-fit mx-auto"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <p className="text-lg font-medium">No transactions found</p>
                )}
              </div>
            ) : (
              <>
                {filteredTransactions.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <div
                        className={cn(
                          "size-12 rounded-full flex items-center justify-center",
                          item.type === "deposit"
                            ? "text-green-600 bg-green-100"
                            : "text-red-600 bg-red-100"
                        )}
                      >
                        {item.type === "deposit" ? (
                          <ArrowDownLeftIcon size={20} />
                        ) : (
                          <ArrowUpRightIcon size={20} />
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <h4>
                          {item.type === "deposit"
                            ? item?.metadata?.product_name ?? "N/A"
                            : "Cash withdrawal"}
                        </h4>
                        <div className="text-sm">
                          {item.type === "deposit" ? (
                            item?.metadata?.name
                          ) : (
                            <span
                              className={cn(
                                item.status === "successful"
                                  ? "text-green-600"
                                  : item.status === "pending"
                                  ? "text-amber-600"
                                  : "text-red-600"
                              )}
                            >
                              {item.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <span className="text-TK-black font-bold">
                        USD {item.amount.toFixed(2)}
                      </span>
                      <span className="text-sm">
                        {format(new Date(item.date), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Home;
