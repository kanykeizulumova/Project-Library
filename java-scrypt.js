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
Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function displayBooks() {
  const divContainer = document.getElementById("book-container");
  divContainer.innerHTML = "";
  myLibrary.forEach((Book) => {
    let divCard = document.createElement("div");
    divCard.className = "book-card";
    let header = document.createElement("h3");
    header.textContent = "Book Info";
    divCard.appendChild(header);
    let divTitle = document.createElement("div");
    divTitle.textContent = `Book's name:  ${Book.title}`;
    let divAuthor = document.createElement("div");
    divAuthor.textContent = `Author: ${Book.author}`;
    let divPages = document.createElement("div");
    divPages.textContent = `Number of Pages: ${Book.pages}`;
    let divRead = document.createElement("button");
    divRead.className = "read-status-btn";
    divRead.textContent = Book.read
      ? "Read status: Read"
      : "Read status: Not Read";
    divRead.style.backgroundColor = Book.read ? "#65f123ff" : "#91180bff";
    divRead.addEventListener("click", function () {
      Book.toggleReadStatus();
      if (Book.read === true) {
        divRead.textContent = `Read status: Read`;
        divRead.style.backgroundColor = "#65f123ff";
      } else {
        divRead.textContent = `Read status: Not Read`;
        divRead.style.backgroundColor = "#91180bff";
      }
    });
    divCard.appendChild(divTitle);
    divCard.appendChild(divAuthor);
    divCard.appendChild(divPages);
    divCard.appendChild(divRead);
    let btnRemove = document.createElement("button");
    btnRemove.textContent = "Remove";
    divCard.appendChild(btnRemove);
    btnRemove.setAttribute("data-uuid", Book.uuid);
    btnRemove.addEventListener("click", function (event) {
      const uuid = event.target.getAttribute("data-uuid");
      const indexToRemove = myLibrary.findIndex((book) => book.uuid === uuid);
      myLibrary.splice(indexToRemove, 1);
      displayBooks();
    });

    divContainer.appendChild(divCard);
  });
}

displayBooks();

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
  addBookToLibrary(inputTitle, inputAuthor, inputPages, inputRead);
  titleElement.value = "";
  authorElement.value = "";
  pagesElement.value = "";
  readElement.value = "";
  displayBooks();
  favDialog.close();
});
