const API = (() => {
  const host = window.location.hostname
  const base = (host === 'localhost' || host === '127.0.0.1') ? 'http://localhost:5000' : ''
  return {
    signup: (data) => fetch(base + '/api/auth/signup', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) }),
    login: (data) => fetch(base + '/api/auth/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) }),
    me: (token) => fetch(base + '/api/auth/me', { headers: { 'Authorization': 'Bearer ' + token } })
  }
})()

if (document.getElementById('signup-form')) {
  document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const res = await API.signup({ username, email, password })
    const data = await res.json()
    if (res.ok) {
      alert('Registered. Please login.')
      window.location.href = 'login.html'
    } else {
      alert(data.message || 'Error')
    }
  })
}

if (document.getElementById('login-form')) {
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const res = await API.login({ email, password })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('token', data.token)
      window.location.href = 'index.html'
    } else {
      alert(data.message || 'Login failed')
    }
  })
}
