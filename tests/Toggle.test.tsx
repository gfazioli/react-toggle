import { createRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "../src/Toggle";

describe("Toggle — rendering", () => {
  it("renders a switch input", () => {
    render(<Toggle name="demo" />);
    const input = screen.getByRole("switch");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "checkbox");
  });

  it("uses name as id by default", () => {
    render(<Toggle name="demo" />);
    expect(screen.getByRole("switch")).toHaveAttribute("id", "demo");
  });

  it("explicit id overrides name", () => {
    render(<Toggle name="demo" id="custom" />);
    expect(screen.getByRole("switch")).toHaveAttribute("id", "custom");
  });

  it("forwards ref to the input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Toggle name="demo" ref={ref} />);
    expect(ref.current).toBe(screen.getByRole("switch"));
    expect(ref.current?.tagName).toBe("INPUT");
  });
});

describe("Toggle — uncontrolled", () => {
  it("starts unchecked by default", () => {
    render(<Toggle name="demo" />);
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("respects defaultChecked", () => {
    render(<Toggle name="demo" defaultChecked />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Toggle name="demo" />);
    const input = screen.getByRole("switch");
    await user.click(input);
    expect(input).toBeChecked();
    await user.click(input);
    expect(input).not.toBeChecked();
  });

  it("toggles via keyboard (Space)", async () => {
    const user = userEvent.setup();
    render(<Toggle name="demo" />);
    const input = screen.getByRole("switch");
    input.focus();
    await user.keyboard(" ");
    expect(input).toBeChecked();
  });
});

describe("Toggle — controlled", () => {
  it("renders the controlled value", () => {
    render(<Toggle name="demo" checked onChange={() => {}} />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("does not change without parent updating checked", async () => {
    const user = userEvent.setup();
    render(<Toggle name="demo" checked={false} onChange={() => {}} />);
    const input = screen.getByRole("switch");
    await user.click(input);
    expect(input).not.toBeChecked();
  });

  it("updates when parent state changes", async () => {
    const user = userEvent.setup();
    function Wrapper() {
      const [on, setOn] = useState(false);
      return <Toggle name="demo" checked={on} onCheckedChange={setOn} />;
    }
    render(<Wrapper />);
    const input = screen.getByRole("switch");
    await user.click(input);
    expect(input).toBeChecked();
    await user.click(input);
    expect(input).not.toBeChecked();
  });
});

describe("Toggle — disabled", () => {
  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Toggle name="demo" disabled onCheckedChange={onCheckedChange} />);
    const input = screen.getByRole("switch");
    await user.click(input);
    expect(input).not.toBeChecked();
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});

describe("Toggle — events", () => {
  it("fires onCheckedChange with new checked value and event", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Toggle name="demo" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.objectContaining({ target: expect.any(HTMLInputElement) }));
  });

  it("fires onChange (raw event)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle name="demo" onChange={onChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("fires deprecated onToggle", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<Toggle name="demo" onToggle={onToggle} />);
    await user.click(screen.getByRole("switch"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("fires deprecated onRight when going to checked, onLeft when unchecked", async () => {
    const user = userEvent.setup();
    const onLeft = vi.fn();
    const onRight = vi.fn();
    render(<Toggle name="demo" onLeft={onLeft} onRight={onRight} />);
    const input = screen.getByRole("switch");
    await user.click(input);
    expect(onRight).toHaveBeenCalledTimes(1);
    expect(onLeft).not.toHaveBeenCalled();
    await user.click(input);
    expect(onLeft).toHaveBeenCalledTimes(1);
  });
});

describe("Toggle — accessibility", () => {
  it("has role=switch", () => {
    render(<Toggle name="demo" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("forwards aria-label", () => {
    render(<Toggle name="demo" aria-label="Enable feature" />);
    expect(screen.getByRole("switch")).toHaveAccessibleName("Enable feature");
  });

  it("forwards aria-labelledby", () => {
    render(
      <>
        <span id="lbl">My label</span>
        <Toggle name="demo" aria-labelledby="lbl" />
      </>,
    );
    expect(screen.getByRole("switch")).toHaveAttribute("aria-labelledby", "lbl");
  });

  it("supports an external <label htmlFor>", () => {
    render(
      <>
        <label htmlFor="demo">External label</label>
        <Toggle name="demo" />
      </>,
    );
    expect(screen.getByLabelText("External label")).toBe(screen.getByRole("switch"));
  });
});

describe("Toggle — theming via CSS vars", () => {
  it("maps visual props to CSS custom properties on the root", () => {
    render(
      <Toggle
        name="demo"
        width="100px"
        height="40px"
        borderColor="tomato"
        leftKnobColor="lime"
        rightBackgroundColor="navy"
      />,
    );
    const root = screen.getByRole("switch").parentElement as HTMLElement;
    expect(root.style.getPropertyValue("--rt-width")).toBe("100px");
    expect(root.style.getPropertyValue("--rt-height")).toBe("40px");
    expect(root.style.getPropertyValue("--rt-border-color")).toBe("tomato");
    expect(root.style.getPropertyValue("--rt-knob-color-off")).toBe("lime");
    expect(root.style.getPropertyValue("--rt-background-color-on")).toBe("navy");
  });

  it("preserves user-provided style alongside CSS vars", () => {
    render(<Toggle name="demo" width="80px" style={{ marginTop: "10px" }} />);
    const root = screen.getByRole("switch").parentElement as HTMLElement;
    expect(root.style.getPropertyValue("--rt-width")).toBe("80px");
    expect(root.style.marginTop).toBe("10px");
  });

  it("merges className", () => {
    render(<Toggle name="demo" className="custom" />);
    const root = screen.getByRole("switch").parentElement as HTMLElement;
    expect(root.className).toMatch(/custom/);
  });
});

describe("Toggle — form integration", () => {
  it("submits the value when checked", () => {
    let submitted: string | null = "__not-submitted__";
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitted = new FormData(event.currentTarget).get("agree") as string | null;
        }}
      >
        <Toggle name="agree" value="yes" defaultChecked />
        <button type="submit">Send</button>
      </form>,
    );
    screen.getByText("Send").click();
    expect(submitted).toBe("yes");
  });

  it("omits the value when unchecked", () => {
    let submitted: string | null = "__not-submitted__";
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitted = new FormData(event.currentTarget).get("agree") as string | null;
        }}
      >
        <Toggle name="agree" value="yes" />
        <button type="submit">Send</button>
      </form>,
    );
    screen.getByText("Send").click();
    expect(submitted).toBeNull();
  });
});
