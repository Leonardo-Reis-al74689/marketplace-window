import type { JobRequest } from "../types";
import JobCard from "./JobCard";

type JobListProps = {
  jobs: JobRequest[];
  hasAnyJobs: boolean;
  city: string;
  onAccept: (id: string) => void;
  onClearFilter: () => void;
};

export default function JobList({
  jobs,
  hasAnyJobs,
  city,
  onAccept,
  onClearFilter,
}: JobListProps) {
  if (jobs.length === 0) {
    if (!hasAnyJobs) {
      return <p>Não há pedidos disponíveis neste momento.</p>;
    }
    return (
      <div>
        <p>Não há pedidos em {city}.</p>
        <button type="button" onClick={onClearFilter}>
          Limpar filtro
        </button>
      </div>
    );
  }

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
