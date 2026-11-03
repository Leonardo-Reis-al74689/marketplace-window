import { useState, useEffect } from "react";
import type { JobRequest } from "../types.ts";
import { fetchJobs } from "../api/fetchJobs.ts";

type Status = "loading" | "ready" | "error";

export function useJobs() {
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false; // evita setState se o componente já desmontou
    fetchJobs()
      .then((result) => {
        if (cancelled) return;
        setJobs(result);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const accept = (id: string) => {
    setJobs(current => current.filter(job => job.id !== id));
  }

  return { jobs, status, accept };
}