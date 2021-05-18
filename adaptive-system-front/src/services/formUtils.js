export const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const regexName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
export const regexLogin = /^[a-zA-Z][a-zA-Z0-9]{5,19}$/

export const errMessages = {
  email: 'Nieprawidłowy adres email',
  firstName: 'Niedozwolone imię',
  lastName: 'Niedozwolone nazwisko',
  login:
    'Login musi mieć od 6 do 20 znaków, zaczynać się literą oraz składać się wyłącznie z liter i cyfr.',
  password: 'Hasło musi mieć od 8 do 64 znaków',
  confirmPassword: 'Hasła nie są identyczne',
}

export const handleIssues = (document, issues, errClass) => {
  if (issues.length === 0) return true
  for (const issue of issues) {
    const source = document.querySelector(`#${issue.source}`)
    const target = document.querySelector(`#err-${issue.source}`)
    target.classList.remove('collapsed')
    target.innerText = issue.message
    source.classList.add(errClass)
    source.addEventListener('focus', e => {
      target.classList.add('collapsed')
      source.classList.remove(errClass)
    })
  }
  return false
}
