import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export const columns = [
  {
    id: "company",
    accessor: "company",
    Header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSortBy(!column.isSorted || column.isSortedDesc)
        }
      >
        Company
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <div>{value}</div>,
  },
  {
    id: "job_title",
    accessor: "job_title",
    Header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSortBy(!column.isSorted || column.isSortedDesc)
        }
      >
        Job Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <div>{value}</div>,
  },
  {
    id: "application_date",
    accessor: "application_date",
    Header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSortBy(!column.isSorted || column.isSortedDesc)
        }
      >
        Application Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => {
      const date = new Date(value);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "status",
    accessor: "status",
    Header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSortBy(!column.isSorted || column.isSortedDesc)
        }
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => value.toUpperCase(),
  },
  {
    Header: "View",
    accessor: "id",
    Cell: ({ value }) => (
      <Link to={`/applications/${value}`}>
        <Button className="bg-gray-500">View All Details</Button>
      </Link>
    ),
  },
];

export default columns;
