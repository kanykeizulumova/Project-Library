const myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.uuid = crypto.randomUUID();
}

function addBookToLibrary(author, title, pages, read) {
  myLibrary.push(new Book(author, title, pages, read));
}

addBookToLibrary(
  "J.K. Rowling",
  "Harry Potter and the Sorcerer's Stone",
  309,
  true
);
addBookToLibrary("J.R.R. Tolkien", "The Hobbit", 310, false);
addBookToLibrary("George Orwell", "1984", 328, true);
addBookToLibrary("F. Scott Fitzgerald", "The Great Gatsby", 180, false);
addBookToLibrary("Harper Lee", "To Kill a Mockingbird", 281, true);
addBookToLibrary("Jane Austen", "Pride and Prejudice", 279, false);
addBookToLibrary("Game of Thrones", "George R.R. Martin", 694, true);
console.log(myLibrary);

function displayBooks() {
  const divContainer = document.getElementById("book-container");
  divContainer.innerHTML = "";
  myLibrary.forEach((Book) => {
    let divCard = document.createElement("div");
    let divTitle = document.createElement("div");
    divTitle.textContent = Book.title;
    let divAuthor = document.createElement("div");
    divAuthor.textContent = Book.author;
    let divPages = document.createElement("div");
    divPages.textContent = Book.pages;
    let divRead = document.createElement("div");
    divRead.textContent = Book.read;
    let btnRemove = document.createElement("button");

    divCard.appendChild(divTitle);
    divCard.appendChild(divAuthor);
    divCard.appendChild(divPages);
    divCard.appendChild(divRead);
    divContainer.appendChild(divCard);
  });
}

displayBooks();
const updateButton = document.getElementById("showDialogBtn");
updateButton.addEventListener("click", function () {
  favDialog.showModal();
});

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const inputTitle = document.getElementById("title").value;
  const inputAuthor = document.getElementById("author").value;
  const inputPages = document.getElementById("pages").value;
  const inputRead =
    document.getElementById("bookRead").value === "Yes" ? true : false;
  addBookToLibrary(inputTitle, inputAuthor, inputPages, inputRead);
  displayBooks();
  inputAuthor.value = "";
  inputTitle.value = "";
  inputPages.value = "";
  inputRead.value = "";
  favDialog.close();
});
