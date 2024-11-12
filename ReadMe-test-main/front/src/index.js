import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/Home'
import reportWebVitals from './reportWebVitals'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Book from './pages/Book'
import BookFilter from './pages/BookFilter'
import User from './pages/User'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Bookinator from './pages/Bookinator'
import Achievements from './pages/Achievements'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/achievements',
    element: <Achievements />,
  },
  {
    path: '/bookinator',
    element: <Bookinator />,
  },
  {
    path: '/:id',
    element: <Book />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/user/:id',
    element: <User />,
  },
  {
    path: '/category/:name',
    element: <BookFilter />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
