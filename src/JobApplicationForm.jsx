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
import { Controller } from "react-hook-form";

const options = [
  { value: "applied", label: "Applied" },
  { value: "prepping to apply", label: "Prepping to Apply" },
  { value: "rejected", label: "Rejected" },
  { value: "interviewing", label: "Interviewing" },
];

const formSchema = z.object({
  user_id: z.number().optional(),
  job_title: z.string(),
  application_date: z.string().optional(),
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
  cover_letter_provided: z.boolean().optional(),
  job_source: z.string().optional(),
  num_interviews: z.number().optional(),
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
    { value: "preparing", label: "Prepping Application" },
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
              <FormDescription>Enter the job title.</FormDescription>
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
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <select {...field}>
                      <option value="">Select...</option>
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
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
          name="salary_offered"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary Offered</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Salary Offered"
                  value={field.value}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Enter the salary offered.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="application_deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Deadline</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Application Deadline"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter the application deadline.</FormDescription>
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
        <FormField
          control={form.control}
          name="job_source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Source</FormLabel>
              <FormControl>
                <Input placeholder="Job Source" {...field} />
              </FormControl>
              <FormDescription>Enter the source of the job.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="num_interviews"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Interviews</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Number of Interviews"
                  value={field.value}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Enter the number of interviews.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cover_letter_provided"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter Provided</FormLabel>
              <FormControl>
                <Input type="checkbox" {...field} />
              </FormControl>
              <FormDescription>
                Check if a cover letter was provided.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ghosting"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ghosting</FormLabel>
              <FormControl>
                <Input type="checkbox" {...field} />
              </FormControl>
              <FormDescription>Check if ghosted.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="current_stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Stage</FormLabel>
              <FormControl>
                <Input placeholder="Current Stage" {...field} />
              </FormControl>
              <FormDescription>Enter the current stage.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_interview_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Interview Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="First Interview Date"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter the first interview date.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="second_interview_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Second Interview Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Second Interview Date"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the second interview date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="follow_up_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Follow Up Date</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Follow Up Date" {...field} />
              </FormControl>
              <FormDescription>Enter the follow up date.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rejection_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rejection Date</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Rejection Date" {...field} />
              </FormControl>
              <FormDescription>Enter the rejection date.</FormDescription>
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
