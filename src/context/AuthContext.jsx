import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'
const SESSION_KEY = 'recon_admin_auth'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY)
    if (stored === 'true') {
      setUser({ username: ADMIN_USERNAME })
    }
    setLoading(false)
  }, [])

  const signIn = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, 'true')
      setUser({ username: ADMIN_USERNAME })
      return { error: null }
    }
    return { error: 'Invalid credentials' }
  }

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
