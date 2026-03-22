import { useEffect, useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaStar, FaList, FaSearch, FaImage } from 'react-icons/fa'
import AdminLayout from '../../components/admin/AdminLayout'
import AdminProjectForm from './AdminProjectForm'
import TypeBadge from '../../components/admin/TypeBadge'
import { supabase } from '../../lib/supabase'
import { formatAdminDate } from '../../utils/dateUtils'

const StatusBadge = ({ status }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
    status === 'completed'
      ? 'bg-green-100 text-green-700'
      : 'bg-orange-100 text-orange-700'
  }`}>
    {status === 'completed' ? 'Completed' : 'In Progress'}
  </span>
)

const AdminProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchProjects = async () => {
    setLoading(true)
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    setProjects(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchProjects() }, [])

  const handleAdd = () => {
    setEditingProject(null)
    setFormOpen(true)
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormOpen(true)
  }

  const handleFormSave = (savedProject) => {
    setProjects(prev => {
      const exists = prev.find(p => p.id === savedProject.id)
      if (exists) return prev.map(p => p.id === savedProject.id ? savedProject : p)
      return [savedProject, ...prev]
    })
    setFormOpen(false)
    setEditingProject(null)
  }

  const handleDelete = async (project) => {
    setDeleting(true)
    // Delete images from storage
    const imagesToDelete = []
    if (project.main_image_url) {
      const path = project.main_image_url.split('/project-images/')[1]
      if (path) imagesToDelete.push(path)
    }
    if (project.images?.length) {
      project.images.forEach(url => {
        const path = url.split('/project-images/')[1]
        if (path) imagesToDelete.push(path)
      })
    }
    if (imagesToDelete.length) {
      await supabase.storage.from('project-images').remove(imagesToDelete)
    }
    await supabase.from('projects').delete().eq('id', project.id)
    setProjects(prev => prev.filter(p => p.id !== project.id))
    setDeleteConfirm(null)
    setDeleting(false)
  }

  const filtered = projects.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.location || '').toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === 'all' || p.project_type === filter
    return matchesSearch && matchesFilter
  })

  return (
    <AdminLayout title="Projects">
      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>
            {/* Filter */}
            <div className="flex rounded-xl border border-gray-300 overflow-hidden">
              {[
                { val: 'all', icon: FaList, label: 'All' },
                { val: 'featured', icon: FaStar, label: 'Featured' },
              ].map(({ val, icon: Icon, label }) => (
                <button
                  key={val}
                  onClick={() => setFilter(val)}
                  className={`flex items-center space-x-1.5 px-4 py-2 text-sm transition-colors ${
                    filter === val
                      ? 'bg-yellow-400 text-gray-900 font-semibold'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={12} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
          >
            <FaPlus size={12} />
            <span>Add Project</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400 text-sm">
              <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              Loading projects...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <FaImage className="text-gray-300 mx-auto mb-3" size={32} />
              <p className="text-gray-500 text-sm">
                {search || filter !== 'all' ? 'No projects match your search.' : 'No projects yet.'}
              </p>
              {!search && filter === 'all' && (
                <button
                  onClick={handleAdd}
                  className="mt-4 text-yellow-500 hover:underline text-sm font-medium"
                >
                  Add your first project
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-3 text-left">Project</th>
                      <th className="px-6 py-3 text-left">Type</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Location</th>
                      <th className="px-6 py-3 text-left">Added</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            {p.main_image_url ? (
                              <img
                                src={p.main_image_url}
                                alt={p.title}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FaImage className="text-gray-400" size={14} />
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-gray-900 line-clamp-1">{p.title}</p>
                              <p className="text-gray-400 text-xs">{p.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4"><TypeBadge type={p.project_type} /></td>
                        <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                        <td className="px-6 py-4 text-gray-500">{p.location || '—'}</td>
                        <td className="px-6 py-4 text-gray-400 text-xs">
                          {formatAdminDate(p.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(p)}
                              className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(p)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 border-t border-gray-50 text-xs text-gray-400">
                {filtered.length} project{filtered.length !== 1 ? 's' : ''}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {formOpen && (
        <AdminProjectForm
          project={editingProject}
          onSave={handleFormSave}
          onClose={() => { setFormOpen(false); setEditingProject(null) }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="font-bold text-gray-900 mb-2">Delete Project?</h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-700">"{deleteConfirm.title}"</span>?
              This will also remove all uploaded images. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
                className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminProjects
