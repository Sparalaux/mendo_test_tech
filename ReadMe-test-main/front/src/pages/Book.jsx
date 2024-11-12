import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import TagsFilter from "../components/TagsFilter";
import { fetchBook, updateBook, deleteBook } from "../services/bookService";
import BookForm from "../components/book/BookForm";
import { fetchCategories } from "../services/categoryService";
import BookCategories from "../components/book/BookCategories";

export default function Book() {
  const [book, setBook] = useState(null);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageStyle, setMessageStyle] = useState("");
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await fetchBook(params.id);
        setBook(bookData);

        // Fetch categories from the database
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    console.log(categories)

    fetchData();
  }, [params.id]);

  const handleUpdateBook = async (values) => {
    try {
      const result = await updateBook({ _id: params.id, ...values }, userStorage.token);
  
      if (result) { // Check if result is not null (successful response)
        setMessage(result.message || "Livre mis à jour avec succès.");
        setMessageStyle("text-green-500"); // Success color
  
        if (result.stat) {
          window.location.reload();
        }
      } else {
        // Result is null, indicating an error
        setMessage("Echec de la mise à jour du livre. Veuillez réessayer.");
        setMessageStyle("text-red-500"); // Error color
      }
    } catch (error) {
      setMessage("Erreur : " + (error.message || "Une erreur est survenue"));
      setMessageStyle("text-red-500"); // Error color
    }
  };  

  const handleDeleteBook = async () => {
    try {
      const result = await deleteBook(params.id, userStorage.token);
  
      if (result) { // Check if result is not null
        setMessage(result.message || "Livre supprimé avec succès.");
        setMessageStyle("text-green-500"); // Success color
        setTimeout(() => {
          window.location.href = "/"; // Redirect after deletion
        }, 1500);
      } else {
        setMessage("Impossible de supprimer le livre. Veuillez réessayer.");
        setMessageStyle("text-red-500"); // Error color
      }
    } catch (error) {
      setMessage("Erreur : " + (error.message || "Une erreur est survenue"));
      setMessageStyle("text-red-500"); // Error color
    }
  };
  
  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 transform bg-white border-4 border-black rounded-lg shadow-comic rotate-3 animate-appear">
          <p className="text-6xl text-black font-comic">Livre Introuvable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <Header />
      <TagsFilter />

      <div className="container mx-auto mt-8">
        <div className="flex flex-col gap-8 lg:flex-row animate-slideUp">
          {/* Left Column: Book Image */}
          <div className="flex flex-col items-center p-6 transform bg-white border-4 border-black rounded-lg shadow-comic -rotate-1">
            <div className="mb-6 overflow-hidden">
              <img
                alt={book.images && book.images.length > 0 ? `Book: ${book.title}` : "Default book display"}
                src={book.images && book.images.length > 0 ? book.images[0] : "/images/cadre.png"}
                className="object-cover w-64 h-96"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 p-6 transform bg-white border-4 border-black rounded-lg shadow-comic rotate-1">
            <h1 className="mb-4 text-4xl font-bold text-black font-comic">Détails du Livre</h1>

            {/* Display message if any */}
            {message && (
              <p className={`font-justicefest text-4xl py-0.5 ${messageStyle}`}>
                {message}
              </p>
            )}

            {userStorage?.isAdmin ? (
              // Admin view with BookForm for editing
              <>
                <BookForm
                  initialValues={{
                    _id: book._id,
                    images: book.images || [],
                    title: book.title || "",
                    author: book.author || "",
                    editor: book.editor || "",
                    categories: book.categories || [],
                    description: book.description || "",
                    stock: book.stock || 0,
                    price: book.price || 0,
                    isbn: book.isbn || "",
                    pagenumber: book.pagenumber || 0,
                    publishingyear: book.publishingyear || 0,
                    librarianreview: book.librarianreview || "",
                  }}
                  onSubmit={handleUpdateBook}
                  categories={categories}
                />
                <button
                onClick={handleDeleteBook}
                className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-700 font-comic"
                >
                  Supprimer
                </button>
              </>
            ) : (
              // Non-admin view with book details only
              <div>
                <BookDetail label="Auteur" value={book.author} />
                <BookDetail label="Éditeur" value={book.editor} />
                <BookDetail label="Date" value={book.publishingyear} />
                <BookDetail label="Stock" value={book.stock} />
                <BookDetail label="Pages" value={book.pagenumber} />
                <BookDetail label="Prix" value={`${book.price} €`} />

                <h2 className="mt-6 mb-4 text-3xl font-bold text-black font-comic">Description :</h2>
                <p className="mb-6 text-xl font-comic">{book.description}</p>

                <h2 className="mb-4 text-3xl font-bold text-black font-comic">Avis du Libraire :</h2>
                <p className="mb-6 text-xl font-comic">{book.librarianreview}</p>

                <h2 className="mb-4 text-3xl font-bold text-black font-comic">Tags :</h2>
                <div className="flex flex-wrap gap-2">
                    {book.categories && <BookCategories categories={book.categories} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BookDetail({ label, value }) {
  return (
    <p className="mb-2 text-xl font-comic">
      <span className="font-bold">{label}:</span> {value}
    </p>
  );
}