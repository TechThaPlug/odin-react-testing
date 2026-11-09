import BookItem from "./BookItem.jsx";

function BookList({ books, selectedId = null, onSelect }) {
  if (books.length === 0) {
    return <h2>No books yet, add the first one!</h2>;
  }

  const sorted = [...books].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <ul>
      {sorted.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          isSelected={book.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

export default BookList;
