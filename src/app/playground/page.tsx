import { Modal } from "@/playground/Modal";
import { Tabs } from "@/playground/Tabs";
import { Disclosure } from "@/playground/Disclosure";

export default function PlaygroundPage() {
  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-bold">Accessibility Playground</h1>

      <section>
        <h2 className="text-lg font-semibold mb-3">Modal</h2>
        <Modal triggerLabel="Open modal" title="Example Dialog">
          <p>This is the dialog content. Try Tab, Shift+Tab, and Escape.</p>
          <input type="text" placeholder="A focusable field" className="border p-2 mt-2 w-full" />
        </Modal>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Tabs</h2>
        <Tabs
          label="Example tabs"
          items={[
            { id: "one", label: "Profile", content: <p>Profile panel content.</p> },
            { id: "two", label: "Settings", content: <p>Settings panel content.</p> },
            { id: "three", label: "Billing", content: <p>Billing panel content.</p> },
          ]}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Disclosure</h2>
        <Disclosure summary="What is this?">
          <p>This content is hidden until you activate the button above.</p>
        </Disclosure>
      </section>
    </div>
  );
}