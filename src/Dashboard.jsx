import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
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
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // adjust the path as necessary

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleApplicationClick = (application) => {
    setSelectedApplication(application);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleInputChange = (event) => {
    setSelectedApplication({
      ...selectedApplication,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5555/applications")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data to the console
        setApplications(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {" "}
      {/* Adjust grid as necessary */}
      {applications.map((application) => (
        <Card
          key={application.id}
          onClick={() => handleApplicationClick(application)}
        >
          <CardHeader>
            <CardTitle>{application.job_title}</CardTitle>
            <CardDescription>{application.company_name}</CardDescription>{" "}
            {/* Display the company name */}
          </CardHeader>
          <CardContent>
            <p>Application Date: {application.application_date}</p>{" "}
            {/* Display the application date */}
            {/* Render more application data as necessary */}
          </CardContent>
          <CardFooter>
            {/* Render more application data as necessary */}
          </CardFooter>
        </Card>
      ))}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">Edit Application</Button>
        </DrawerTrigger>
        <DrawerContent>
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
                <Label htmlFor="company_id">Company ID</Label>
                <Input
                  type="text"
                  id="company_id"
                  name="company_id"
                  value={selectedApplication.company_id}
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
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Dashboard;
