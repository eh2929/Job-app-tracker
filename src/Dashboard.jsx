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
    <div>
      <DataTable columns={columns} data={applications} />
    </div>
  );
}

export default Page;

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";

// function Dashboard({ applications, setApplications, setFilters, filters }) {
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const handleDelete = (event, applicationId) => {
//     event.stopPropagation(); // Prevent triggering the card's onClick event

//     fetch(`http://127.0.0.1:5555/applications/${applicationId}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to delete job application");
//         }
//         // Remove the deleted application from the state
//         setApplications(applications.filter((app) => app.id !== applicationId));
//       })
//       .catch((error) => console.error(error));
//   };

//   const handleApplicationClick = (application) => {
//     setSelectedApplication(application);
//     setDrawerOpen(true);
//     console.log(drawerOpen); // Add this line
//   };

//   const handleInputChange = (event) => {
//     const value =
//       event.target.type === "checkbox"
//         ? event.target.checked
//         : event.target.value;
//     setSelectedApplication((prevState) => ({
//       ...prevState,
//       [event.target.name]: value,
//     }));
//   };

//   const handleSave = (event) => {
//     event.preventDefault();

//     fetch(`http://127.0.0.1:5555/applications/${selectedApplication.id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(selectedApplication),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setApplications((prevApplications) =>
//           prevApplications.map((application) =>
//             application.id === data.id ? data : application
//           )
//         );
//         setSelectedApplication(data);
//         setDrawerOpen(false);
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   const navigate = useNavigate();

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto max-h-screen">
//         {applications.map((application) => (
//           <Card
//             key={application.id}
//             onClick={() => {
//               handleApplicationClick(application);
//             }}
//           >
//             <CardHeader>
//               <CardTitle>{application.job_title}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>Company: {application.company}</p>
//               <p>Application Date: {application.application_date}</p>{" "}
//               <p>Status: {application.status}</p>{" "}
//             </CardContent>
//             <CardFooter>
//               <Button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleApplicationClick(application);
//                 }}
//               >
//                 Edit Application
//               </Button>
//               <Button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   navigate(`/applications/${application.id}`);
//                 }}
//               >
//                 View All Details
//               </Button>
//               <Button onClick={(e) => handleDelete(e, application.id)}>
//                 Delete
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       {/* <FilterPanel filters={filters} onFilterChange={handleFilterChange} /> */}
//     </div>
//   );
// }

// export default Dashboard;
