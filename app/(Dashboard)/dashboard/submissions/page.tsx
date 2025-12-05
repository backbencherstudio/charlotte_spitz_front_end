"use client";

import DynamicTableWithPagination from "@/common/DynamicTable";
import React, { useState, useMemo } from "react";

interface Submission {
  id: string;
  userId: string;
  customerName: string;
  submissionDate: string;
  template: string;
  status: "Approve" | "Pending" | "Revision";
}

export default function SubmissionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Generate 60 sample submissions matching the image
  const generateSampleData = (): Submission[] => {
    const templates = [
      "Modern Pro",
      "Classic",
      "Creative",
      "Executive",
      "Minimalist",
    ];
    const statuses: ("Approve" | "Pending" | "Revision")[] = [
      "Approve",
      "Pending",
      "Revision",
    ];
    const customers = [
      "Arlene",
      "John",
      "Sarah",
      "Michael",
      "Emily",
      "David",
      "Lisa",
      "Robert",
    ];

    const data: Submission[] = [];
    const baseDate = new Date("2025-06-20");

    for (let i = 0; i < 60; i++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() - Math.floor(i / 3));

      data.push({
        id: `${i + 1}`,
        userId: "456789",
        customerName: customers[i % customers.length],
        submissionDate: date.toISOString(),
        template: templates[i % templates.length],
        status: statuses[i % statuses.length],
      });
    }

    return data;
  };

  const [data] = useState<Submission[]>(generateSampleData());

  // Filter data based on selected filter
  const filteredData = useMemo(() => {
    if (selectedFilter === "All") return data;
    return data.filter((item) => item.status === selectedFilter);
  }, [data, selectedFilter]);

  const columns = [
    {
      label: "User ID",
      accessor: "userId",
    },
    {
      label: "Customer Name",
      accessor: "customerName",
    },
    {
      label: "Submission Date",
      accessor: "submissionDate",
      formatter: (value: unknown) => {
        const date = new Date(value as string);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    },
    {
      label: "Template",
      accessor: "template",
    },
    {
      label: "Status",
      accessor: "status",
      formatter: (value: unknown) => {
        const statusColors = {
          Approve: "bg-green-100 text-green-800",
          Pending: "bg-yellow-100 text-yellow-800",
          Revision: "bg-purple-100 text-purple-800",
        };
        const statusValue = value as string;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              statusColors[statusValue as keyof typeof statusColors] ||
              "bg-gray-100 text-gray-800"
            }`}
          >
            {statusValue}
          </span>
        );
      },
    },
  ];

  const filterOptions = [
    { label: "All", value: "All" },
    { label: "Approve", value: "Approve" },
    { label: "Pending", value: "Pending" },
    { label: "Revision", value: "Revision" },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleView = (row: Record<string, unknown>) => {
    const submission = row as unknown as Submission;
    console.log("View submission:", submission);
    // You can implement a modal or navigation here
    alert(
      `Viewing submission:\nUser ID: ${submission.userId}\nCustomer: ${submission.customerName}\nTemplate: ${submission.template}\nStatus: ${submission.status}`
    );
  };

  const handleMore = (row: Record<string, unknown>) => {
    const submission = row as unknown as Submission;
    console.log("More options for submission:", submission);
    // You can implement a dropdown menu here
  };

  return (
    <div className="p-6">
      <div className="mb-8 space-y-1.5">
        <h1 className="text-3xl font-bold">Submissions List</h1>
        <h2 className="text-[#A1A1A1]">
          Manage and review all resume submissions.
        </h2>
      </div>
      <DynamicTableWithPagination
        columns={columns}
        data={filteredData as unknown as Record<string, unknown>[]}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        onView={handleView}
        onMore={handleMore}
        noDataMessage="No submissions found."
        searchPlaceholder="search users..."
        filterOptions={filterOptions}
        onFilterChange={setSelectedFilter}
        selectedFilter={selectedFilter}
      />
    </div>
  );
}
