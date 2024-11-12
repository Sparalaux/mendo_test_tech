// db/database.js
import { JSONFilePreset } from 'lowdb/node'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

// Default data structure
const defaultData = {
  books: [],
  categories: [],
  users: []
}

// Database initialization
let db = null

export const initDatabase = async () => {
  if (!db) {
    const dbPath = path.resolve(process.cwd(), 'models/db/db.json')
    db = await JSONFilePreset(dbPath, defaultData)
  }
  return db
}

// Helper functions
export const generateId = () => uuidv4()

export const findById = (collection, id) => {
  return collection.find(item => item._id === id)
}

export const findOne = (collection, query) => {
  return collection.find(item =>
    Object.entries(query).every(([key, value]) => item[key] === value)
  )
}

export const updateOne = (collection, id, update) => {
  const index = collection.findIndex(item => item._id === id)
  if (index === -1) return false

  collection[index] = { ...collection[index], ...update }
  return true
}

export const deleteOne = (collection, id) => {
  const index = collection.findIndex(item => item._id === id)
  if (index === -1) return false

  collection.splice(index, 1)
  return true
}
