"use client";

import ActivityLogsTable from "@/components/dashboard/ActivityLogs/ActivityLogsTable";
import { useGetAllActivityLogsQuery } from "@/src/redux/features/activity-logs";
import { useState } from "react";

interface Submission {
  id: string;
  userId: string;
  customerName: string;
  submissionDate: string;
  template: string;
  status: "Approve" | "Pending" | "Revision";
}

export default function ActivityLogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: activityLogsData, isLoading } = useGetAllActivityLogsQuery({});

  const columns = [
    {
      label: "Action",
      accessor: "action",
    },
    {
      label: "Action Type",
      accessor: "actionType",
    },
    {
      label: "Description",
      accessor: "description",
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
        <h1 className="text-3xl font-bold">Activity Logs</h1>
        <h2 className="text-[#A1A1A1]">
          View system and admin activity history
        </h2>
      </div>
      <ActivityLogsTable
        columns={columns}
        data={activityLogsData?.data as unknown as Record<string, unknown>[]}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalPages={activityLogsData?.totalPages || 1}
        totalRecords={activityLogsData?.total || 0}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        onView={handleView}
        onMore={handleMore}
        noDataMessage="No activityLogs found."
        searchPlaceholder="search users..."
        filterOptions={filterOptions}
        onFilterChange={(value) => {
          setSelectedFilter(value);
          setCurrentPage(1);
        }}
        selectedFilter={selectedFilter}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setCurrentPage(1);
        }}
        isLoading={isLoading}
      />
    </div>
  );
}
