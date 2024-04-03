import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

function ViewJobApplication() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    console.log(`Fetching application with ID ${id}`);
    fetch(`http://127.0.0.1:5555/applications/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setApplication(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        console.log("Fetch operation completed");
      });
  }, [id]);

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{application.job_title}</CardTitle>
        <CardDescription>
          {application.company ? application.company.name : "N/A"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Company: {application.company}</p>
        <p>Application Date: {application.application_date}</p>

        <p>Status: {application.status}</p>
        <p>First Interview Date: {application.first_interview_date || "N/A"}</p>
        <p>Follow Up Date: {application.follow_up_date || "N/A"}</p>
        <p>Rejection Date: {application.rejection_date || "N/A"}</p>
        <p>Salary Offered: {application.salary_offered || "N/A"}</p>
        <p>Job Description: {application.job_description || "N/A"}</p>
        {/* Display other application details */}
      </CardContent>
    </Card>
  );
}

export default ViewJobApplication;
