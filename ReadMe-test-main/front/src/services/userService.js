export const loginUser = async (credentials) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        return {
          success: true,
          user: result.user,
          message: result.message || "Connexion réussie !",
        };
      } else {
        return {
          success: false,
          message: result.error || "Échec de la connexion. Veuillez réessayer.",
        };
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      return {
        success: false,
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      };
    }
};

// services/userService.js
export const signUpUser = async (credentials) => {
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        return {
          success: true,
          message: result.message || "Compte créé avec succès !",
        };
      } else {
        return {
          success: false,
          message: result.error || "Échec de la création du compte.",
        };
      }
    } catch (error) {
      console.error("Erreur lors de la création du compte :", error);
      return {
        success: false,
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      };
    }
};

export const fetchUser = async (id, token) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        headers: new Headers({
          Authorization: `Basic ${token}`,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      throw error;
    }
  };
  
  export const updateUser = async (userData, token) => {
    try {
      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        }),
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        return {
          success: true,
          message: result.message || "Utilisateur modifié avec succès.",
        };
      } else {
        return {
          success: false,
          message: result.error || "Erreur lors de la modification de l'utilisateur.",
        };
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      return {
        success: false,
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      };
    }
  };
  
  export const deleteUser = async (id, token) => {
    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        }),
        body: JSON.stringify({ _id: id }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        return {
          success: true,
          message: result.message || "Compte Supprimé",
        };
      } else {
        return {
          success: false,
          message: result.error || "Erreur lors de la suppression du compte.",
        };
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      return {
        success: false,
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      };
    }
  };
  