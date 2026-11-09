import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeter from "./Greeter";

describe("Greeter", () => {
  it("shows no greeting at first", () => {
    render(<Greeter />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("greets the user by name after submitting", async () => {
    const user = userEvent.setup();
    render(<Greeter />);

    await user.type(screen.getByLabelText("Your name"), "Raul");
    await user.click(screen.getByRole("button", { name: "Greet me" }));

    expect(screen.getByRole("status")).toHaveTextContent("Hello, Raul!");
  });

  it("lets the user submit with the Enter key", async () => {
    const user = userEvent.setup();
    render(<Greeter />);

    await user.type(screen.getByLabelText("Your name"), "Ana{Enter}");

    expect(screen.getByRole("status")).toHaveTextContent("Hello, Ana!");
  });
});
