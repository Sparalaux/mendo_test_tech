  export async function fetchCategories() {
    try {
      const response = await fetch("/api/categories");
      return response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      return []
    }
  }
  
  export async function createCategory(name, token) {
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    return response.json();
  }
  
  export async function deleteCategory(name, token) {
    const response = await fetch("/api/categories", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    return response.json();
  }
  