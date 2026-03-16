import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-secondary font-medium text-sm md:text-base tracking-widest uppercase mb-4 animate-fadeInUp">
          Construction & Maintenance Services
        </p>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          RECON
          <span className="block text-secondary">Construction</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          Building premium homes with precision, quality, and dedication across
          Narowal, DHA, Bahria Town, and all over Punjab, Pakistan.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <Link
            to="/services"
            className="bg-secondary text-primary px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30"
          >
            Our Services
          </Link>
          <Link
            to="/contact"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-white hover:text-primary transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
