import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaProjectDiagram, FaStar, FaList, FaEnvelope, FaPlus, FaClock } from 'react-icons/fa'
import AdminLayout from '../../components/admin/AdminLayout'
import TypeBadge from '../../components/admin/TypeBadge'
import { supabase } from '../../lib/supabase'
import { formatAdminDate } from '../../utils/dateUtils'
import { DB_TABLES, PROJECT_TYPES, ADMIN_ROUTES } from '../../constants/database'

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
  </div>
)

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, featured: 0, regular: 0, contacts: 0 })
  const [recentProjects, setRecentProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get project counts by type using server-side aggregation
        const { data: projectCounts } = await supabase
          .from(DB_TABLES.PROJECTS)
          .select('project_type')
          .then(({ data, error }) => {
            if (error) throw error
            const counts = data.reduce((acc, p) => {
              acc[p.project_type] = (acc[p.project_type] || 0) + 1
              return acc
            }, {})
            return {
              data: {
                total: data.length,
                featured: counts[PROJECT_TYPES.FEATURED] || 0,
                regular: counts[PROJECT_TYPES.REGULAR] || 0
              }
            }
          })

        // Get recent projects (limit to 5)
        const { data: recentProjects } = await supabase
          .from(DB_TABLES.PROJECTS)
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)

        // Get contacts count
        const { count: contacts } = await supabase
          .from(DB_TABLES.CONTACTS)
          .select('*', { count: 'exact', head: true })

        setStats({
          ...projectCounts,
          contacts: contacts ?? 0,
        })
        setRecentProjects(recentProjects || [])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={FaProjectDiagram} label="Total Projects" value={loading ? '—' : stats.total} color="bg-gray-700" />
          <StatCard icon={FaStar} label="Featured" value={loading ? '—' : stats.featured} color="bg-yellow-500" />
          <StatCard icon={FaList} label="Regular" value={loading ? '—' : stats.regular} color="bg-blue-500" />
          <Link to="/admin/quotes" className="block transition-transform hover:scale-105">
            <StatCard icon={FaEnvelope} label="Quote Requests" value={loading ? '—' : stats.contacts} color="bg-green-500" />
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/projects"
            className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            <FaPlus size={12} />
            <span>Add New Project</span>
          </Link>
          <Link
            to="/admin/projects"
            className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            <FaList size={12} />
            <span>Manage Projects</span>
          </Link>
          <Link
            to="/admin/quotes"
            className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            <FaEnvelope size={12} />
            <span>View Quote Requests</span>
          </Link>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Recent Projects</h2>
          </div>
          {loading ? (
            <div className="p-8 text-center text-gray-400 text-sm">Loading...</div>
          ) : recentProjects.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">
              No projects yet.{' '}
              <Link to="/admin/projects" className="text-yellow-500 hover:underline">
                Add your first project
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3 text-left">Title</th>
                    <th className="px-6 py-3 text-left">Type</th>
                    <th className="px-6 py-3 text-left">Location</th>
                    <th className="px-6 py-3 text-left">Added</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentProjects.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{p.title}</td>
                      <td className="px-6 py-4"><TypeBadge type={p.project_type} /></td>
                      <td className="px-6 py-4 text-gray-500">{p.location || '—'}</td>
                      <td className="px-6 py-4 text-gray-400">
                        <span className="flex items-center space-x-1">
                          <FaClock size={10} />
                          <span>{formatAdminDate(p.created_at)}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
