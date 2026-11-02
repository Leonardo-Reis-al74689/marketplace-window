import { useJobs } from "./hooks/useJobs.ts";

export default function App() {
  const { jobs, status } = useJobs();

  if (status === "loading") return <p role="status">A carregar pedidos...</p>;
  if (status === "error") return null;

  return (
    <main>
      <h1>Pedidos</h1>
      <p>{jobs.length} pedidos</p>
    </main>
  );
}
