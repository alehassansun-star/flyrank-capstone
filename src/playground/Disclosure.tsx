"use client";

import { useId, useState, type ReactNode } from "react";

interface DisclosureProps {
  summary: string;
  children: ReactNode;
}

// ARIA APG Disclosure (Show/Hide) pattern:
// https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
// This is the simplest of the three — a native <button> already handles Enter/Space
// activation for free, so there's no custom key handling needed here at all.
export function Disclosure({ summary, children }: DisclosureProps) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <div>
      <button
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center gap-2 font-medium"
      >
        <span>{expanded ? "▾" : "▸"}</span>
        {summary}
      </button>
      {/* The `hidden` attribute removes this from the accessibility tree entirely when collapsed —
          simpler and more robust than trying to manage aria-hidden manually. */}
      <div id={contentId} hidden={!expanded} className="p-4 border-l-2 border-gray-200 ml-2 mt-2">
        {children}
      </div>
    </div>
  );
}