import { useState } from "react";

function Greeter() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setGreeting("Hello, " + name.trim() + "!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Your name</label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">Greet me</button>
      {greeting && <p role="status">{greeting}</p>}
    </form>
  );
}

export default Greeter;
