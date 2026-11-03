import { jobs } from "../data/jobs.ts";
import type { JobRequest } from "../types.ts";

export function fetchJobs(): Promise<JobRequest[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...jobs]), 1000);
  });
  // Apenas para verificação de erro
  // return Promise.reject(new Error("Failed to fetch jobs"));
}

