let myLibrary = [
  new Book("Game of Thrones", "JJ Howking", "150", true, 0),
  new Book("House of the Dragon", "JJ Howking", "120", false, 1),
  new Book("Can't Hurt Me", "David Goggins", "120", false, 2),
];

let indexCounter = 3;

const addBtn = document.querySelector(".addBtn");
const modalForm = document.querySelector(".modal-form");
const exitModal = document.querySelector(".exit");
const bookContainer = document.querySelector(".card-container");

//FORMS DATA
const title = document.getElementById("book_title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const bookStatus = document.getElementById("status");

myLibrary.forEach(displayBooks);

addBtn.addEventListener("click", () => {
  modalForm.style.display = "block";
});

exitModal.addEventListener("click", () => {
  modalForm.style.display = "none";
});

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  resetBooks();
  myLibrary.forEach(displayBooks);
});

function Book(title, author, page, status, indexNum) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.status = status;
  this.indexNum = indexNum;
}

Book.prototype.bookStatus = function () {
  if (this.status) {
    return (this.status = false);
  } else {
    return (this.status = true);
  }
};

function addBookToLibrary() {
  let book = new Book(
    title.value,
    author.value,
    pages.value,
    bookStatus.checked,
    indexCounter
  );
  indexCounter++;
  myLibrary.push(book);
  console.log(myLibrary);
}

function displayBooks(element) {
  let newBook = document.createElement("div");
  let bookTitle = document.createElement("h3");
  let authorName = document.createElement("p");
  let numberPages = document.createElement("p");
  let isRead = document.createElement("p");
  let deleteBtn = document.createElement("button");
  let statusBtn = document.createElement("button");
  let btnContainer = document.createElement("div");

  deleteBtn.textContent = "Delete";
  statusBtn.textContent = "Status";
  bookTitle.textContent = element.title;
  authorName.textContent = element.author;
  numberPages.textContent = element.page + " page";

  if (element.status) {
    isRead.textContent = "Read";
  } else isRead.textContent = "Unread";

  newBook.classList.add("card");
  btnContainer.classList.add("btn-container");
  deleteBtn.classList.add("btn");
  statusBtn.classList.add("btn");

  btnContainer.appendChild(deleteBtn);
  btnContainer.appendChild(statusBtn);
  newBook.appendChild(bookTitle);
  newBook.appendChild(authorName);
  newBook.appendChild(numberPages);
  newBook.appendChild(isRead);
  newBook.appendChild(btnContainer);
  bookContainer.appendChild(newBook);

  deleteBtn.addEventListener("click", () => {
    myLibrary = myLibrary.filter((book) => {
      return book.indexNum !== element.indexNum;
    });
    resetBooks();
    myLibrary.forEach(displayBooks);
  });

  statusBtn.addEventListener("click", function () {
    if (element.bookStatus()) {
      isRead.textContent = "Read";
    } else {
      isRead.textContent = "Unread";
    }
  });
}

function resetBooks() {
  bookContainer.innerHTML = "";
  const addCard = `<div class="card add">
            <button type="button" class="addBtn">
              <img src="img/add.png" width="80px" />
            </button>
            <p>Add a Book</p>
          </div>`;
  bookContainer.insertAdjacentHTML("afterbegin", addCard);

  title.value = "";
  author.value = "";
  pages.value = "";
  bookStatus.checked = false;

  const newAddBtn = bookContainer.querySelector(".addBtn");
  newAddBtn.addEventListener("click", () => {
    modalForm.style.display = "block";
  });
}
