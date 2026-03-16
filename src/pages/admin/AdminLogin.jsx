import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const AdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/admin/dashboard', { replace: true })
  }, [user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: signInError } = signIn(username, password)
    if (signInError) {
      setError('Invalid username or password. Please try again.')
    } else {
      navigate('/admin/dashboard', { replace: true })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="RECON Construction" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to manage your website</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Username</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-xl border border-gray-700 focus:border-yellow-400 focus:outline-none transition-colors text-sm"
                  placeholder="Enter username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full bg-gray-800 text-white pl-10 pr-10 py-3 rounded-xl border border-gray-700 focus:border-yellow-400 focus:outline-none transition-colors text-sm"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-400 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-3 rounded-xl transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                  <span>Signing in...</span>
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          RECON Construction &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
