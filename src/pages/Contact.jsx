import { usePageMeta } from '../hooks/usePageMeta'
import { seoData } from '../constants/seoData'
import ContactForm from '../components/ContactForm'
import OfficeSection from '../components/OfficeSection'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const Contact = () => {
  usePageMeta(seoData.contact)

  return (
    <div>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80')`,
          }}
        ></div>
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to start your project? Get in touch with us today
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-32 relative z-20">
            {[
              {
                icon: FaPhoneAlt,
                title: 'Call Us',
                info: '0322-0047310',
                link: 'tel:+923220047310',
              },
              {
                icon: FaEnvelope,
                title: 'Email Us',
                info: 'info@reconconstruction.pk',
                link: 'mailto:info@reconconstruction.pk',
              },
              {
                icon: FaMapMarkerAlt,
                title: 'Visit Us',
                info: 'Narowal, Punjab, Pakistan',
                link: '#',
              },
              {
                icon: FaClock,
                title: 'Working Hours',
                info: 'Mon - Sat: 8:00 AM - 5:00 PM',
                link: null,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-secondary" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-primary mb-2">{item.title}</h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-gray-600 text-sm hover:text-secondary transition-colors"
                  >
                    {item.info}
                  </a>
                ) : (
                  <p className="text-gray-600 text-sm">{item.info}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Office / Map */}
      <OfficeSection />
    </div>
  )
}

export default Contact
