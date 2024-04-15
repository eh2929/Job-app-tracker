import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const formatDate = (dateString) => {
  let date;
  // If dateString is a string, convert it to a Date object
  if (typeof dateString === "string") {
    date = new Date(dateString);
  }

  // If date is not a valid date, return an empty string
  if (isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed in JavaScript
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // returns date in "yyyy-MM-dd" format
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ViewJobApplication() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Create a state variable for each field in the form
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [currentStatus = "", setCurrentStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [rejectionDate, setRejectionDate] = useState("");
  const [coverLetterProvided, setCoverLetterProvided] = useState("");

  const [jobSource, setJobSource] = useState("");
  const [numInterviews, setNumInterviews] = useState("");
  const [loading, setLoading] = useState(true);

  const options = [
    { value: "applied", label: "Applied" },
    { value: "interviewed", label: "Interviewed" },
    { value: "offered", label: "Offered" },
    { value: "rejected", label: "Rejected" },
    { value: "preparing", label: "Prepping Application" },
  ];

  const resetForm = () => {
    setCompanyName("");
    setJobTitle("");
    setApplicationDate("");
    setCurrentStage("");
    setNotes("");
    setFollowUpDate("");
    setRejectionDate("");
    setCoverLetterProvided("");
    setJobSource("");
    setNumInterviews("");
  };

  const handleDelete = () => {
    fetch(`http://127.0.0.1:5555/applications/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data after delete:", data);
        setSuccessMessage("Application deleted successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/applications/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setApplication(data);

        // Set state here
        if (data) {
          setCompanyName(data.company || "");
          setJobTitle(data.job_title || "");
          // Format the date string to exclude the time component
          setApplicationDate(
            data.application_date ? formatDate(data.application_date) : ""
          );
          setCurrentStatus(data.status || "");
          setNotes(data.notes || "");
          setFollowUpDate(data.follow_up_date || "");
          setRejectionDate(data.rejection_date || "");
          setCoverLetterProvided(data.cover_letter_provided || "");
          setJobSource(data.job_source || "");
          setNumInterviews(data.num_interviews || "");
        }
        // Update loading state
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        console.log("Fetch operation completed");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      company: companyName,
      job_title: jobTitle,
      application_date: formatDate(applicationDate),
      status: currentStatus,
      notes,
      follow_up_date: formatDate(followUpDate),
      rejection_date: formatDate(rejectionDate),
      cover_letter_provided: coverLetterProvided ? true : false,
      job_source: jobSource,
      num_interviews: numInterviews,
    };

    console.log("data before update", application); // log the data before updating

    fetch(`http://127.0.0.1:5555/applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data after update:", data); // Log the data after update

        setApplication(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Card>
      {successMessage && <div>{successMessage}</div>}
      <CardHeader>
        <CardTitle>{application && application.job_title}</CardTitle>
        <CardDescription>
          {application.company ? application.company.name : "N/A"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Company: {application && application.company}</p>
        <p>Job Title: {application && application.job_title}</p>
        <p>Application Date: {application && application.application_date}</p>
        <p>
          Status: {application && capitalizeFirstLetter(application.status)}
        </p>
        <p>
          Job Description:{" "}
          {(application && application.job_description) || "N/A"}
        </p>
        <p>
          Application Deadline:{" "}
          {(application && application.application_deadline) || "N/A"}
        </p>
        <p>
          Salary Offered: {(application && application.salary_offered) || "N/A"}
        </p>
        <p>
          First Interview Date:{" "}
          {(application && application.first_interview_date) || "N/A"}
        </p>
        <p>
          Second Interview Date:{" "}
          {(application && application.second_interview_date) || "N/A"}
        </p>
        <p>
          Follow Up Date: {(application && application.follow_up_date) || "N/A"}
        </p>
        <p>
          Rejection Date: {(application && application.rejection_date) || "N/A"}
        </p>

        <p>
          Cover Letter Provided:{" "}
          {application && application.cover_letter_provided ? "Yes" : "No"}
        </p>
        <p>Job Source: {(application && application.job_source) || "N/A"}</p>
        <p>
          Number of Interviews:{" "}
          {(application && application.num_interviews) || "N/A"}
        </p>
      </CardContent>
      <CardFooter></CardFooter>

      <Drawer>
        <DrawerTrigger className="flex flex-col space-y-4 mt-1 p-2 border-gray-300-rounded">
          Edit Application
        </DrawerTrigger>
        <Button onClick={handleDelete} className="bg-red-500 text-white">
          Delete Application
        </Button>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Application</DrawerTitle>
            <DrawerDescription>Update your job application.</DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="flex flex-col">
              Company Name:
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 p-2 border border-gray-500 rounded bg-gray-500"
              />
            </label>
            <label className="flex flex-col">
              Job Title:
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="mt-1 p-2 border border-gray-500 rounded bg-gray-500"
              />
            </label>
            <label className="flex flex-col">
              Application Date:
              <input
                type="date"
                value={formatDate(applicationDate)}
                onChange={(e) => setApplicationDate(new Date(e.target.value))}
                className="mt-1 p-2 border border-gray-500 rounded bg-gray-500"
              />
            </label>
            <label className="flex flex-col">
              Status:
              <select
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                className="mt-1 p-2 border border-gray-500 rounded bg-gray-500"
              >
                {options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="uppercase"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col">
              Follow Up Date:
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="mt-1 p-2 border border-gray-500 rounded bg-gray-500"
              />
            </label>
            <label className="flex flex-col">
              Rejection Date:
              <input
                type="date"
                value={rejectionDate}
                onChange={(e) => setRejectionDate(e.target.value)}
                className="mt-1 p-2 border border-gray-500 rounded bg-gray-500"
              />
            </label>
            <label className="flex flex-col">
              Cover Letter Provided:
              <input
                type="checkbox"
                checked={coverLetterProvided}
                onChange={(e) => setCoverLetterProvided(e.target.checked)}
                className="mt-1 p-2 border border-gray-500 rounded bg-gray-500"
              />
            </label>
            <label className="flex flex-col">
              Job Source:
              <input
                type="text"
                value={jobSource}
                onChange={(e) => setJobSource(e.target.value)}
                className="mt-1 p-2 border border-gray-500 rounded bg-gray-500"
              />
            </label>
            <label className="flex flex-col">
              Number of Interviews:
              <input
                type="number"
                value={numInterviews}
                onChange={(e) => setNumInterviews(e.target.value)}
                className="mt-1 p-2 border border-gray-500 rounded bg-gray-500"
              />
            </label>
            <Button className="bg-gray-400" type="submit">
              Submit
            </Button>
          </form>

          <DrawerFooter>
            <DrawerClose
              varient="outline"
              className="flex flex-col border border-gray-300 rounded p-2"
            >
              Close
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Card>
  );
}

export default ViewJobApplication;
