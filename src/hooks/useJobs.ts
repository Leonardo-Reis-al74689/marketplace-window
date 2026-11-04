import { useState, useEffect } from "react";
import type { JobRequest } from "../types.ts";
import { fetchJobs } from "../api/fetchJobs.ts";

type Status = "loading" | "ready" | "error";

export function useJobs() {
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  // Incrementar este contador volta a correr o efeito, ou seja, repete o pedido
  const [attempt, setAttempt] = useState(0);

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
  }, [attempt]);

  const accept = (id: string) => {
    setJobs(current => current.filter(job => job.id !== id));
  }

  const reload = () => {
    setStatus("loading");
    setAttempt((current) => current + 1);
  };

  return { jobs, status, accept, reload };
}