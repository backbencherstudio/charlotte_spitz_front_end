"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Eye,
  MoreVertical,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface ColumnConfig {
  label: React.ReactNode;
  accessor: string;
  formatter?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface DynamicTableProps {
  columns: ColumnConfig[];
  data: Record<string, unknown>[];
  currentPage: number;
  itemsPerPage: number;
  totalPages?: number;
  totalRecords?: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (items: number) => void;
  onView?: (row: Record<string, unknown>) => void;
  onMore?: (row: Record<string, unknown>) => void;
  noDataMessage?: string;
  searchPlaceholder?: string;
  filterOptions?: { label: string; value: string }[];
  onFilterChange?: (value: string) => void;
  selectedFilter?: string;
  onSearchChange?: (value: string) => void;
  isLoading?: boolean;
}

export default function ActivityLogsTable({
  columns,
  data,
  currentPage,
  itemsPerPage,
  totalPages = 1,
  totalRecords = 0,
  onPageChange,
  onItemsPerPageChange,
  onView,
  onMore,
  noDataMessage = "No data found.",
  searchPlaceholder = "search users...",
  filterOptions,
  onFilterChange,
  selectedFilter = "All",
  onSearchChange,
  isLoading = false,
}: DynamicTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showItemsPerPageDropdown, setShowItemsPerPageDropdown] =
    useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const itemsPerPageRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const itemsPerPageOptions = [10, 20, 50, 100];

  // const firstName = data?.user?.userProfile?.firstName ?? "";
  // const lastName = data?.user?.userProfile?.lastName ?? "";

  // Calculate pagination display values
  const startRecord =
    totalRecords > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endRecord = Math.min(currentPage * itemsPerPage, totalRecords);

  // Generate pagination page numbers
  const getPagination = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near the start
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Handle search with debounce
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      onSearchChange?.(value);
    }, 500);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        itemsPerPageRef.current &&
        !itemsPerPageRef.current.contains(event.target as Node)
      ) {
        setShowItemsPerPageDropdown(false);
      }
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const statusColors = {
    APPROVED: "bg-[#D7FFE7] text-[#00C853]",
    PENDING: "bg-[#FFFEDD] text-[#CF9800]",
    REJECTED: "bg-[#A29EFF] text-[#1E00FF]",
  };

  return (
    <div>
      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <h2 className="text-base sm:text-lg font-semibold text-[#4a4c56]">
            Submissions List
          </h2>
          {filterOptions && onFilterChange && (
            <div className="relative" ref={filterDropdownRef}>
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 border rounded-lg text-xs sm:text-sm text-[#4a4c56] hover:bg-gray-50"
              >
                {selectedFilter}
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              {showFilterDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 min-w-[120px]">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onFilterChange(option.value);
                        setShowFilterDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t last:rounded-b"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                handleSearchChange(e.target.value);
              }}
              className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-none w-full bg-gray-100 sm:w-auto"
            />
          </div>
          {/* <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border rounded-l text-xs sm:text-sm text-[#4a4c56] hover:bg-gray-50 whitespace-nowrap">
            <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button> */}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-[600px] sm:min-w-[800px] lg:min-w-[1000px] w-full text-left">
          <thead className="bg-neutral-50">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-[#4a4c56]"
                >
                  {col.label}
                </th>
              ))}
              {/* {(onView || onMore) && (
                <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-[#4a4c56]">
                  Action
                </th>
              )} */}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length + (onView || onMore ? 1 : 0)}
                  className="px-4 py-10 text-center text-descriptionColor text-xs sm:text-sm"
                >
                  Loading...
                </td>
              </tr>
            ) : data?.length > 0 ? (
              data?.map((row: Record<string, unknown>, i: number) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-semibold text-sm text-[#070707]">
                    {String(row?.action ?? "")}
                  </td>
                  <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-semibold text-sm text-[#070707]">
                    {String(row?.actionType ?? "")}
                  </td>
                  <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 font-semibold text-sm text-[#070707]">
                    {String(row?.description ?? "-")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (onView || onMore ? 1 : 0)}
                  className="px-4 py-10 text-center text-descriptionColor text-xs sm:text-sm"
                >
                  {noDataMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs sm:text-sm text-descriptionColor">
            Showing
          </span>
          {onItemsPerPageChange && (
            <div className="relative" ref={itemsPerPageRef}>
              <button
                onClick={() =>
                  setShowItemsPerPageDropdown(!showItemsPerPageDropdown)
                }
                className="flex items-center gap-1 px-2 py-1 border rounded text-xs sm:text-sm text-[#4a4c56] hover:bg-gray-50"
              >
                {itemsPerPage}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showItemsPerPageDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 min-w-[60px]">
                  {itemsPerPageOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        onItemsPerPageChange?.(option);
                        setShowItemsPerPageDropdown(false);
                        onPageChange(1);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t last:rounded-b"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="text-xs sm:text-sm text-descriptionColor">
          <span className="hidden sm:inline">
            Showing {startRecord} to {endRecord} out of {totalRecords} records
          </span>
          <span className="sm:hidden">
            {startRecord}-{endRecord} of {totalRecords}
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 justify-center sm:justify-start">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 sm:p-1.5 border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <div className="flex items-center gap-1 sm:gap-2">
            {getPagination().map((page, i) => (
              <button
                key={i}
                onClick={() => typeof page === "number" && onPageChange(page)}
                disabled={page === "..."}
                className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm cursor-pointer ${
                  page === currentPage
                    ? "bg-[#0068ef] text-white font-medium"
                    : "text-descriptionColor hover:bg-gray-100"
                } ${page === "..." ? "cursor-default" : ""}`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1 sm:p-1.5 border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
