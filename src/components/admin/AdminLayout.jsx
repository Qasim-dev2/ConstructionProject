import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaTachometerAlt, FaProjectDiagram, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const AdminLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  const navItems = [
    { to: '/admin/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { to: '/admin/projects', icon: FaProjectDiagram, label: 'Projects' },
  ]

  const Sidebar = () => (
    <aside className="w-64 bg-gray-950 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <img src="/logo.png" alt="RECON Construction" className="h-10 w-auto" />
        <p className="text-yellow-400 text-xs mt-2 font-medium tracking-widest uppercase">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors duration-200"
        >
          <FaSignOutAlt size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex flex-col">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-gray-900 font-bold text-lg">{title}</h1>
          </div>
          <button
            onClick={handleLogout}
            className="hidden lg:flex items-center space-x-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            <FaSignOutAlt size={14} />
            <span>Logout</span>
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
