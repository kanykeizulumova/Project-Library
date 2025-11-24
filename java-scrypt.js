
class Book {
  constructor (author, title, pages, read){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.uuid = crypto.randomUUID();
  }
  toggleReadStatus() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBookToLibrary(author, title, pages, read) {
    this.books.push(new Book(author, title, pages, read));
  }

  displayBooks () {
  const divContainer = document.getElementById("book-container");
  divContainer.innerHTML = "";
  this.books.forEach((book) => {
    let divCard = document.createElement("div");
    divCard.className = "book-card";
    let header = document.createElement("h3");
    header.textContent = "Book Info";
    divCard.appendChild(header);
    let divTitle = document.createElement("div");
    divTitle.textContent = `Book's name:  ${book.title}`;
    let divAuthor = document.createElement("div");
    divAuthor.textContent = `Author: ${book.author}`;
    let divPages = document.createElement("div");
    divPages.textContent = `Number of Pages: ${book.pages}`;
    let divRead = document.createElement("button");
    divRead.className = "read-status-btn";
    if (book.read) {
      divRead.textContent = "Read status: Read";
      divRead.classList.add("read");
    } else {
      divRead.textContent = "Read status: Not Read";
      divRead.classList.add("not-read");
    }
    divRead.addEventListener("click", () => {
      book.toggleReadStatus();
      this.displayBooks();
    });
    divCard.appendChild(divTitle);
    divCard.appendChild(divAuthor);
    divCard.appendChild(divPages);
    divCard.appendChild(divRead);
    let btnRemove = document.createElement("button");
    btnRemove.textContent = "Remove";
    divCard.appendChild(btnRemove);
    btnRemove.className = "remove-btn";
    btnRemove.setAttribute("data-uuid", book.uuid);
    btnRemove.addEventListener("click",  (event) => {
      const uuid = event.target.getAttribute("data-uuid");
      const indexToRemove = this.books.findIndex((book) => book.uuid === uuid);
      this.books.splice(indexToRemove, 1);
      this.displayBooks();
    });

    divContainer.appendChild(divCard);
  });
}
}

const myLibrary = new Library();

myLibrary.addBookToLibrary("J.K. Rowling", "Harry Potter and the Sorcerer's Stone", 309, true);
myLibrary.addBookToLibrary("J.R.R. Tolkien", "The Hobbit", 310, false);
myLibrary.addBookToLibrary("George Orwell", "1984", 328, false);
myLibrary.addBookToLibrary("F. Scott Fitzgerald", "The Great Gatsby", 180, true);
myLibrary.addBookToLibrary("Harper Lee", "To Kill a Mockingbird", 281, true);
myLibrary.addBookToLibrary("Jane Austen", "Pride and Prejudice", 279, true);
myLibrary.addBookToLibrary("Game of Thrones", "George R.R. Martin", 694, true);
myLibrary.addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 214, false);
console.log(myLibrary);

myLibrary.displayBooks();
const updateButton = document.getElementById("showDialogBtn");
updateButton.addEventListener("click", function () {
  favDialog.showModal();
});
const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", function () {
  favDialog.close();
});

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const titleElement = document.getElementById("title");
  const authorElement = document.getElementById("author");
  const pagesElement = document.getElementById("pages");
  const readElement = document.getElementById("bookRead");
  const inputRead = readElement.value === "Yes" ? true : false;
  const inputTitle = titleElement.value;
  const inputAuthor = authorElement.value;
  const inputPages = pagesElement.value;
  myLibrary.addBookToLibrary(inputTitle, inputAuthor, inputPages, inputRead);
  titleElement.value = "";
  authorElement.value = "";
  pagesElement.value = "";
  readElement.value = "";
  myLibrary.displayBooks();
  favDialog.close();
});
