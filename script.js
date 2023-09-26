const loginBtn = document.getElementById('loginBtn')
const registerBtn = document.getElementById('registerBtn')
const modalForm = document.querySelector('.modal-form')

const onClickReg = () => {
  modalForm.classList.add('reg')
}

const onClickLogin = () => {
  if (modalForm.classList.contains('reg')) {
    modalForm.classList.remove('reg')
  }
}

registerBtn.addEventListener('click', onClickReg)
loginBtn.addEventListener('click', onClickLogin)
