// models/user_model.js
import { initDatabase, generateId } from './db/database.js'

export const createUser = async (userData) => {
  const db = await initDatabase()
  const user = {
    _id: generateId(),
    ...userData,
    token: '',
    isAdmin: false
  }
  
  db.data.users.push(user)
  await db.write()
  return user
}

export const findUserByEmail = async (email) => {
  const db = await initDatabase()
  return db.data.users.find(user => user.email === email)
}

export const findUserById = async (id) => {
  const db = await initDatabase()
  return db.data.users.find(user => user._id === id)
}

export const updateUser = async (id, updateData) => {
  const db = await initDatabase()
  const index = db.data.users.findIndex(user => user._id === id)
  if (index === -1) return false
  
  db.data.users[index] = { ...db.data.users[index], ...updateData }
  await db.write()
  return true
}

export const findUsers = async () => {
  const db = await initDatabase()
  return db.data.users
}

export const deleteUser = async (id) => {
  const db = await initDatabase()
  const initialLength = db.data.users.length
  db.data.users = db.data.users.filter(user => user._id !== id)
  await db.write()
  return db.data.users.length < initialLength
}