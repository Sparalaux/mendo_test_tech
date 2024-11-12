export async function fetchBook(id) {
  try {
    const response = await fetch(`/api/books/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText || "Failed to fetch the book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching book:", error.message || error);
    return null;
  }
}

export async function fetchBooks() {
  try {
    const response = await fetch("/api/books");
    if (!response.ok) {
      throw new Error(response.statusText || "Error fetching books");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error.message || error);
    return [];
  }
}

export async function fetchCategoryBooks(categoryName) {
  try {
    const response = await fetch(`/api/books/category/${categoryName}`);
    if (!response.ok) {
      throw new Error(response.statusText || "Error fetching books by category");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching books by category:", error.message || error);
    return [];
  }
}

export async function createBook(bookData, token) {
  try {
    const response = await fetch("/api/books/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) {
      throw new Error(response.statusText || "Error creating book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating book:", error.message || error);
    return null;
  }
}

export async function updateBook(bookData, token) {
  try {
    const response = await fetch(`/api/books/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) {
      throw new Error(response.statusText || "Error updating book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating book:", error.message || error);
    return null;
  }
}


export async function deleteBook(id, token) {
  try {
    const response = await fetch(`/api/books`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({ _id: id }),
    });
    if (!response.ok) {
      throw new Error(response.statusText || "Error deleting book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting book:", error.message || error);
    return null;
  }
}