import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import App from "./App";

const WAIT = { timeout: 3000 };

async function renderLoaded() {
  render(<App />);
  await screen.findAllByRole("listitem", {}, WAIT);
}

describe("App", () => {
  it("mostra o carregamento e depois os 9 pedidos", async () => {
    render(<App />);
    expect(screen.getByRole("status")).toHaveTextContent("A carregar");

    const items = await screen.findAllByRole("listitem", {}, WAIT);
    expect(items).toHaveLength(9);
  });

  it("remove o pedido da lista ao aceitar", async () => {
    const user = userEvent.setup();
    await renderLoaded();

    await user.click(
      screen.getByRole("button", { name: "Aceitar pedido de Pintura em Braga" }),
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(8);
    expect(
      screen.queryByRole("button", { name: "Aceitar pedido de Pintura em Braga" }),
    ).not.toBeInTheDocument();
  });

  it("filtra os pedidos por cidade", async () => {
    const user = userEvent.setup();
    await renderLoaded();

    await user.selectOptions(screen.getByLabelText("Cidade"), "Braga");

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("mostra a mensagem do filtro vazio e permite limpá-lo", async () => {
    const user = userEvent.setup();
    await renderLoaded();

    await user.selectOptions(screen.getByLabelText("Cidade"), "Coimbra");
    expect(screen.getByText("Não há pedidos em Coimbra.")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);

    await user.click(screen.getByRole("button", { name: "Limpar filtro" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(9);
  });

  it("mostra a mensagem de sem pedidos depois de aceitar todos", async () => {
    const user = userEvent.setup();
    await renderLoaded();

    while (screen.queryAllByRole("button", { name: /^Aceitar pedido/ }).length > 0) {
      await user.click(
        screen.getAllByRole("button", { name: /^Aceitar pedido/ })[0],
      );
    }

    expect(
      screen.getByText("Não há pedidos disponíveis neste momento."),
    ).toBeInTheDocument();
  });
});
