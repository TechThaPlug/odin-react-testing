import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookItem from "./BookItem.jsx";

const book = { id: 1, title: "Atomic Habits", author: "Clear" };

describe("BookItem", () => {
  it("shows the title and author", () => {
    render(<BookItem book={book} isSelected={false} onSelect={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Atomic Habits by Clear" }),
    ).toBeInTheDocument();
  });

  it("reports whether it is selected", () => {
    render(<BookItem book={book} isSelected onSelect={vi.fn()} />);

    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onSelect with its book when clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<BookItem book={book} isSelected={false} onSelect={onSelect} />);
    await user.click(screen.getByRole("button"));

    expect(onSelect).toHaveBeenCalledWith(book);
  });
});
