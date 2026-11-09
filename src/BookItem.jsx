function BookItem({ book, isSelected, onSelect }) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={isSelected}
        onClick={() => onSelect(book)}
      >
        {book.title} by {book.author}
      </button>
    </li>
  );
}

export default BookItem;
