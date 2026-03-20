import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaStar, FaImage } from 'react-icons/fa'
import { supabase } from '../lib/supabase'
import ProjectModal from './ProjectModal'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80'

const ProjectCard = ({ project, onClick }) => (
  <div
    className="project-card relative rounded-2xl overflow-hidden shadow-md group cursor-pointer"
    onClick={() => onClick(project)}
  >
    <img
      src={project.main_image_url || FALLBACK_IMAGE}
      alt={project.title}
      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
    />
    {/* Overlay */}
    <div className="project-overlay absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex flex-col justify-end p-6">
      <span className="text-secondary text-xs font-semibold uppercase tracking-wider mb-1">
        {project.category}
      </span>
      <h3 className="font-heading text-white text-xl font-semibold mb-1">
        {project.title}
      </h3>
      {project.description && (
        <p className="text-gray-300 text-xs leading-relaxed line-clamp-2 mb-1">
          {project.description}
        </p>
      )}
      <p className="text-gray-300 text-sm">{project.location}</p>
    </div>
    {/* Location badge */}
    {project.location && (
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-semibold">
        {project.location}
      </div>
    )}
    {/* Status badge */}
    {project.status === 'in_progress' && (
      <div className="absolute top-4 left-4 bg-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
        In Progress
      </div>
    )}
  </div>
)

const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden shadow-md animate-pulse">
    <div className="w-full h-72 bg-gray-200"></div>
  </div>
)

const ProjectsSection = ({ limit, showHeader = true }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      setProjects(data || [])
      setLoading(false)
    }
    fetchProjects()
  }, [])

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const featured = projects.filter(p => p.project_type === 'featured')
  const regular = projects.filter(p => p.project_type === 'regular')

  // On homepage (limit prop), show latest `limit` projects (mixed)
  const homepageProjects = limit ? projects.slice(0, limit) : []

  if (limit) {
    // Homepage view — simple grid, latest N projects
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showHeader && (
            <div className="text-center mb-16">
              <p className="text-secondary font-medium text-sm tracking-widest uppercase mb-3">
                Our Portfolio
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
                Our Latest Works
              </h2>
              <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? Array(limit).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : homepageProjects.length === 0
              ? (
                <div className="col-span-3 text-center py-16 text-gray-400">
                  <FaImage className="mx-auto mb-3" size={32} />
                  <p>No projects added yet. Check back soon.</p>
                </div>
              )
              : homepageProjects.map(p => <ProjectCard key={p.id} project={p} onClick={handleProjectClick} />)
            }
          </div>

          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 bg-secondary text-primary px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all duration-300"
            >
              <span>View All Projects</span>
              <FaArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </section>
    )
  }

  // Full projects page view — separate featured and regular
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <>
            <div className="text-center mb-16">
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-3 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </>
        ) : projects.length === 0 ? (
          <div className="text-center py-24">
            <FaImage className="text-gray-300 mx-auto mb-4" size={48} />
            <h3 className="text-gray-500 text-lg font-medium mb-2">No projects yet</h3>
            <p className="text-gray-400 text-sm">Projects will appear here once added.</p>
          </div>
        ) : (
          <>
            {/* Featured Projects */}
            {featured.length > 0 && (
              <div className="mb-20">
                <div className="text-center mb-16">
                  <p className="text-secondary font-medium text-sm tracking-widest uppercase mb-3 flex items-center justify-center space-x-2">
                    <FaStar size={12} />
                    <span>Featured Work</span>
                  </p>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
                    Signature Projects
                  </h2>
                  <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featured.map(p => <ProjectCard key={p.id} project={p} onClick={handleProjectClick} />)}
                </div>
              </div>
            )}

            {/* Regular Projects */}
            {regular.length > 0 && (
              <div>
                <div className="text-center mb-16">
                  <p className="text-secondary font-medium text-sm tracking-widest uppercase mb-3">
                    Our Portfolio
                  </p>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
                    {featured.length > 0 ? 'More Projects' : 'All Projects'}
                  </h2>
                  <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regular.map(p => <ProjectCard key={p.id} project={p} onClick={handleProjectClick} />)}
                </div>
              </div>
            )}

            {/* If only featured, no need for separate header */}
            {regular.length === 0 && featured.length === 0 && null}
          </>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}

export default ProjectsSection
