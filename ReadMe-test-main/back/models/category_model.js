// models/category_model.js
import { initDatabase, generateId } from './db/database.js'

export const createCategory = async (categoryData) => {
  const db = await initDatabase()
  const category = {
    _id: generateId(),
    ...categoryData
  }
  
  db.data.categories.push(category)
  await db.write()
  return category
}

export const findCategories = async () => {
  const db = await initDatabase()
  return db.data.categories
}

export const findCategoryByName = async (name) => {
  const db = await initDatabase()
  return db.data.categories.find(category => category.name === name)
}

export const deleteCategory = async (name) => {
  const db = await initDatabase()
  const initialLength = db.data.categories.length
  db.data.categories = db.data.categories.filter(category => category.name !== name)
  await db.write()
  return db.data.categories.length < initialLength
}