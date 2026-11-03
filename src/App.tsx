import { useJobs } from "./hooks/useJobs.ts";
import JobList from "./components/JobList";
import "./App.css";

export default function App() {
  const { jobs, status } = useJobs();

  if (status === "loading") return <p role="status">A carregar pedidos...</p>;
  if (status === "error") return null;

  return (
    <main>
      <h1>Pedidos</h1>
      <JobList jobs={jobs} />
    </main>
  );
}
