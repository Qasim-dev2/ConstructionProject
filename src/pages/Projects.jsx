import ProjectsSection from '../components/ProjectsSection'
import CTABanner from '../components/CTABanner'

const Projects = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80')`,
          }}
        ></div>
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Our Projects
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our portfolio of completed construction projects across Pakistan
          </p>
        </div>
      </section>

      {/* All Projects */}
      <ProjectsSection />

      {/* Testimonial Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary font-medium text-sm tracking-widest uppercase mb-3">
              What Our Clients Say
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              Client Testimonials
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ahmed Khan',
                role: 'Homeowner, DHA Lahore',
                text: "RECON Construction built our 10 Marla home in DHA with outstanding quality. The team was professional, punctual, and the craftsmanship exceeded our expectations. Highly recommended!",
                rating: 5,
              },
              {
                name: 'Usman Ali',
                role: 'Overseas Pakistani, UAE',
                text: "Being overseas, I was worried about managing construction remotely. RECON kept me updated at every stage and delivered a beautiful turn-key home in Bahria Town on time and within budget.",
                rating: 5,
              },
              {
                name: 'Fatima Rashid',
                role: 'Property Owner, Narowal',
                text: "Excellent renovation work on our family home. From plumbing to painting, every detail was handled with care. The quality of materials and workmanship is top-notch.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <span className="text-secondary font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-primary text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}

export default Projects
