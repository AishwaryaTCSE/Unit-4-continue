import React from "react";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex flex-col md:flex-row md:justify-between items-center">
      <div className="text-2xl font-bold mb-2 md:mb-0">MyLogo</div>
      <div className="space-x-4">
        <button className="bg-blue-800 px-4 py-2 rounded hover:bg-blue-700 transition">
          Home
        </button>
        <button className="bg-blue-800 px-4 py-2 rounded hover:bg-blue-700 transition">
          About
        </button>
        <button className="bg-blue-800 px-4 py-2 rounded hover:bg-blue-700 transition">
          Contact
        </button>
      </div>
    </nav>
  );
}

function Card({ title, content }) {
  return (
    <div className="bg-white shadow-md rounded p-6 m-4 flex-1 max-w-sm">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{content}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Learn More
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex flex-col md:flex-row justify-center items-start p-4">
        <Card
          title="Card One"
          content="This is the first card. It is responsive and will stack on smaller screens."
        />
        <Card
          title="Card Two"
          content="This is the second card. On desktop screens, cards are side by side."
        />
        <Card
          title="Card Three"
          content="This is the third card with consistent styling and responsive layout."
        />
      </main>
    </div>
  );
}

export default App;
