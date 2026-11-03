import { useJobs } from "./hooks/useJobs.ts";
import JobList from "./components/JobList";
import "./App.css";

export default function App() {
  const { jobs, status } = useJobs();

  return (
    <main>
      <h1>Pedidos disponíveis</h1>
      {status === "loading" && <p role="status">A carregar pedidos...</p>}
      {status === "ready" && <JobList jobs={jobs} />}
    </main>
  );
}
