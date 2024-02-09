let myLibrary = []

function Book(title, author, pages, isRead, isFavorite) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
  this.isFavorite = isFavorite
}

function addBookToLibrary(e) {
  const form = document.querySelector('#add-book-form')
  e.preventDefault()

  // fetch the data from the form
  const title = document.querySelector('#book-title').value
  const author = document.querySelector('#book-author').value
  const pages = document.querySelector('#book-pages').value
  const isRead = document.querySelector('#book-read').checked
  const isFavorite = document.querySelector('#book-favorites').checked
  const book = new Book(title, author, pages, isRead, isFavorite)
  myLibrary.push(book)
  displayBooks()
  form.reset()
  addBookModal.classList.remove('show')
}

function displayBooks() {
  const bookshelfContainerEl = document.querySelector('.bookshelf-container')
  const emptyBookshelfEl = document.querySelector('.bookshelf-empty')

  if (myLibrary.length === 0) {
    emptyBookshelfEl.style.display = 'flex'
    bookshelfContainerEl.style.display = 'none'
  } else {
    emptyBookshelfEl.style.display = 'none'
    bookshelfContainerEl.style.display = 'grid'
    bookshelfContainerEl.innerHTML = ''

    myLibrary.forEach((book, index) => {
      const bookContainer = `
        <div class="book">
        <div class="book-icons">
        <i class="fa-solid fa-trash-can deleteBtn" onclick="deleteBook(${index}, 'bookshelf')"></i>
          <i class="${
            book.isFavorite ? 'fa-solid' : 'fa-regular'
          } fa-heart isFavorite" onclick="toggleFavorite(${index}, 'bookshelf')"></i>
        </div>
          <p class="book-titles">Title: ${book.title}</p>
          <p class="book-authors">Author: ${book.author}</p>
          <p class="book-pages">No. of pages: ${book.pages}</p>
          <p class="isRead"><i class="fa-regular ${
            book.isRead ? 'fa-square-check' : 'fa-square'
          } readToggler" onclick="toggleRead(${index}, 'bookshelf')"></i> Read</p>
        </div>
      `
      bookshelfContainerEl.innerHTML += bookContainer
    })
  }
}

function toggleFavorite(index, checker) {
  myLibrary[index].isFavorite = !myLibrary[index].isFavorite
  if (checker === 'bookshelf') {
    displayBooks()
  } else if (checker === 'favorites') {
    displayFavorites()
  } else {
    displaySearchResult()
  }
}

function toggleRead(index, checker) {
  myLibrary[index].isRead = !myLibrary[index].isRead
  if (checker === 'bookshelf') {
    displayBooks()
  } else if (checker === 'favorites') {
    displayFavorites()
  } else {
    displaySearchResult()
  }
}

// modal containers
const addBookModal = document.querySelector('.add-books')
const searchModal = document.querySelector('.search-book')
const mainBookshelfContainerEl = document.querySelector('.main__bookshelf')
const favoritesContainerEl = document.querySelector('.main__favorites')
const searchResultContainerEl = document.querySelector('.main__search-results')

// favorite button
const showFavoritesBtn = document.querySelector('#favorites')
// show the favorites page
const backBtnEl = document.querySelector('#backBtn')

showFavoritesBtn.addEventListener('click', () => {
  favoritesContainerEl.classList.add('show')
  backBtnEl.classList.add('show')
  mainBookshelfContainerEl.classList.add('hide')
  searchResultContainerEl.classList.remove('show')
  // smoothly scroll the window towards the favorites section
  window.scrollTo({
    top: 80,
    behavior: 'smooth',
  })
  displayFavorites()
})

//  function that display favorite books
function displayFavorites() {
  const favoriteBooksContainerEl = document.querySelector(
    '.favorites-container'
  )
  const emptyFavoritesEl = document.querySelector('.favorites-empty')

  const favoriteBooks = myLibrary.filter((book) => book.isFavorite === true)

  if (favoriteBooks.length === 0) {
    emptyFavoritesEl.style.display = 'flex'
    favoriteBooksContainerEl.style.display = 'none'
  } else {
    emptyFavoritesEl.style.display = 'none'
    favoriteBooksContainerEl.style.display = 'grid'
    favoriteBooksContainerEl.innerHTML = ''

    favoriteBooks.forEach((book, index) => {
      const bookContainer = `
        <div class="book">
        <div class="book-icons">
        <i class="fa-solid fa-trash-can deleteBtn" onclick="deleteBook(${index}, 'favorites')"></i>
          <i class="${
            book.isFavorite ? 'fa-solid' : 'fa-regular'
          } fa-heart isFavorite" onclick="toggleFavorite(${index}, 'favorites')"></i>
        </div>
          <p class="book-titles">Title: ${book.title}</p>
          <p class="book-authors">Author: ${book.author}</p>
          <p class="book-pages">No. of pages: ${book.pages}</p>
          <p class="isRead"><i class="fa-regular ${
            book.isRead ? 'fa-square-check' : 'fa-square'
          } readToggler" onclick="toggleRead(${index}, 'favorites')"></i> Read</p>
        </div>
      `
      favoriteBooksContainerEl.innerHTML += bookContainer
    })
  }
}
// back button to bookshelf
backBtnEl.addEventListener('click', () => {
  mainBookshelfContainerEl.classList.remove('hide')
  favoritesContainerEl.classList.remove('show')
  searchResultContainerEl.classList.remove('show')
  backBtnEl.classList.toggle('show')
  window.scrollTo({
    top: 80,
    behavior: 'smooth',
  })
  displayBooks()
})

// delete button
function deleteBook(index, checker) {
  const modifiedLibrary = myLibrary.filter((_, i) => i !== index)
  myLibrary = modifiedLibrary

  if (checker === 'bookshelf') {
    displayBooks()
  } else if (checker === 'favorites') {
    displayFavorites()
  } else {
    displaySearchResult()
  }
}

// search book button
function displaySearchResult() {
  const searchValue = document
    .querySelector('#search-value')
    .value.toLowerCase()
  const searchResults = myLibrary.filter((book) =>
    book.title.toLowerCase().includes(searchValue)
  )

  const resultContainerEl = document.querySelector('.results-container')
  const resultEmptyContainer = document.querySelector('.search-results-empty')

  searchResultContainerEl.classList.add('show')
  backBtnEl.classList.add('show')
  mainBookshelfContainerEl.classList.add('hide')
  favoritesContainerEl.classList.remove('show')

  if (searchResults.length > 0) {
    resultEmptyContainer.style.display = 'none'
    resultContainerEl.style.display = 'grid'
    resultContainerEl.innerHTML = ''

    searchResults.forEach((book, index) => {
      const bookContainer = `
      <div class="book">
      <div class="book-icons">
      <i class="fa-solid fa-trash-can deleteBtn" onclick="deleteBook(${index}, 'searchResult')"></i>
        <i class="${
          book.isFavorite ? 'fa-solid' : 'fa-regular'
        } fa-heart isFavorite" onclick="toggleFavorite(${index}, 'searchResult')"></i>
      </div>
        <p class="book-titles">Title: ${book.title}</p>
        <p class="book-authors">Author: ${book.author}</p>
        <p class="book-pages">No. of pages: ${book.pages}</p>
        <p class="isRead"><i class="fa-regular ${
          book.isRead ? 'fa-square-check' : 'fa-square'
        } readToggler" onclick="toggleRead(${index}, 'searchResult')"></i> Read</p>
      </div>
    `
      resultContainerEl.innerHTML += bookContainer
    })
  } else {
    resultEmptyContainer.style.display = 'flex'
    resultContainerEl.style.display = 'none'
  }

  console.log(searchResults)
  // smoothly scroll the window towards the favorites section
  window.scrollTo({
    top: 80,
    behavior: 'smooth',
  })
}

// open add book button
const openAddBookBtnEl = document.querySelector('#addBook')
// opens add book modal
openAddBookBtnEl.addEventListener('click', () => {
  addBookModal.classList.toggle('show')
  searchModal.classList.remove('show')
})

// search book button
const openSearchBtnEl = document.querySelector('#searchBook')
// opens the search modal
openSearchBtnEl.addEventListener('click', () => {
  searchModal.classList.toggle('show')
  addBookModal.classList.remove('show')
})

// cancel buttons
const cancelBtnEl = document.querySelector('.cancelBtn')

// close the modal
cancelBtnEl.addEventListener('click', (e) => {
  e.preventDefault()
  const modal = cancelBtnEl.closest('.modal')
  if (modal) {
    modal.classList.remove('show')
  }
})

// add book button (submits form)
const addBookBtnEl = document.querySelector('#addBookBtn')
addBookBtnEl.addEventListener('click', () => {
  mainBookshelfContainerEl.classList.remove('hide')
  favoritesContainerEl.classList.remove('show')
  searchResultContainerEl.classList.remove('show')
  backBtnEl.classList.remove('show')
  // smoothly scroll the window towards the favorites section
  window.scrollTo({
    top: 80,
    behavior: 'smooth',
  })
})

// window.addEventListener('scroll', () => {
//   console.log(window.scrollY)
// })
displayBooks()
