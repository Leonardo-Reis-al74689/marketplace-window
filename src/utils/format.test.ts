import { describe, it, expect } from "vitest";
import { formatPrice, formatDuration, formatDateTime } from "./format";

describe("formatDuration", () => {
  it("mostra só minutos abaixo de uma hora", () => {
    expect(formatDuration(45)).toBe("45m");
  });

  it("mostra só horas quando não há minutos", () => {
    expect(formatDuration(60)).toBe("1h");
  });

  it("mostra horas e minutos quando há ambos", () => {
    expect(formatDuration(90)).toBe("1h 30m");
  });

  it("mostra horas e minutos quando há ambos", () => {
    expect(formatDuration(240)).toBe("4h");
  });
});

describe("formatPrice", () => {
  it("formata cêntimos em euros", () => {
    const result = formatPrice(4500);
    expect(result).toContain("45,00");
    expect(result).toContain("€");
  });
});

describe("formatDateTime", () => {
  it("usa a hora de Lisboa no inverno", () => {
    expect(formatDateTime(new Date("2026-11-12T10:00:00Z"))).toContain("10:00");
  });

  it("usa a hora de Lisboa no verão (UTC+1)", () => {
    expect(formatDateTime(new Date("2027-08-19T09:00:00Z"))).toContain("10:00");
  });
});