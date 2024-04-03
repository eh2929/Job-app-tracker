import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import ApplicationLineChart from "./ApplicationLineChart";
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDelete = (event, applicationId) => {
    event.stopPropagation(); // Prevent triggering the card's onClick event

    fetch(`http://127.0.0.1:5555/applications/${applicationId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete job application");
        }
        // Remove the deleted application from the state
        setApplications(applications.filter((app) => app.id !== applicationId));
      })
      .catch((error) => console.error(error));
  };

    applications.sort(
      (a, b) => new Date(a.application_date) - new Date(b.application_date)
    );

    let stageCounts = {
      "No Reply": 0,
      Interview: 0,
      Offer: 0,
      Accepted: 0,
      Rejected: 0,
    };

    let data = applications.map((application) => {
      if (application.status === "No Reply") {
        stageCounts["No Reply"]++;
      } else if (application.status === "Interview") {
        stageCounts["Interview"]++;
      } else if (application.status === "Offer") {
        stageCounts["Offer"]++;
      } else if (application.status === "Accepted") {
        stageCounts["Accepted"]++;
      } else if (application.status === "Rejected") {
        stageCounts["Rejected"]++;
      }

      // Return a new data point for this date
      return {
        date: application.application_date,
        ...stageCounts,
      };
    });

  const handleApplicationClick = (application) => {
    setSelectedApplication(application);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setSelectedApplication((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    fetch(`http://127.0.0.1:5555/applications/${selectedApplication.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedApplication),
    })
      .then((response) => response.json())
      .then((data) => {
        setApplications((prevApplications) =>
          prevApplications.map((application) =>
            application.id === data.id ? data : application
          )
        );
        setSelectedApplication(data);
        setDrawerOpen(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5555/applications")
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {}, [selectedApplication]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {" "}
      {applications.map((application) => (
        <Card
          key={application.id}
          onClick={() => handleApplicationClick(application)}
        >
          <CardHeader>
            <CardTitle>{application.job_title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Company: {application.company}</p>
            <p>Application Date: {application.application_date}</p>{" "}
            <p>Status: {application.status}</p>{" "}
          </CardContent>
          <CardFooter>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/applications/${application.id}`);
              }}
            >
              View All Details
            </Button>
            <Button onClick={(e) => handleDelete(e, application.id)}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
      <ApplicationLineChart data={data} />
      <Drawer isOpen={drawerOpen} onClose={handleDrawerClose}>
        <DrawerTrigger asChild>
          <Button variant="outline">Edit Application</Button>
        </DrawerTrigger>
        <DrawerContent className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 overflow-auto max-h-screen">
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit Application</DrawerTitle>
            <DrawerDescription>
              Make changes to your application here. Click save when you're
              done.
            </DrawerDescription>
          </DrawerHeader>
          {selectedApplication && (
            <form className="grid items-start gap-4">
              <div className="grid gap-2">
                <Label htmlFor="job_title">Job Title</Label>
                <Input
                  type="text"
                  id="job_title"
                  name="job_title"
                  value={selectedApplication.job_title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  value={selectedApplication.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="salary_offered">Salary Offered</Label>
                <Input
                  type="number"
                  id="salary_offered"
                  name="salary_offered"
                  value={selectedApplication.salary_offered}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={selectedApplication.status}
                  onChange={handleInputChange}
                >
                  <option value="Applied">Applied</option>
                  <option value="Prepping to apply">Prepping to apply</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              {/* Add more fields as needed */}
              <div className="grid gap-2">
                <Label htmlFor="application_date">Application Date</Label>
                <Input
                  type="date"
                  id="application_date"
                  name="application_date"
                  value={selectedApplication.application_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="first_interview_date">
                  First Interview Date
                </Label>
                <Input
                  type="date"
                  id="first_interview_date"
                  name="first_interview_date"
                  value={selectedApplication.first_interview_date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="follow_up_date">Follow Up Date</Label>
                <Input
                  type="date"
                  id="follow_up_date"
                  name="follow_up_date"
                  value={selectedApplication.follow_up_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rejection_date">Rejection Date</Label>
                <Input
                  type="date"
                  id="rejection_date"
                  name="rejection_date"
                  value={selectedApplication.rejection_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cover_letter_provided">
                  Cover Letter Provided
                </Label>
                <input
                  type="checkbox"
                  id="cover_letter_provided"
                  name="cover_letter_provided"
                  checked={selectedApplication.cover_letter_provided}
                  onChange={(event) =>
                    handleInputChange({
                      target: {
                        name: event.target.name,
                        value: event.target.checked,
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="job_description">Job Description</Label>
                <textarea
                  id="job_description"
                  name="job_description"
                  value={selectedApplication.job_description}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" onClick={handleSave}>
                Save changes
              </Button>
            </form>
          )}
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleDrawerClose}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Dashboard;
