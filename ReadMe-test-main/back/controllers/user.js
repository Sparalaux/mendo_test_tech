
// controllers/user.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pwRules from "../security/password.js";
import * as User from "../models/user_model.js";
import { Validator } from "node-input-validator";

export const createUser = async (req, res, next) => {
  const validInput = new Validator(req.body, {
    email: "required|email|length:100",
    password: "required",
  });

  try {
    const matched = await validInput.check();
    if (!matched) {
      return res.status(400).send(validInput.errors);
    }

    if (!pwRules.validate(req.body.password)) {
      return res.json({ message: "Mot de passe invalide" });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    await User.createUser({
      email: req.body.email,
      password: hash,
    });

    res.status(201).json({ message: "Compte créé !" });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const modifyUser = async (req, res, next) => {
  const validInput = new Validator(req.body, {
    _id: "required",
  });

  try {
    const matched = await validInput.check();
    if (!matched) {
      return res.status(400).send(validInput.errors);
    }

    const updateData = {};

    if (req.body.email) {
      const existingUser = await User.findUserByEmail(req.body.email);
      if (existingUser && existingUser._id !== req.body._id) {
        return res.json({ message: "Email déjà pris" });
      }
      updateData.email = req.body.email;
    }

    if (req.body.password) {
      if (!pwRules.validate(req.body.password)) {
        return res.json({ message: "Mot de passe invalide" });
      }
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.body.isAdmin !== undefined) {
      updateData.isAdmin = req.body.isAdmin;
    }

    const success = await User.updateUser(req.body._id, updateData);
    if (success) {
      res.status(200).json({ message: "Utilisateur modifié" });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la modification de l'utilisateur :", error);
    res.status(400).send("La modification de l'utilisateur a échoué.");
  }
};

export const logUser = async (req, res, next) => {
  const validInput = new Validator(req.body, {
    email: "required|email|length:100",
    password: "required",
  });

  try {
    const matched = await validInput.check();
    if (!matched) {
      return res.status(400).send(validInput.errors);
    }

    const user = await User.findUserByEmail(req.body.email);
    if (!user) {
      return res.json({ message: "Ce compte n'existe pas" });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.json({ message: "Mauvais mot de passe" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        isAdmin: user.isAdmin,
      },
      "verySecretJWT",
      { expiresIn: "24h" }
    );

    await User.updateUser(user._id, { token });

    res.status(200).send({
      message: "Compte connecté !",
      user: {
        _id: user._id,
        email: user.email,
        token: token,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(400).send("La connexion a échoué.");
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findUserById(req.params.id);
    if (!user) {
      return res.json({ message: "Aucun compte utilise cet identifiant" });
    }

    // Remove sensitive data
    const { token, password, isAdmin, ...safeUser } = user;
    res.status(200).send(safeUser);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(400).send("La récupération de l'utilisateur a échoué.");
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findUsers();
    // Remove sensitive data
    const safeUsers = users.map(({ token, password, isAdmin, ...safeUser }) => safeUser);
    res.status(200).send(safeUsers);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(400).send("La récupération des utilisateurs a échoué.");
  }
};

export const deleteUser = async (req, res, next) => {
  const validInput = new Validator(req.body, {
    _id: "required",
  });

  try {
    const matched = await validInput.check();
    if (!matched) {
      return res.status(400).send(validInput.errors);
    }

    const deleted = await User.deleteUser(req.body._id);
    if (deleted) {
      res.status(200).json({ message: "Compte supprimé avec succès" });
    } else {
      res.status(404).json({ message: "Aucun compte avec cet identifiant n'existe" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(400).send("La suppression de l'utilisateur a échoué.");
  }
};