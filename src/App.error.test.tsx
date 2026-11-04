import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "./App";
import { fetchJobs } from "./api/fetchJobs";
import { jobs } from "./data/jobs";

vi.mock("./api/fetchJobs", () => ({
  fetchJobs: vi.fn(),
}));

const mockedFetchJobs = vi.mocked(fetchJobs);

describe("App com erro ao carregar", () => {
  beforeEach(() => {
    mockedFetchJobs.mockReset();
  });

  it("mostra a mensagem de erro e esconde filtro e lista", async () => {
    mockedFetchJobs.mockRejectedValue(new Error("falhou"));
    render(<App />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Não foi possível carregar os pedidos");

    expect(screen.queryByLabelText("Cidade")).not.toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("volta a carregar os pedidos ao tentar de novo", async () => {
    const user = userEvent.setup();
    mockedFetchJobs
      .mockRejectedValueOnce(new Error("falhou"))
      .mockResolvedValueOnce([...jobs]);
    render(<App />);

    await screen.findByRole("alert");
    await user.click(screen.getByRole("button", { name: "Tentar de novo" }));

    expect(await screen.findAllByRole("listitem")).toHaveLength(9);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(mockedFetchJobs).toHaveBeenCalledTimes(2);
  });
});
