import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return user ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default ProtectedRoute
