import { Link } from 'react-router-dom'
import { FaLeaf, FaClock, FaMicrochip, FaPencilRuler } from 'react-icons/fa'

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                alt="Construction site"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-secondary text-primary p-6 rounded-2xl shadow-xl hidden md:block">
              <p className="font-heading text-4xl font-bold">EST.</p>
              <p className="text-sm mt-1 font-semibold">Since 2021</p>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <p className="text-secondary font-medium text-sm tracking-widest uppercase mb-3">
              About Us
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
              Building Trust & Premium Homes Across Pakistan
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Your dream home can become a reality with RECON Construction. Based in Narowal, Punjab,
              we serve clients across Pakistan including DHA, Bahria Town, and other premium housing
              societies. Your satisfaction is our top priority — we deliver customized designs,
              cost-effective solutions, and meticulous planning on every project.
            </p>

            {/* Best Practices */}
            <div className="mb-8">
              <h3 className="font-heading font-semibold text-lg text-primary mb-4">
                We Follow Best Practices
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: FaLeaf, text: 'Sustainability' },
                  { icon: FaClock, text: 'On-Time Delivery' },
                  { icon: FaMicrochip, text: 'Modern Technology' },
                  { icon: FaPencilRuler, text: 'Latest Designs' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-light"
                  >
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-secondary" size={18} />
                    </div>
                    <span className="text-sm font-medium text-primary">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-block bg-secondary text-primary px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
