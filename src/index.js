// import {
//   createIcons,
//   Library,
//   Plus,
//   FileEdit as Edit3,
//   Trash2,
//   Star
// } from "lucide";

// // Initialize Lucide icons
// createIcons({
//   icons: {
//     Library,
//     Plus,
//     Edit3,
//     Trash2,
//     Star
//   }
// });

// Sample data
let books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    status: "Read",
    rating: 5
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    status: "Read",
    rating: 4
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    status: "To Read",
    rating: 0
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    status: "Read",
    rating: 5
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    status: "To Read",
    rating: 0
  },
  {
    id: 6,
    title: "Lord of the Flies",
    author: "William Golding",
    status: "Read",
    rating: 3
  }
];

let nextId = 7;

// Create star rating HTML
function createStarRating(rating) {
  let starsHtml = '<div class="flex items-center gap-0.5">';
  for (let i = 1; i <= 5; i++) {
    const starClass = i <= rating ? "star-filled" : "star-empty";
    starsHtml += `<i data-lucide="star" class="w-4 h-4 ${starClass}"></i>`;
  }
  starsHtml += "</div>";
  return starsHtml;
}

// Create book card HTML
function createBookCard(book) {
  const statusClass =
    book.status === "Read"
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800";

  const ratingHtml =
    book.status === "Read" ? createStarRating(book.rating) : "";

  return `
        <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group">
            <div class="space-y-4">
                <div>
                    <h3 class="font-semibold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                        ${book.title}
                    </h3>
                    <p class="text-gray-600 text-sm font-medium">
                        ${book.author}
                    </p>
                </div>
                
                <div class="flex items-center justify-between">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusClass}">
                        ${book.status}
                    </span>
                    ${ratingHtml}
                </div>
                
                <div class="flex items-center gap-2 pt-2">
                    <button onclick="editBook(${book.id})" class="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                        <i data-lucide="edit-3" class="w-4 h-4"></i>
                        Edit
                    </button>
                    <button onclick="deleteBook(${book.id})" class="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Render books
function renderBooks() {
  const booksGrid = document.getElementById("booksGrid");
  const emptyState = document.getElementById("emptyState");
  const bookCount = document.getElementById("bookCount");

  if (books.length === 0) {
    booksGrid.innerHTML = "";
    emptyState.style.display = "block";
    bookCount.textContent = "0 books in your collection";
  } else {
    emptyState.style.display = "none";
    booksGrid.innerHTML = books.map(book => createBookCard(book)).join("");
    bookCount.textContent = `${books.length} books in your collection`;

    // Re-initialize Lucide icons for new content
    // createIcons({
    //   icons: {
    //     Library,
    //     Plus,
    //     Edit3,
    //     Trash2,
    //     Star
    //   }
    // });
  }
}

// Add book
function addBook(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const newBook = {
    id: nextId++,
    title: formData.get("title"),
    author: formData.get("author"),
    status: formData.get("status"),
    rating: formData.get("rating") ? parseInt(formData.get("rating")) : 0
  };

  books.push(newBook);
  renderBooks();
  event.target.reset();
}

// Delete book
function deleteBook(id) {
  if (confirm("Are you sure you want to delete this book?")) {
    books = books.filter(book => book.id !== id);
    renderBooks();
  }
}

// Edit book (simple implementation)
function editBook(id) {
  const book = books.find(b => b.id === id);
  if (!book) return;

  const newTitle = prompt("Enter new title:", book.title);
  if (newTitle === null) return;

  const newAuthor = prompt("Enter new author:", book.author);
  if (newAuthor === null) return;

  const newStatus = prompt("Enter status (Read/To Read):", book.status);
  if (newStatus === null) return;

  let newRating = book.rating;
  if (newStatus === "Read") {
    const ratingInput = prompt("Enter rating (1-5):", book.rating);
    if (ratingInput !== null) {
      newRating = parseInt(ratingInput) || 0;
    }
  }

  // Update book
  book.title = newTitle;
  book.author = newAuthor;
  book.status = newStatus;
  book.rating = newStatus === "Read" ? newRating : 0;

  renderBooks();
}

// Make functions global so they can be called from HTML
window.addBook = addBook;
window.deleteBook = deleteBook;
window.editBook = editBook;

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("bookForm").addEventListener("submit", addBook);
  renderBooks();
});
