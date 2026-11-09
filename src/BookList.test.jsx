import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookList from "./BookList.jsx";

// Replace the real BookItem with a bare-bones stand-in.
// It shows the props it received, so we can check them.
vi.mock("./BookItem.jsx", () => ({
  default: ({ book, isSelected, onSelect }) => (
    <li data-testid={"book-" + book.id} data-selected={String(isSelected)}>
      <button type="button" onClick={() => onSelect(book)}>
        {book.title}
      </button>
    </li>
  ),
}));

function makeBooks() {
  return [
    { id: 2, title: "Zen and the Art", author: "Pirsig" },
    { id: 1, title: "Atomic Habits", author: "Clear" },
    { id: 3, title: "Meditations", author: "Aurelius" },
  ];
}

describe("BookList", () => {
  it("shows a message when there are no books", () => {
    render(<BookList books={[]} onSelect={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: /no books yet/i }),
    ).toBeInTheDocument();
    expect(screen.queryAllByTestId(/^book-/)).toHaveLength(0);
  });

  it("renders one item per book, sorted by title", () => {
    const books = makeBooks();

    render(<BookList books={books} onSelect={vi.fn()} />);

    const items = screen.getAllByTestId(/^book-/);
    expect(items.map((item) => item.textContent)).toEqual([
      "Atomic Habits",
      "Meditations",
      "Zen and the Art",
    ]);
  });

  it("does not change the array it was given", () => {
    const books = makeBooks();

    render(<BookList books={books} onSelect={vi.fn()} />);

    expect(books.map((book) => book.id)).toEqual([2, 1, 3]);
  });

  it("marks only the selected book as selected", () => {
    const books = makeBooks();

    render(<BookList books={books} selectedId={3} onSelect={vi.fn()} />);

    expect(screen.getByTestId("book-3")).toHaveAttribute(
      "data-selected",
      "true",
    );
    expect(screen.getByTestId("book-1")).toHaveAttribute(
      "data-selected",
      "false",
    );
    expect(screen.getByTestId("book-2")).toHaveAttribute(
      "data-selected",
      "false",
    );
  });

  it("marks no book as selected when selectedId is missing", () => {
    render(<BookList books={makeBooks()} onSelect={vi.fn()} />);

    screen.getAllByTestId(/^book-/).forEach((item) => {
      expect(item).toHaveAttribute("data-selected", "false");
    });
  });

  it("passes the onSelect callback down to the items", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const books = makeBooks();

    render(<BookList books={books} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "Atomic Habits" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(books[1]);
  });
});
