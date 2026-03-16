import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const CTABanner = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-accent/90"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Let's Build Your Dream Home Together
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
          Ready to start your next construction project? RECON Construction is committed to delivering
          exceptional results with quality craftsmanship across Pakistan.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center space-x-2 bg-secondary text-primary px-10 py-4 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30"
        >
          <span>Get In Touch</span>
          <FaArrowRight size={12} />
        </Link>
      </div>
    </section>
  )
}

export default CTABanner
