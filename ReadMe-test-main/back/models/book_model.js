// models/book_model.js
import { initDatabase, generateId } from './db/database.js'

export const createBook = async (bookData) => {
  const db = await initDatabase()
  const book = {
    _id: generateId(),
    ...bookData,
    images: bookData.images || [],
    categories: bookData.categories || [],
    librarianreview: bookData.librarianreview || "En cours d'examination"
  }
  
  db.data.books.push(book)
  await db.write()
  return book
}

export const findBook = async (id) => {
  const db = await initDatabase()
  return db.data.books.find(book => book._id === id)
}

export const findBooks = async () => {
  const db = await initDatabase()
  return db.data.books
}

export const updateBook = async (id, updateData) => {
  const db = await initDatabase()
  const index = db.data.books.findIndex(book => book._id === id)
  if (index === -1) return false
  
  db.data.books[index] = { ...db.data.books[index], ...updateData }
  await db.write()
  return true
}

export const deleteBook = async (id) => {
  const db = await initDatabase()
  const initialLength = db.data.books.length
  db.data.books = db.data.books.filter(book => book._id !== id)
  await db.write()
  return db.data.books.length < initialLength
}

export const findBooksByCategory = async (categoryName) => {
  const db = await initDatabase();
  return db.data.books.filter(book => book.categories[0] === categoryName);
};
