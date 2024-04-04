import React, { useEffect } from "react";
import Chart from "chart.js/auto";

function ApplicationStatusChart({ applications, filters }) {
  useEffect(() => {
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart("statusChart");
    if (existingChart) {
      existingChart.destroy();
    }

    // Create new chart
    const ctx = document.getElementById("statusChart").getContext("2d");
    const statusCounts = countStatus(applications);
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(statusCounts),
        datasets: [
          {
            label: "Application Status",
            data: Object.values(statusCounts),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      // Cleanup function to destroy the chart when component unmounts
      chart.destroy();
    };
  }, [applications, filters]);

  // Function to count the number of applications in each status
  const countStatus = (applications, filters) => {
    // If applications is empty, return an empty object
    if (!applications || applications.length === 0 || !filters) {
      return {};
    }

    // Log applications array to console
    console.log(applications);

    // Filter applications based on filters
    const filteredApplications = applications.filter((application) => {
      if (!application) {
        return false;
      }

      // Filter by job title
      if (
        filters.job_title &&
        (!application.job_title || application.job_title !== filters.job_title)
      ) {
        return false;
      }

      // Filter by status
      if (
        filters.status &&
        (!application.status || application.status !== filters.status)
      ) {
        return false;
      }

      // Filter by salary
      if (
        filters.salary_offered &&
        (!application.salary_offered ||
          application.salary_offered < filters.salary_offered)
      ) {
        return false;
      }

      // Filter by cover letter provided
      if (
        filters.cover_letter_provided &&
        (!application.cover_letter_provided ||
          application.cover_letter_provided !== filters.cover_letter_provided)
      ) {
        return false;
      }

      // Filter by job source
      if (
        filters.job_source &&
        (!application.job_source ||
          application.job_source !== filters.job_source)
      ) {
        return false;
      }

      // If none of the filters rejected the application, it matches the filters
      return true;
    });

    const statusCounts = {};
    filteredApplications.forEach((app) => {
      const status = app.status;
      if (statusCounts[status]) {
        statusCounts[status]++;
      } else {
        statusCounts[status] = 1;
      }
    });
    return statusCounts;
  };

  return <canvas id="statusChart" width="400" height="400"></canvas>;
}

export default ApplicationStatusChart;
