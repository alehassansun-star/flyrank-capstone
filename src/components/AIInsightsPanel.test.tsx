import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AIInsightsPanel } from "./AIInsightsPanel";

describe("AIInsightsPanel", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows insights on successful fetch", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        insights: {
          titleSuggestions: ["A", "B", "C"],
          contentGaps: ["Gap 1", "Gap 2"],
          priority: "high",
        },
      }),
    }) as unknown as typeof fetch;

    render(<AIInsightsPanel keyword="test keyword" />);
    await user.click(screen.getByRole("button", { name: /get ai insights/i }));

    await waitFor(() => expect(screen.getByText("A")).toBeInTheDocument());
    expect(screen.getByText(/high/i)).toBeInTheDocument();
  });

  it("shows an error message when the fetch fails", async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Couldn't generate insights right now. Please try again." }),
    }) as unknown as typeof fetch;

    render(<AIInsightsPanel keyword="test keyword" />);
    await user.click(screen.getByRole("button", { name: /get ai insights/i }));

    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});