import React, { useState, useEffect } from "react";
import BookForm from "./book/BookForm";
import CategoryForm from "./category/CategoryForm";
import { fetchCategories, createCategory, deleteCategory } from "../services/categoryService";
import { createBook, updateBook, deleteBook } from "../services/bookService";
import { ToggleButton } from "./generic/ToggleButton";

export default function AdminSection() {
  const [bookSection, setBookSection] = useState(false);
  const [categorySection, setCategorySection] = useState(false);
  const [categories, setCategories] = useState([]); // Ensure default is an empty array
  const [messageBook, setMessageBook] = useState(null);
  const [messageCat, setMessageCat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCategories();
  }, []);

  // Handle book submission
  const handleBookSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await createBook(values, userStorage.token);
      setMessageBook(response.message || response.error);
    } catch (error) {
      setMessageBook("Erreur lors de la création du livre.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle book update
  const handleUpdateBook = async (values) => {
    try {
      const result = await updateBook({ _id: values.id, ...values }, userStorage.token);
  
      if (result) {
        setMessageBook(result.message || "Livre mis à jour avec succès.");
        if (result.stat) {
          window.location.reload();
        }
      } else {
        setMessageBook("Echec de la mise à jour du livre. Veuillez réessayer.");
      }
    } catch (error) {
      setMessageBook("Erreur : " + (error.message || "Une erreur est survenue"));
    }
  };

  // Handle book deletion
  const handleDeleteBook = async (bookId) => {
    try {
      const result = await deleteBook(bookId, userStorage.token);
  
      if (result) {
        setMessageBook(result.message || "Livre supprimé avec succès.");
        setTimeout(() => {
          window.location.href = "/books"; // Redirect after deletion
        }, 1500);
      } else {
        setMessageBook("Impossible de supprimer le livre. Veuillez réessayer.");
      }
    } catch (error) {
      setMessageBook("Erreur : " + (error.message || "Une erreur est survenue"));
    }
  };

  // Handle category creation
  const handleCategorySubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await createCategory(values.name, userStorage.token);
      setMessageCat(response.message || response.error);
    } catch (error) {
      setMessageCat("Erreur lors de la création de la catégorie.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle category deletion
  const handleCategoryDelete = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await deleteCategory(values.name, userStorage.token);
      setMessageCat(response.message || response.error);
    } catch (error) {
      setMessageCat("Erreur lors de la suppression de la catégorie.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full p-4 px-4 py-6">
      {userStorage && userStorage.isAdmin && (
        <div className="px-4 py-6 border-8 border-red-500">
          <div className="">
            <p className="font-justicefest text-6xl py-3.5 flex self-center items-center justify-center">
              Section Admin
            </p>
            {messageBook && (
              <p className="font-justicefest text-4xl py-0.5 text-red-500">
                {messageBook}
              </p>
            )}
            {messageCat && (
              <p className="font-justicefest text-4xl py-0.5 text-red-500">
                {messageCat}
              </p>
            )}
          </div>
          <div className="flex grid items-center self-center justify-center grid-cols-2 gap-10">
            <ToggleButton
              label="Livre"
              open={bookSection}
              onClick={() => {
                setBookSection(!bookSection);
                setCategorySection(false);
              }}
            />
            <ToggleButton
              label="Catégorie"
              open={categorySection}
              onClick={() => {
                setCategorySection(!categorySection);
                setBookSection(false);
              }}
            />
          </div>
          {bookSection && !isLoading && (
            <div className="max-w-3xl p-6 mx-auto mt-6 bg-white border-4 border-black rounded-lg shadow-comic rotate-1">
              {categories && categories.length > 0 ? (
                <BookForm
                  categories={categories}
                  handleSubmit={handleBookSubmit}
                  handleUpdate={handleUpdateBook}
                  handleDelete={handleDeleteBook}
                />
              ) : (
                <p>Aucune catégorie disponible. Veuillez en ajouter.</p>
              )}
            </div>
          )}
          {categorySection && !isLoading && (
            <div className="max-w-3xl p-6 mx-auto mt-6 bg-white border-4 border-black rounded-lg shadow-comic rotate-1">
              <CategoryForm
                categories={categories}
                handleSubmit={handleCategorySubmit}
                handleDelete={handleCategoryDelete}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
