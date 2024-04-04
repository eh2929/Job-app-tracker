import React from "react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";

function FilterPanel({ filters, onFilterChange }) {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <div>
      <h2>Filters</h2>
      <div className="grid gap-2">
        <Label htmlFor="company">Company</Label>
        <Input
          type="text"
          id="company"
          name="company"
          value={filters.company}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="job_title">Job Title</Label>
        <Input
          type="text"
          id="job_title"
          name="job_title"
          value={filters.job_title}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Label>Status</Label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          <option value="applied">Applied</option>
          <option value="interviewed">Interviewed</option>
          <option value="rejected">Rejected</option>
          <option value="ghosted">Ghosted</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="salary_offered">Salary</Label>
        <Input
          type="number"
          id="salary_offered"
          name="salary_offered"
          value={filters.salary_offered}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cover_letter_provided">Cover Letter Provided</Label>
        <select
          id="cover_letter_provided"
          name="cover_letter_provided"
          value={filters.cover_letter_provided}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="job_source">Job Source</Label>
        <select
          id="job_source"
          name="job_source"
          value={filters.job_source}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          <option value="jobBoard">Job Board</option>
          <option value="companyWebsite">Company Website</option>
          <option value="referral">Referral</option>
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;
