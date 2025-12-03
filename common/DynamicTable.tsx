"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Filter,
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
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (items: number) => void;
  onView?: (row: Record<string, unknown>) => void;
  onMore?: (row: Record<string, unknown>) => void;
  noDataMessage?: string;
  searchPlaceholder?: string;
  filterOptions?: { label: string; value: string }[];
  onFilterChange?: (value: string) => void;
  selectedFilter?: string;
}

export default function DynamicTableWithPagination({
  columns,
  data,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  onView,
  onMore,
  noDataMessage = "No data found.",
  searchPlaceholder = "search users...",
  filterOptions,
  onFilterChange,
  selectedFilter = "All",
}: DynamicTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showItemsPerPageDropdown, setShowItemsPerPageDropdown] =
    useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const itemsPerPageRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

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
    };
  }, []);

  // Filter data based on search query
  const filteredData = data.filter((row) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return columns.some((col) => {
      const value = row[col.accessor];
      return value?.toString().toLowerCase().includes(query);
    });
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const startRecord =
    filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endRecord = Math.min(currentPage * itemsPerPage, filteredData.length);
  const totalRecords = filteredData.length;

  const getPagination = () => {
    let pages: (number | string)[] = [];
    if (totalPages <= 4) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 2) {
        pages = [1, 2, 3, 4];
      } else if (currentPage >= totalPages - 1) {
        pages = [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ];
      }
    }
    return pages;
  };

  const itemsPerPageOptions = [10, 20, 30, 50];

  return (
    <div>
      {/* Table Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-[#4a4c56]">
            Submissions List
          </h2>
          {filterOptions && onFilterChange && (
            <div className="relative" ref={filterDropdownRef}>
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-1 px-3 py-1.5 border rounded text-sm text-[#4a4c56] hover:bg-gray-50"
              >
                {selectedFilter}
                <ChevronDown className="w-4 h-4" />
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
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onPageChange(1); // Reset to first page on search
              }}
              className="pl-10 pr-4 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded text-sm text-[#4a4c56] hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto xl:overflow-x-hidden border rounded-lg">
        <table className="min-w-[1000px] w-full text-left">
          <thead className="bg-neutral-50">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-sm font-medium text-[#4a4c56]"
                >
                  {col.label}
                </th>
              ))}
              {(onView || onMore) && (
                <th className="px-4 py-3 text-sm font-medium text-[#4a4c56]">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  {columns.map((col, idx) => (
                    <td key={idx} className="px-4 py-3 text-xs text-[#777980]">
                      {col.formatter
                        ? col.formatter(row[col.accessor], row)
                        : String(row[col.accessor] ?? "")}
                    </td>
                  ))}
                  {(onView || onMore) && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {onView && (
                          <Link
                            href={`/dashboard/submissions/${row.id}`}
                            className="w-4 h-4 text-[#777980] hover:text-[#0068ef] cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        {onMore && (
                          <MoreVertical
                            className="w-4 h-4 text-[#777980] hover:text-[#0068ef] cursor-pointer"
                            onClick={() => onMore(row)}
                          />
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (onView || onMore ? 1 : 0)}
                  className="px-4 py-10 text-center text-[#777980] text-sm"
                >
                  {noDataMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#777980]">Showing</span>
          {onItemsPerPageChange && (
            <div className="relative" ref={itemsPerPageRef}>
              <button
                onClick={() =>
                  setShowItemsPerPageDropdown(!showItemsPerPageDropdown)
                }
                className="flex items-center gap-1 px-2 py-1 border rounded text-sm text-[#4a4c56] hover:bg-gray-50"
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
                        onItemsPerPageChange(option);
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
        <div className="text-sm text-[#777980]">
          Showing {startRecord} to {endRecord} out of {totalRecords} records
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {getPagination().map((page, i) => (
            <button
              key={i}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`px-3 py-1 rounded text-sm ${
                page === currentPage
                  ? "bg-blue-600 text-white font-medium"
                  : "text-[#777980] hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1.5 border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
