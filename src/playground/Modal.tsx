"use client";

import { useEffect, useId, useRef, useState, type ReactNode, type MouseEvent } from "react";

interface ModalProps {
  triggerLabel: string;
  title: string;
  children: ReactNode;
}

// ARIA APG Dialog (Modal) pattern:
// https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
export function Modal({ triggerLabel, title, children }: ModalProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Move focus INTO the dialog when it opens, and trap Tab/Shift+Tab inside it.
  useEffect(() => {
    if (!open) return;
    const dialogNode = dialogRef.current;
    if (!dialogNode) return;

    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const getFocusable = () =>
      Array.from(dialogNode.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (el) => el.offsetParent !== null // skip hidden elements
      );

    // Initial focus: first focusable element inside the dialog (commonly Close, per APG guidance
    // "focus should be set to the first focusable element unless a more suitable target is known").
    getFocusable()[0]?.focus();

    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const focusable = getFocusable();
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        // Loop focus back around instead of letting it escape the dialog — this IS the "focus trap".
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Return focus to whatever triggered the dialog once it closes — required by APG.
  useEffect(() => {
    if (!open) triggerRef.current?.focus();
  }, [open]);

  function handleOverlayClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) setOpen(false);
  }

  return (
    <>
      <button ref={triggerRef} onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onMouseDown={handleOverlayClick}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
          >
            <h2 id={titleId} className="text-xl font-bold mb-4">
              {title}
            </h2>
            <div className="mb-6">{children}</div>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}