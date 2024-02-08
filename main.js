const myLibrary = []

function Book(title, author, pages, isRead, isFavorite) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
  this.isFavorite = isFavorite
}

function addBookToLibrary(e) {
  e.preventDefault()

  // fetch the data from the form
  const title = document.querySelector('#book-title').value
  const author = document.querySelector('#book-author').value
  const pages = document.querySelector('#book-pages').value
  const isRead = document.querySelector('#book-read').checked
  const isFavorite = document.querySelector('#book-favorites').checked
  const book = new Book(title, author, pages, isRead, isFavorite)
  myLibrary.push(book)
  addBooks()
}

function addBooks() {
  const bookshelfContainerEl = document.querySelector('.bookshelf-container')
  myLibrary.forEach((book) => {
    const bookContainer = `
    <div class="book">
              <i class="fa-solid fa-trash-can deleteBtn"></i>
              <i class="fa-regular fa-heart isFavorite"></i>
              <p class="book-titles">${book.title}</p>
              <p class="book-authors">${book.author}</p>
              <p class="book-pages">${book.pages}</p>
              <p class="isRead">Read</p>
            </div>
    `
    bookshelfContainerEl.innerHTML += bookContainer
  })
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
})

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
})

// search book button
const searchBtn = document.querySelector('#searchBtn')

searchBtn.addEventListener('click', () => {
  searchResultContainerEl.classList.add('show')
  backBtnEl.classList.add('show')
  mainBookshelfContainerEl.classList.add('hide')
  favoritesContainerEl.classList.remove('show')
  // smoothly scroll the window towards the favorites section
  window.scrollTo({
    top: 80,
    behavior: 'smooth',
  })
})

// open add book button
const openAddBookBtnEl = document.querySelector('#addBook')
// opens add book modal
openAddBookBtnEl.addEventListener('click', () => {
  addBookModal.classList.add('show')
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
  addBookModal.classList.add('show')
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

addBooks()
