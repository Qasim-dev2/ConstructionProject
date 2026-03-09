import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const projects = [
  {
    title: 'Modern Kitchen Renovation',
    location: 'Windsor, CA',
    category: 'Renovation',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  },
  {
    title: 'Luxury Bathroom Remodel',
    location: 'Leamington, CA',
    category: 'Bathroom',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
  },
  {
    title: 'Complete Home Build',
    location: 'Amherstburg, CA',
    category: 'Construction',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
  },
  {
    title: 'Basement Finishing',
    location: 'Chatham, CA',
    category: 'Renovation',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
  },
  {
    title: 'Commercial Office Build',
    location: 'Windsor, CA',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
  {
    title: 'Outdoor Deck & Patio',
    location: 'Leamington, CA',
    category: 'Outdoor',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  },
]

const ProjectsSection = ({ limit, showHeader = true }) => {
  const displayProjects = limit ? projects.slice(0, limit) : projects

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
          {displayProjects.map((project, index) => (
            <div
              key={index}
              className="project-card relative rounded-2xl overflow-hidden shadow-md group cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-72 object-cover transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="project-overlay absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex flex-col justify-end p-6">
                <span className="text-secondary text-xs font-semibold uppercase tracking-wider mb-1">
                  {project.category}
                </span>
                <h3 className="font-heading text-white text-xl font-semibold mb-1">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm">{project.location}</p>
              </div>
              {/* Always visible location badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-semibold">
                {project.location}
              </div>
            </div>
          ))}
        </div>

        {limit && (
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 bg-secondary text-white px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-red-600 transition-all duration-300"
            >
              <span>View All Projects</span>
              <FaArrowRight size={12} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export { projects }
export default ProjectsSection
