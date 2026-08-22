"use client";

import { useState } from "react";

interface Insights {
  titleSuggestions: string[];
  contentGaps: string[];
  priority: "low" | "medium" | "high";
}

interface AIInsightsPanelProps {
  keyword: string;
  url?: string;
}

export function AIInsightsPanel({ keyword, url }: AIInsightsPanelProps) {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchInsights() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, url }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong.");
      }
      const data = await res.json();
      setInsights(data.insights);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={fetchInsights}
        disabled={loading || !keyword}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Generating..." : "Get AI Insights"}
      </button>

      {error && (
        <p role="alert" className="text-red-600 mt-2">
          {error}
        </p>
      )}

      {insights && (
        <div className="mt-4 space-y-3">
          <div>
            <h3 className="font-semibold">Title suggestions</h3>
            <ul className="list-disc pl-5">
              {insights.titleSuggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Content gaps</h3>
            <ul className="list-disc pl-5">
              {insights.contentGaps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <p className="text-sm">
            Priority: <strong>{insights.priority}</strong>
          </p>
        </div>
      )}
    </div>
  );
}