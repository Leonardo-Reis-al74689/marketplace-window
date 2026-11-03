import { useJobs } from "./hooks/useJobs.ts";
import { useState } from "react";
import JobList from "./components/JobList";
import CityFilter from "./components/CityFilter";
import "./App.css";
import { cities } from "./data/cities.ts";

export default function App() {
  const { jobs, status, accept } = useJobs();
  const [city, setCity] = useState("");

  const visibleJobs = city ? jobs.filter((job) => job.city === city) : jobs;

  // O botão "Limpar filtro" desaparece, por isso o foco passa para o select
  const clearFilter = () => {
    setCity("");
    document.getElementById("city-filter")?.focus();
  };

  return (
    <main>
      <h1>Pedidos disponíveis</h1>
      {status === "loading" && <p role="status">A carregar pedidos...</p>}
      {status === "ready" && (
        <>
          <CityFilter value={city} onChange={setCity} cities={cities} />
          <p aria-live="polite">
            {visibleJobs.length} {visibleJobs.length === 1 ? "pedido" : "pedidos"}
          </p>
          <JobList
            jobs={visibleJobs}
            hasAnyJobs={jobs.length > 0}
            city={city}
            onAccept={accept}
            onClearFilter={clearFilter}
          />
        </>
      )}
      {status === "error" && <p role="alert">Não foi possível carregar os pedidos. Tenta novamente mais tarde.</p>}
    </main>
  );
}
