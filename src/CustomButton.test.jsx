import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomButton from "./CustomButton";

function setup() {
  const onClick = vi.fn();
  const user = userEvent.setup();
  render(<CustomButton onClick={onClick} />);
  const button = screen.getByRole("button", { name: "Click me" });

  return { onClick, user, button };
}

describe("CustomButton", () => {
  it("renders a button with the text 'Click me'", () => {
    const { button } = setup();

    expect(button).toBeInTheDocument();
  });

  it("calls onClick once when clicked", async () => {
    const { onClick, user, button } = setup();

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClick for each click", async () => {
    const { onClick, user, button } = setup();

    await user.click(button);
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("does not call onClick when it isn't clicked", () => {
    const { onClick } = setup();

    expect(onClick).not.toHaveBeenCalled();
  });

  it("can be activated with the keyboard", async () => {
    const { onClick, user } = setup();

    await user.tab();
    await user.keyboard("{Enter}");

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
