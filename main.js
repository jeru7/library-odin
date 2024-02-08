// modal containers
const addBookModal = document.querySelector('.add-books')
// add book buttons
const addBookBtnEl = document.querySelector('#addBook')
// opens add book modal
addBookBtnEl.addEventListener('click', () => {
  addBookModal.classList.toggle('show')
})

// cancel buttons
const cancelBtnEl = document.querySelector('.cancelBtn')

// close the modal
cancelBtnEl.addEventListener('click', (e) => {
  e.preventDefault()
  const modal = btn.closest('.modal')
  if (modal) {
    modal.classList.remove('show')
  }
})
