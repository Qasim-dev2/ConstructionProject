import { useState, useEffect } from 'react'
import { FaTimes, FaUpload, FaTrash } from 'react-icons/fa'
import { supabase } from '../../lib/supabase'

const CATEGORIES = ['Residential', 'Commercial', 'Renovation', 'Grey Structure', 'Turn Key', 'Industrial']

const AdminProjectForm = ({ project, onSave, onClose }) => {
  const isEdit = Boolean(project)
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    category: 'Residential',
    project_type: 'regular',
    status: 'completed',
  })
  const [mainImageFile, setMainImageFile] = useState(null)
  const [mainImagePreview, setMainImagePreview] = useState('')
  const [extraFiles, setExtraFiles] = useState([])
  const [extraPreviews, setExtraPreviews] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || '',
        description: project.description || '',
        location: project.location || '',
        category: project.category || 'Residential',
        project_type: project.project_type || 'regular',
        status: project.status || 'completed',
      })
      setMainImagePreview(project.main_image_url || '')
      setExtraPreviews(project.images || [])
    }
  }, [project])

  const handleField = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleMainImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setMainImageFile(file)
    setMainImagePreview(URL.createObjectURL(file))
  }

  const handleExtraImages = (e) => {
    const files = Array.from(e.target.files)
    setExtraFiles(prev => [...prev, ...files])
    const previews = files.map(f => URL.createObjectURL(f))
    setExtraPreviews(prev => [...prev, ...previews])
  }

  const removeExtraImage = (index) => {
    setExtraFiles(prev => prev.filter((_, i) => i !== (index - (isEdit ? (project.images || []).length : 0))))
    setExtraPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const uploadImage = async (file) => {
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filename, file, { upsert: false })
    if (uploadError) throw uploadError
    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(filename)
    return publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Title is required.'); return }
    setSaving(true)
    setError('')

    try {
      // Upload main image if new file selected
      let mainImageUrl = isEdit ? project.main_image_url : ''
      if (mainImageFile) {
        mainImageUrl = await uploadImage(mainImageFile)
      }

      // Upload extra images (only new files, existing URLs from project.images stay)
      const existingExtraUrls = isEdit ? (project.images || []) : []
      const newExtraUrls = []
      for (const file of extraFiles) {
        const url = await uploadImage(file)
        newExtraUrls.push(url)
      }
      const allExtraUrls = [...existingExtraUrls, ...newExtraUrls]
        // Remove ones that were removed from previews
        .filter(url => extraPreviews.some(p => p === url || p.startsWith('blob:')))

      // Actually filter to only keep the ones still in extraPreviews (non-blob = existing URLs)
      const keptExisting = existingExtraUrls.filter(url => extraPreviews.includes(url))
      const finalImages = [...keptExisting, ...newExtraUrls]

      const payload = {
        ...form,
        main_image_url: mainImageUrl,
        images: finalImages,
        updated_at: new Date().toISOString(),
      }

      let result
      if (isEdit) {
        result = await supabase.from('projects').update(payload).eq('id', project.id).select().single()
      } else {
        result = await supabase.from('projects').insert(payload).select().single()
      }

      if (result.error) throw result.error
      onSave(result.data)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-end">
      <div className="w-full max-w-xl bg-white h-full overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-bold text-gray-900 text-lg">
            {isEdit ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={e => handleField('title', e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="e.g. 10 Marla Luxury Home – DHA Lahore"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={e => handleField('description', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors resize-none"
              placeholder="Brief description of the project..."
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={e => handleField('location', e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="e.g. DHA Lahore, Bahria Town Narowal"
            />
          </div>

          {/* Category + Status row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={e => handleField('category', e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors bg-white"
              >
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={e => handleField('status', e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors bg-white"
              >
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
              </select>
            </div>
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
            <div className="flex space-x-4">
              {[
                { value: 'featured', label: 'Featured', desc: 'Shown prominently on homepage' },
                { value: 'regular', label: 'Regular', desc: 'Shown in projects section' },
              ].map(opt => (
                <label
                  key={opt.value}
                  className={`flex-1 border-2 rounded-xl p-3 cursor-pointer transition-all ${
                    form.project_type === opt.value
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="project_type"
                    value={opt.value}
                    checked={form.project_type === opt.value}
                    onChange={() => handleField('project_type', opt.value)}
                    className="sr-only"
                  />
                  <p className="font-semibold text-sm text-gray-900">{opt.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                </label>
              ))}
            </div>
          </div>

          {/* Main Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Main Image</label>
            {mainImagePreview ? (
              <div className="relative">
                <img
                  src={mainImagePreview}
                  alt="Main"
                  className="w-full h-48 object-cover rounded-xl border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => { setMainImageFile(null); setMainImagePreview('') }}
                  className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <FaTrash size={10} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-yellow-400 transition-colors bg-gray-50">
                <FaUpload className="text-gray-400 mb-2" size={20} />
                <p className="text-sm text-gray-500">Click to upload main image</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP</p>
                <input type="file" accept="image/*" onChange={handleMainImage} className="hidden" />
              </label>
            )}
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Additional Images <span className="text-gray-400 font-normal">(before/after/progress)</span>
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {extraPreviews.map((preview, i) => (
                <div key={i} className="relative">
                  <img
                    src={preview}
                    alt={`Extra ${i + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeExtraImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <FaTimes size={8} />
                  </button>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors bg-gray-50">
                <FaUpload className="text-gray-400" size={14} />
                <p className="text-xs text-gray-400 mt-1">Add more</p>
                <input type="file" accept="image/*" multiple onChange={handleExtraImages} className="hidden" />
              </label>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-2 sticky bottom-0 bg-white pb-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-gray-900 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                  <span>Saving...</span>
                </span>
              ) : isEdit ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminProjectForm
