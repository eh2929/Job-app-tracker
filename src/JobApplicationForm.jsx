import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ComboBoxResponsive } from "./ComboBoxResponsive";

const formSchema = z.object({
  user_id: z.number().optional(),
  job_title: z.string(), // required
  application_date: z.string().optional(), // required
  company: z.string().optional(),
  status: z.string().optional(),
  job_description: z.string().optional(),
  application_deadline: z.string().optional(),
  salary_offered: z.number().optional(),
  first_interview_date: z.string().optional(),
  second_interview_date: z.string().optional(),
  follow_up_date: z.string().optional(),
  rejection_date: z.string().optional(),
  ghosting: z.boolean().optional(),
  current_stage: z.string().optional(),
});

export function JobApplicationForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form data", data); // Log the form data to the console

    const response = await fetch("http://127.0.0.1:5555/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        user_id: "1",
      }),
    });

    if (!response.ok) {
      // Handle error
      console.error("Failed to save job application");
    } else {
      // Handle success
      console.log("Job application saved successfully");
    }
  };

  const options = [
    { value: "applied", label: "Applied" },
    { value: "interviewed", label: "Interviewed" },
    { value: "offered", label: "Offered" },
    { value: "rejected", label: "Rejected" },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="job_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Job Title" {...field} />
              </FormControl>
              <FormDescription>
                Enter the title of the job you're applying for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company" // Make sure this matches the name of the field in the form data
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Company" {...field} />
              </FormControl>
              <FormDescription>Enter the name of the company.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="application_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Date</FormLabel>
              <FormControl>
                <Input placeholder="Application Date" {...field} />
              </FormControl>
              <FormDescription>
                Enter the date of the application.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <ComboBoxResponsive field={field} options={options} />
              </FormControl>
              <FormDescription>
                Select the status of the application.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="job_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Input placeholder="Job Description" {...field} />
              </FormControl>
              <FormDescription>Enter the job description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default JobApplicationForm;
