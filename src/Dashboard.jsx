import React, { useState, useEffect } from "react";
import DataTable from "./data-table";
import { columns } from "./columns";

function Page() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/applications")
      .then((response) => response.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="flex justify-right">
      <DataTable columns={columns} data={applications} />
    </div>
  );
}

export default Page;


