import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CaretDownIcon } from "@phosphor-icons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";
import type { FilterType } from "@/typings";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { format, subDays, startOfMonth, startOfDay, endOfDay } from "date-fns";

const Filter = ({
  filters,
  setFilter,
}: {
  filters: FilterType;
  setFilter: (filters: FilterType) => void;
}) => {
  const [updatedFilters, setUpdatedFilters] = useState<FilterType>(filters);
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    setFilter(updatedFilters);
    setIsOpen(false);
  };

  const handleClear = () => {
    const clearedFilters: FilterType = {
      fromDate: undefined,
      toDate: undefined,
      transactionType: [],
      transactionStatus: [],
    };
    setUpdatedFilters(clearedFilters);
    setFilter(clearedFilters);
    setIsOpen(false);
  };

  const handleQuickDateSelect = (range: string) => {
    const today = new Date();
    let fromDate: Date | undefined;
    let toDate: Date | undefined;

    switch (range) {
      case "today":
        fromDate = startOfDay(today);
        toDate = endOfDay(today);
        break;
      case "last 7 days":
        fromDate = subDays(today, 6);
        toDate = endOfDay(today);
        break;
      case "this month":
        fromDate = startOfMonth(today);
        toDate = endOfDay(today);
        break;
      case "last 3 months":
        fromDate = subDays(today, 89);
        toDate = endOfDay(today);
        break;
      default:
        break;
    }

    setUpdatedFilters({
      ...updatedFilters,
      fromDate,
      toDate,
    });
  };

  const handleTransactionTypeChange = (
    type: FilterType["transactionType"][0]
  ) => {
    const currentTypes = updatedFilters.transactionType;
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];

    setUpdatedFilters({
      ...updatedFilters,
      transactionType: newTypes,
    });
  };

  const handleTransactionStatusChange = (
    status: FilterType["transactionStatus"][0]
  ) => {
    const currentStatuses = updatedFilters.transactionStatus;
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status];

    setUpdatedFilters({
      ...updatedFilters,
      transactionStatus: newStatuses,
    });
  };

  const isApplyDisabled =
    JSON.stringify(updatedFilters) === JSON.stringify(filters);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-4 bg-btn-bg px-8 py-4 rounded-full text-TK-black font-semibold hover:cursor-pointer">
          <span>Filter</span>
          <CaretDownIcon size={20} weight="bold" />
        </button>
      </SheetTrigger>
      <SheetContent className="!max-w-[30vw]">
        <SheetHeader>
          <SheetTitle>
            <h2 className="text-2xl font-bold">Filter</h2>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between items-center h-full flex-1 py-6 px-4">
          <div className="space-y-4 w-full">
            {/* Quick Date Selection */}
            <div className="flex items-center justify-between gap-2">
              {["today", "last 7 days", "this month", "last 3 months"].map(
                (item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickDateSelect(item)}
                    className="text-sm text-center px-3 py-2 rounded-full text-TK-black font-semibold hover:cursor-pointer border hover:bg-gray-50 flex-1"
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="font-semibold">Date Range</label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="bg-TK-border px-4 h-12 flex justify-between items-center rounded-xl text-TK-black w-full">
                      <span>
                        {updatedFilters.fromDate
                          ? format(updatedFilters.fromDate, "MMM dd, yyyy")
                          : "From Date"}
                      </span>
                      <CaretDownIcon size={20} weight="bold" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0">
                    <Calendar
                      mode="single"
                      defaultMonth={updatedFilters.fromDate}
                      selected={updatedFilters.fromDate}
                      onSelect={(date) =>
                        setUpdatedFilters({ ...updatedFilters, fromDate: date })
                      }
                      className="rounded-lg border shadow-sm"
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="bg-TK-border px-4 h-12 flex justify-between items-center rounded-xl text-TK-black w-full">
                      <span>
                        {updatedFilters.toDate
                          ? format(updatedFilters.toDate, "MMM dd, yyyy")
                          : "To Date"}
                      </span>
                      <CaretDownIcon size={20} weight="bold" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0">
                    <Calendar
                      mode="single"
                      defaultMonth={updatedFilters.toDate}
                      selected={updatedFilters.toDate}
                      onSelect={(date) =>
                        setUpdatedFilters({ ...updatedFilters, toDate: date })
                      }
                      className="rounded-lg border shadow-sm"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Transaction Type */}
            <div className="space-y-2">
              <label className="font-semibold">Transaction Type</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="bg-TK-border px-4 h-12 flex justify-between items-center rounded-xl text-TK-black w-full">
                    <span className="truncate">
                      {updatedFilters.transactionType.length > 0
                        ? updatedFilters.transactionType.join(", ")
                        : "Select transaction types"}
                    </span>
                    <CaretDownIcon size={20} weight="bold" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                    {[
                      "item",
                      "get tipped",
                      "withdrawals",
                      "chargebacks",
                      "cashbacks",
                      "refer & earn",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <Checkbox
                          checked={updatedFilters.transactionType.includes(
                            item
                          )}
                          onCheckedChange={() =>
                            handleTransactionTypeChange(item)
                          }
                        />
                        <span className="text-sm capitalize">{item}</span>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            </div>

            {/* Transaction Status */}
            <div className="space-y-2">
              <label className="font-semibold">Transaction Status</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="bg-TK-border px-4 h-12 flex justify-between items-center rounded-xl text-TK-black w-full">
                    <span>
                      {updatedFilters.transactionStatus.length > 0
                        ? updatedFilters.transactionStatus.join(", ")
                        : "Select status"}
                    </span>
                    <CaretDownIcon size={20} weight="bold" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                    {["successful", "failed", "pending"].map(
                      (status, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <Checkbox
                            checked={updatedFilters.transactionStatus.includes(
                              status
                            )}
                            onCheckedChange={() =>
                              handleTransactionStatusChange(status)
                            }
                          />
                          <span className="text-sm capitalize">{status}</span>
                        </li>
                      )
                    )}
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full">
            <button
              onClick={handleClear}
              className="h-12 flex-1 text-TK-black font-semibold border rounded-full hover:bg-gray-50"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              disabled={isApplyDisabled}
              className="h-12 flex-1 text-white bg-TK-black font-semibold rounded-full disabled:bg-TK-black/50 disabled:cursor-not-allowed hover:bg-TK-black/80"
            >
              Apply
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Filter;
