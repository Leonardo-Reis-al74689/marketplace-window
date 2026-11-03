# Vivências – pedidos disponíveis

Ecrã onde o profissional vê os pedidos de reparação disponíveis, filtra por cidade e aceita os que lhe interessam. React + TypeScript (Vite), sem backend.

## Como correr

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm test         # testes (Vitest + Testing Library)
npm run build    # verificação de tipos e build de produção
npm run lint
```

## Decisões

- **Dados e API simulados:** os pedidos estão em `src/data/jobs.ts`. `fetchJobs` devolve-os após 1 segundo para simular a rede, e o hook `useJobs` gere os estados `loading`, `ready` e `error`.
- **"Aceitar" é simulado:** apenas remove o pedido do estado local. Com um backend seria um pedido `POST`.
- **Datas:** as datas ISO estão em UTC e são mostradas em `Europe/Lisbon`, para o resultado ser igual em qualquer máquina.
- **Filtro:** a lista de cidades é fixa (inclui Coimbra, sem pedidos, para mostrar o vazio do filtro). Num sistema real viria do backend.
- **Ordem:** os pedidos aparecem pela ordem dos dados.
- **Acessibilidade:** HTML semântico (`ul/li/article`, `dl`, `time`), `label` no filtro, botões com nome completo, `role="status"` e `role="alert"`, foco visível e contagem anunciada com `aria-live`.
- **Testes:** os de componente usam o atraso real de 1 s (`findBy*` com timeout), em vez de fake timers, que não se dão bem com `userEvent`.

## O que faria a seguir

- Ligar a um backend real: `GET` e `POST` de aceitar, com estado pendente por pedido e tratamento de conflitos (pedido já aceite por outro).
- Botão "Tentar de novo" no erro e persistência do filtro na URL.
- Com muitos pedidos: paginação no servidor, e debounce numa pesquisa por texto.
- Testes end-to-end (Playwright) e CI com lint, build e testes.
