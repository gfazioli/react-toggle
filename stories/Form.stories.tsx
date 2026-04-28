import { useState, type FormEvent } from "react";
import type { Story } from "@ladle/react";
import { Toggle } from "../src/Toggle";

export default {
  title: "Form integration",
};

export const NativeForm: Story = () => {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    setSubmitted(JSON.stringify(Object.fromEntries(fd.entries()), null, 2));
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Toggle name="newsletter" value="yes" />
        Subscribe to newsletter
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Toggle name="notifications" value="enabled" defaultChecked />
        Enable notifications
      </label>
      <button type="submit" style={{ width: "fit-content" }}>
        Submit
      </button>
      {submitted && <pre>{submitted}</pre>}
    </form>
  );
};

export const ControlledForm: Story = () => {
  const [agreed, setAgreed] = useState(false);
  return (
    <div>
      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Toggle name="agree" checked={agreed} onCheckedChange={setAgreed} />I accept the terms
      </label>
      <button type="button" disabled={!agreed} onClick={() => alert("Submitted")} style={{ marginTop: 12 }}>
        Continue
      </button>
    </div>
  );
};
