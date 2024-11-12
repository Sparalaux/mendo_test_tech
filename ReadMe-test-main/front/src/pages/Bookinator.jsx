import React, { useState } from "react";
import Header from "../components/Header";

function Bookinator() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/books/bookinator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: input }),
      });

      if (!response.ok) {
        throw new Error("Échec de la récupération des suggestions");
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-black bg-white">
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 transition-transform duration-300 ease-in-out transform bg-white border-4 border-black rounded-lg shadow-lg hover:scale-105">
          <h2 className="mb-4 text-5xl font-extrabold text-center font-justicefest">
            <span className="block">Bookinator</span>
          </h2>
          <p className="mb-6 text-2xl text-center font-doodles">
            Décrivez votre histoire ou demandez une catégorie, et Bookinator vous suggérera le meilleur livre !
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Décrivez une histoire ou entrez une catégorie..."
              className="w-full p-3 mb-4 text-xl font-semibold placeholder-gray-500 bg-gray-100 border-2 border-black rounded-lg font-doodles focus:ring-2 focus:ring-gray-400"
            />
            <button
              type="submit"
              className="px-6 py-2 text-2xl text-black transition-transform duration-300 transform border-4 border-black rounded-full font-doodles hover:scale-105"
              disabled={loading}
            >
              {loading ? "Chargement..." : "Obtenir des suggestions"}
            </button>
          </form>

          {error && <p className="mt-4 text-xl font-bold text-red-600">{error}</p>}

          {suggestions && (
            <div className="p-4 mt-6 bg-gray-100 border-4 border-black rounded-lg">
              <h3 className="mb-2 text-3xl font-extrabold font-justicefest">Suggestions :</h3>
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 text-xl font-semibold text-black border-2 border-black rounded-lg"
                  >
                    {suggestion.title} <span className="italic">par</span> {suggestion.author}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookinator;
