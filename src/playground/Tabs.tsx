"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  label: string; // accessible name for the tablist itself
}

// ARIA APG Tabs pattern (automatic activation variant):
// https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
export function Tabs({ items, label }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function focusTab(index: number) {
    const nextIndex = (index + items.length) % items.length; // wraps around at both ends
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(items.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex gap-2 border-b border-gray-200">
        {items.map((item, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              // Roving tabindex: only the SELECTED tab is in the normal Tab order.
              // Arrow keys move focus between tabs; Tab key moves OUT of the tablist entirely.
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`px-4 py-2 border-b-2 -mb-px ${
                selected ? "border-blue-600 text-blue-600 font-medium" : "border-transparent text-gray-600"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={index !== activeIndex}
          tabIndex={0}
          className="p-4"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}