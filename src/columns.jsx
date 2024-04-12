import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export const columns = [
  {
    id: "application_date",
    accessor: (d) => new Date(d.application_date),
    Header: ({ column }) => (
      <Button variant="ghost" {...column.getSortByToggleProps()}>
        Application Date
        {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
      </Button>
    ),
    Cell: ({ value }) => {
      const date = new Date(value);
      return <div className="p-2">{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "company",
    accessor: "company",
    Header: ({ column }) => (
      <Button variant="ghost" {...column.getSortByToggleProps()}>
        Company
        {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
      </Button>
    ),
    Cell: ({ value }) => <div className="p-2">{value}</div>,
  },
  {
    id: "job_title",
    accessor: "job_title",
    Header: ({ column }) => (
      <Button variant="ghost" {...column.getSortByToggleProps()}>
        Job Title
        {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
      </Button>
    ),
    Cell: ({ value }) => <div className="p-2">{value}</div>,
  },
  {
    id: "status",
    accessor: "status",
    Header: ({ column }) => (
      <Button variant="ghost" {...column.getSortByToggleProps()}>
        Status
        {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
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
