import { FaLeaf, FaClock, FaMicrochip, FaPencilRuler, FaCheckCircle } from 'react-icons/fa'
import { usePageMeta } from '../hooks/usePageMeta'
import { seoData } from '../constants/seoData'
import StatsSection from '../components/StatsSection'
import CTABanner from '../components/CTABanner'

const About = () => {
  usePageMeta(seoData.about)

  return (
    <div>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80')`,
          }}
        ></div>
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            About Us
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Learn more about RECON Construction and our commitment to excellence
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80"
                    alt="Construction"
                    className="rounded-2xl h-64 w-full object-cover shadow-lg"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&q=80"
                    alt="Flooring"
                    className="rounded-2xl h-48 w-full object-cover shadow-lg"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1DEcUxmIaHNPM7NxHzW1owmAjd-UfCUx_wQ&s"
                    alt="Architecture"
                    className="rounded-2xl h-48 w-full object-cover shadow-lg"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=80"
                    alt="Interior"
                    className="rounded-2xl h-64 w-full object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-secondary font-medium text-sm tracking-widest uppercase mb-3">
                Who We Are
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                Building Trust Across Pakistan Since 2021
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Your dream home can become a reality with RECON Construction. Based in Narowal, Punjab,
                we serve clients across Pakistan — from DHA and Bahria Town to Citi Housing and beyond.
                Your satisfaction is our top priority.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We take pride in delivering projects on time and within budget, using the latest
                technology and sustainable practices. Our team of experienced professionals ensures
                every detail meets the highest standards of quality.
              </p>

              {/* Checklist */}
              <div className="space-y-3 mb-8">
                {[
                  'Licensed & Insured Professionals',
                  'Customized Design Solutions',
                  'Cost-Effective Planning',
                  'Quality Materials & Workmanship',
                  'On-Time Project Delivery',
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <FaCheckCircle className="text-secondary flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary font-medium text-sm tracking-widest uppercase mb-3">
              Our Approach
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              We Follow Best Practices
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaLeaf,
                title: 'Sustainability',
                desc: 'Eco-friendly materials and sustainable building practices for a greener future.',
              },
              {
                icon: FaClock,
                title: 'Project On Time',
                desc: 'We deliver every project on schedule without compromising quality.',
              },
              {
                icon: FaMicrochip,
                title: 'Modern Technology',
                desc: 'Using cutting-edge tools and techniques for precision and efficiency.',
              },
              {
                icon: FaPencilRuler,
                title: 'Latest Designs',
                desc: 'Contemporary designs that blend style, function, and innovation.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="text-secondary" size={28} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Messages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-secondary font-medium text-sm tracking-widest uppercase mb-3">
              Leadership Vision
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              Message From Our Leaders
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* CEO Message */}
            <div className="bg-primary/5 rounded-2xl p-10 border-l-4 border-secondary">
              <div className="mb-6">
                <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                  Engr. M. Jahanzaib Iftikhar
                </h3>
                <p className="text-secondary font-semibold text-sm uppercase tracking-wide">CEO's Message</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                The construction landscape is evolving rapidly, and at RECON CONSTRUCTION, we are leading that change. By embracing advanced technologies and sustainable practices, we deliver smart solutions to complex infrastructure challenges. Our goal is to 'Build a Better Future Together' by providing innovative services that exceed client expectations while positively impacting the communities we serve. I invite you to join us on this journey of growth and transformation.
              </p>
            </div>

            {/* President Message */}
            <div className="bg-primary/5 rounded-2xl p-10 border-l-4 border-secondary">
              <div className="mb-6">
                <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                  Iftikhar Ahmad Rajpoot
                </h3>
                <p className="text-secondary font-semibold text-sm uppercase tracking-wide">President's Message</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                At RECON CONSTRUCTION, we don't just build structures; we build the future. In an era where the construction landscape is rapidly evolving, our mission is to lead through innovation and sustainable practices. We are committed to delivering exceptional value to our clients by integrating state-of-the-art technology with time-tested craftsmanship.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our strength lies in our people—a dedicated team of architects, engineers, and specialists who share a relentless focus on excellence. Together, we are transforming challenges into landmark achievements, ensuring that every project we undertake leaves a positive, lasting impact on the communities we serve. Thank you for trusting us to bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <CTABanner />
    </div>
  )
}

export default About
