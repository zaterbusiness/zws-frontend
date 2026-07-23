const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getToken = () => localStorage.getItem('zater_token')

async function request(method, path, body) {
  const headers = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))

  if (res.status === 401) {
    localStorage.removeItem('zater_token')
    // Avoid redirect loops if already on the login page
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
      window.location.href = '/login'
    }
    const err = new Error(data.error || data.message || 'Session expired. Please log in again.')
    err.data = data
    err.status = 401
    throw err
  }

  if (!res.ok) {
    const err = new Error(data.error || data.message || `Request failed (${res.status})`)
    err.data = data
    err.status = res.status
    throw err
  }
  return data
}

const api = {
  get:        (path)        => request('GET',    path),
  post:       (path, body)  => request('POST',   path, body),
  put:        (path, body)  => request('PUT',    path, body),
  delete:     (path)        => request('DELETE', path),
  getToken,
  setToken:   (token)       => localStorage.setItem('zater_token', token),
  clearToken: ()            => localStorage.removeItem('zater_token'),
}

export default api