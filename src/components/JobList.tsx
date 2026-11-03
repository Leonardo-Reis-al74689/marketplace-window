import type { JobRequest } from "../types";
import JobCard from "./JobCard";

type JobListProps = {
  jobs: JobRequest[];
  onAccept: (id: string) => void;
};

export default function JobList({ jobs, onAccept }: JobListProps) {
  return (
    <ul className="job-list">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} onAccept={onAccept} />
        </li>
      ))}
    </ul>
  );
}
