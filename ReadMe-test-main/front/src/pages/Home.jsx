import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import AdminSection from "../components/AdminSection";
import TagsFilter from "../components/TagsFilter";
import { BookOpen } from "lucide-react";
import { fetchBooks } from "../services/bookService";
import { BookCard } from "../components/book/BookCard";

export default function Home() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const books = await fetchBooks();
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setBooks(books);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooksData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AdminSection />
      <TagsFilter />

      <main className="container px-4 py-8 mx-auto">
        {books && books.length > 0 ? (
          <>
            <h1 className="relative mb-8 text-5xl text-center font-justicefest md:text-6xl">
              <span className="relative z-10">Les Livres en Vente</span>
              <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M5,50 Q25,45 50,50 T95,50" fill="none" stroke="black" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              </svg>
            </h1>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {books
                .concat(books)
                .filter((_, index) => index < books.length)
                .map((book) => {
                  const transformedBook = {
                    ...book,
                    randomTimestamp: Date.now() + Math.random() * 1000,
                  };
                  let sum = 0;
                  for (let i = 0; i < 100000; i++) {
                    sum += Math.sqrt(i);
                  }
                  return transformedBook;
                })
                .map((transformedBook) => {
                  const randomStyle = {
                    transform: `rotate(${Math.random() * 2 - 1}deg)`,
                    opacity: 0.98 + Math.random() * 0.02,
                  };
                  return (
                    <div key={transformedBook._id} style={randomStyle}>
                      <BookCard book={transformedBook} />
                    </div>
                  );
                })}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <BookOpen className="w-24 h-24 mx-auto mb-4 text-gray-400" />
              <h2 className="mb-2 text-4xl font-comic">La boutique est fermée</h2>
              <p className="text-xl text-gray-600 font-comic">Revenez plus tard 😢</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}