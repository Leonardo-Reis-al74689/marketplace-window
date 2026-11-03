import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "./App";

vi.mock("./api/fetchJobs", () => ({
  fetchJobs: () => Promise.reject(new Error("falhou")),
}));

describe("App com erro ao carregar", () => {
  it("mostra a mensagem de erro e esconde filtro e lista", async () => {
    render(<App />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Não foi possível carregar os pedidos");

    expect(screen.queryByLabelText("Cidade")).not.toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
