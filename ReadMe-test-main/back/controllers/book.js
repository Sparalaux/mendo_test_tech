// controllers/book.js
import { Validator } from "node-input-validator";
import * as Book from "../models/book_model.js";
import * as Category from "../models/category_model.js";
import OpenAI from "openai";
// const apiKey =  process.env.OPENAI_API_KEY
// const openai = new OpenAI({ apiKey : apiKey });

export const addBook = async (req, res, next) => {
  const validInput = new Validator(req.body, {
    title: "required",
    author: "required",
    editor: "required",
    description: "required",
    stock: "required",
    isbn: "required",
    pagenumber: "required",
    price: "required",
    publishingyear: "required",
  });

  try {
    const matched = await validInput.check();
    if (!matched) {
      return res.status(400).send(validInput.errors);
    }

    const book = await Book.createBook({
      images: req.body.images || [],
      author: req.body.author,
      editor: req.body.editor,
      categories: req.body.categories || [],
      description: req.body.description,
      stock: req.body.stock,
      price: req.body.price,
      isbn: req.body.isbn,
      pagenumber: req.body.pagenumber,
      publishingyear: req.body.publishingyear,
      librarianreview: req.body.librarianreview || "En cours d'examination",
    });

    res.status(201).json({ message: "Livre créé avec succès !" });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du livre :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const getBook = async (req, res, next) => {
  try {
    const book = await Book.findBook(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Erreur lors de la récupération du livre :", error);
    res.status(400).send("La récupération du livre a échoué.");
  }
};

export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.findBooks();
    res.status(200).send(books);
  } catch (error) {
    console.error("Erreur lors de la récupération des livres :", error);
    res.status(400).send("La récupération des livres a échoué.");
  }
};

export const modifyBook = async (req, res, next) => {
  const validInput = new Validator(req.body, {
    _id: "required",
  });

  try {
    const matched = await validInput.check();
    if (!matched) {
      return res.status(400).send(validInput.errors);
    }

    const success = await Book.updateBook(req.body._id, req.body);
    if (success) {
      res.status(200).json({ message: "Livre modifié avec succès !" });
    } else {
      res.status(404).json({ message: "Livre non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la modification du livre :", error);
    res.status(400).send("La modification du livre a échoué.");
  }
};

export const deleteBook = async (req, res, next) => {
  const validInput = new Validator(req.body, {
    _id: "required",
  });

  try {
    const matched = await validInput.check();
    if (!matched) {
      return res.status(400).send(validInput.errors);
    }

    const deleted = await Book.deleteBook(req.body._id);
    if (deleted) {
      res.status(200).json({ message: "Livre supprimé avec succès !" });
    } else {
      res.status(404).json({
        message: "Cet identifiant n'existe pas dans la base de données des livres",
      });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du livre :", error);
    res.status(400).send("La suppression du livre a échoué.");
  }
};

export const getBookWithCategory = async (req, res, next) => {
  try {
    const category = await Category.findCategoryByName(req.params.name);
    if (!category) {
      return res.json({ message: "Cette catégorie n'existe pas" });
    }

    const books = await Book.findBooksByCategory(category.name);
    res.status(200).send(books);
  } catch (error) {
    console.error("Erreur lors de la récupération des livres par catégorie :", error);
    res.status(400).send("La récupération des livres par catégorie a échoué.");
  }
};

// export const bookinator = async (req, res, next) =>{
//   try{
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o",
//       messages: [
//           { role: "system", content: "You are a helpful assistant. Help finding books titles from users description or category" },
//           {
//               role: "user",
//               content: req.body.input,
//           },
//       ],
//   });
//   res.status(200).send(completion.choices[0].message)
//   }
//   catch (error){
//     console.error("Erreur lors de la récupération des livres par catégorie :", error);
//     res.status(400).send("La récupération des livres par catégorie a échoué.");
//   }
// }