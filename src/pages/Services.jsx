import ServicesSection from '../components/ServicesSection'
import CTABanner from '../components/CTABanner'
import { FaCheckCircle } from 'react-icons/fa'

const Services = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')`,
          }}
        ></div>
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Professional construction services tailored to your needs
          </p>
        </div>
      </section>

      {/* All Services */}
      <ServicesSection />

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-secondary font-medium text-sm tracking-widest uppercase mb-3">
                Why Choose Us
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                Quality Craftsmanship You Can Trust
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                At RECON Construction, we believe in delivering excellence in every project.
                Our commitment to quality, transparency, and customer satisfaction sets us apart
                from the rest.
              </p>
              <div className="space-y-4">
                {[
                  'Free Consultation & Estimates',
                  'Licensed & Insured Team',
                  'Premium Quality Materials',
                  'Transparent Pricing',
                  '100% Satisfaction Guarantee',
                  'Post-Project Support',
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <FaCheckCircle className="text-secondary flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Quality Construction"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}

export default Services
