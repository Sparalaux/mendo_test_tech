import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import Header from "../components/Header";
import AdminSection from "../components/AdminSection";
import TagsFilter from "../components/TagsFilter";
import { fetchCategoryBooks } from "../services/bookService";
import { BookCard } from "../components/book/BookCard";

export default function BookFilter() {
  const [books, setBooks] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await fetchCategoryBooks(params.name);
        setBooks(books);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
  
    fetchBooks();
  }, [params.name]);
  

  return (
    <div className="min-h-screen text-black">
      <Header />
      <AdminSection />
      <TagsFilter />

      <main className="container px-4 py-8 mx-auto">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="relative inline-block mb-4 text-5xl font-justicefest md:text-6xl">
            <span className="relative z-10">Les Livres en vente : {params.name}</span>
          </h1>
        </motion.div>

        {books && books.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="flex items-center justify-center h-[60vh]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8 text-center bg-white border-4 border-black rounded-lg shadow-comic">
              <BookOpen className="w-24 h-24 mx-auto mb-4 text-gray-400" />
              <h2 className="mb-2 text-4xl font-justicefest">Catégorie Vide</h2>
              <p className="text-xl text-gray-600 font-doodles">
                Cette catégorie est vide ou n'existe tout simplement pas 😢
              </p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}