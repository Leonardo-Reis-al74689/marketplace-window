import type { JobRequest } from "../types";
import { formatDateTime, formatDuration, formatPrice } from "../utils/format";

type JobCardProps = {
  job: JobRequest;
  onAccept: (id: string) => void;
};

export default function JobCard({ job, onAccept }: JobCardProps) {
  const titleId = `job-${job.id}-title`;

  return (
    <article aria-labelledby={titleId} className="job-card">
      <header>
        <h2 id={titleId}>{job.service}</h2>
        {job.urgent && <strong className="badge-urgent">Urgente</strong>}
      </header>

      <dl>
        <div>
          <dt>Cidade</dt>
          <dd>{job.city}</dd>
        </div>
        <div>
          <dt>Data</dt>
          <dd>
            <time dateTime={job.startsAt}>{formatDateTime(job.startsAt)}</time>
          </dd>
        </div>
        <div>
          <dt>Duração</dt>
          <dd>{formatDuration(job.durationMin)}</dd>
        </div>
        <div>
          <dt>Valor</dt>
          <dd>{formatPrice(job.priceCents)}</dd>
        </div>
      </dl>
      <button
        type="button"
        aria-label={`Aceitar pedido de ${job.service} em ${job.city}`}
        onClick={() => onAccept(job.id)}
      >
        Aceitar
      </button>
    </article>
  );
}
