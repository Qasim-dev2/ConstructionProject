import { Link } from 'react-router-dom'
import { FaWrench, FaHammer, FaPaintRoller, FaLayerGroup, FaHome, FaBath } from 'react-icons/fa'

const services = [
  {
    icon: FaWrench,
    title: 'Plumbing',
    description: 'Our expert plumbing services ensure a leak-free and smoothly functioning home, addressing all your plumbing needs with precision and care.',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80',
  },
  {
    icon: FaHammer,
    title: 'Framing',
    description: 'Expert framing services lay the foundation for your dream space, ensuring structural integrity and design cohesion in every corner of your home.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  },
  {
    icon: FaPaintRoller,
    title: 'Painting',
    description: 'Transform your space with our professional painting services, bringing vibrant colors and a fresh new look to any room.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80',
  },
  {
    icon: FaLayerGroup,
    title: 'Flooring',
    description: 'Elevate your space with our elegant flooring services. From hardwood to tile, we bring beauty and durability underfoot.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&q=80',
  },
  {
    icon: FaHome,
    title: 'Home Renovation',
    description: 'From flooring and framing to stunning bathroom makeovers and basement renovations, we\'re your one-stop solution for creating the home of your dreams.',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
  },
  {
    icon: FaBath,
    title: 'Bathroom Makeover',
    description: 'Experience a complete bathroom transformation with our expert makeover services. From modern fixtures to stunning tile work.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
  },
]

const ServicesSection = ({ limit, showHeader = true }) => {
  const displayServices = limit ? services.slice(0, limit) : services

  return (
    <section className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-16">
            <p className="text-secondary font-medium text-sm tracking-widest uppercase mb-3">
              Build Your Dream
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              Quality Services
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => (
            <div
              key={index}
              className="service-card bg-white rounded-2xl overflow-hidden shadow-md group"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              {/* Content */}
              <div className="p-6">
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors duration-300">
                  <service.icon className="text-secondary group-hover:text-white transition-colors duration-300" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-xl text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {limit && (
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-block bg-secondary text-white px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-red-600 transition-all duration-300"
            >
              View All Services
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export { services }
export default ServicesSection
