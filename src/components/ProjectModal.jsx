import { useEffect } from 'react'
import { FaTimes, FaMapMarkerAlt, FaTag, FaCalendar } from 'react-icons/fa'
import ImageSlider from './ImageSlider'

const ProjectModal = ({ project, isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  // Parse gallery images
  const galleryImages = project.gallery_images || project.images || []
  const imageArray = Array.isArray(galleryImages) ? galleryImages : [galleryImages].filter(Boolean)

  const allImages = project.main_image_url
    ? [project.main_image_url, ...imageArray]
    : imageArray

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-all duration-300"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>

        {/* Image Slider */}
        <ImageSlider
          images={allImages}
          autoPlayInterval={4000}
          className="w-full h-96"
        />

        {/* Project Details */}
        <div className="p-8">
          {/* Title & Category */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <FaTag className="text-secondary" size={14} />
              <span className="text-secondary text-sm font-semibold uppercase tracking-wider">
                {project.category}
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-3">
              {project.title}
            </h2>
            {project.description && (
              <p className="text-gray-600 text-base leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {project.location && (
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4">
                <FaMapMarkerAlt className="text-secondary" size={18} />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Location</p>
                  <p className="text-primary font-semibold">{project.location}</p>
                </div>
              </div>
            )}
            {project.status && (
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4">
                <FaCalendar className="text-secondary" size={18} />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Status</p>
                  <p className="text-primary font-semibold capitalize">
                    {project.status === 'in_progress' ? 'In Progress' : 'Completed'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Additional Details */}
          {project.details && (
            <div className="border-t pt-6">
              <h3 className="font-heading text-xl font-bold text-primary mb-4">
                Project Details
              </h3>
              <div className="prose prose-sm max-w-none text-gray-600">
                {project.details}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
