
// controllers/category.js
import * as Category from "../models/category_model.js";
import { Validator } from "node-input-validator";

export const createCategory = async (req, res, next) => {
  const validInput = new Validator(req.body, {
    name: "required",
  });

  try {
    const matched = await validInput.check();
    if (!matched) {
      return res.status(400).send(validInput.errors);
    }

    await Category.createCategory({ name: req.body.name });
    res.status(201).json({ message: "Catégorie de livre créée avec succès !" });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la catégorie :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findCategories();
    res.status(200).send(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    res.status(400).send("La récupération des catégories a échoué.");
  }
};

export const deleteCategory = async (req, res, next) => {
  const validInput = new Validator(req.body, {
    name: "required",
  });

  try {
    const matched = await validInput.check();
    if (!matched) {
      return res.status(400).send(validInput.errors);
    }

    const deleted = await Category.deleteCategory(req.body.name);
    if (deleted) {
      res.status(200).json({ message: "Catégorie supprimée avec succès !" });
    } else {
      res.status(404).json({ message: "Aucune catégorie sous ce nom n'existe" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie :", error);
    res.status(400).send("La suppression de la catégorie a échoué.");
  }
};