import type { JobRequest } from "../types";
import JobCard from "./JobCard";

type JobListProps = {
  jobs: JobRequest[];
};

export default function JobList({ jobs }: JobListProps) {
  return (
    <ul className="job-list">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}
