import { Link } from 'react-router-dom'
import { FaWrench, FaBuilding, FaPaintRoller, FaLayerGroup, FaHome, FaBath, FaHardHat } from 'react-icons/fa'

const services = [
  {
    icon: FaHardHat,
    title: 'Complete Home Construction',
    urduTitle: 'مکمل گھر کی تعمیر',
    description: 'From foundation to finishing - complete turnkey home construction services. Grey structure to final handover, we handle everything for your dream home.',
    urduDesc: 'بنیاد سے لے کر مکمل تیاری تک - ٹرن کی گھر کی تعمیر کی خدمات۔ گرے سٹرکچر سے لے کر آخری حوالگی تک',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
  },
  {
    icon: FaBuilding,
    title: 'Iron Concrete Designing',
    urduTitle: 'لوہے اور کنکریٹ کا ڈیزائن',
    description: 'Expert reinforced concrete structure design and construction. Strong, durable RCC work including columns, beams, slabs and foundations.',
    urduDesc: 'ماہرانہ مضبوط کنکریٹ ڈھانچے کی ڈیزائننگ اور تعمیر۔ مضبوط آر سی سی کام',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  },
  {
    icon: FaWrench,
    title: 'Plumbing',
    urduTitle: 'پلمبنگ',
    description: 'Expert plumbing services ensuring leak-free and smoothly functioning homes. We handle all plumbing needs with precision across Narowal and Punjab.',
    urduDesc: 'ماہرانہ پلمبنگ کی خدمات - نارووال اور پنجاب بھر میں',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80',
  },
  {
    icon: FaPaintRoller,
    title: 'Painting',
    urduTitle: 'پینٹنگ',
    description: 'Transform your space with our professional painting services, bringing vibrant colors and premium finishes to homes across Pakistan.',
    urduDesc: 'پیشہ ورانہ پینٹنگ کی خدمات - پاکستان بھر میں',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80',
  },
  {
    icon: FaLayerGroup,
    title: 'Flooring',
    urduTitle: 'فرش کی تعمیر',
    description: 'Elevate your space with elegant flooring solutions — from marble and tiles to hardwood, we bring beauty and durability underfoot.',
    urduDesc: 'سنگ مرمر، ٹائلز اور لکڑی کے فرش - خوبصورتی اور مضبوطی',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&q=80',
  },
  {
    icon: FaHome,
    title: 'Home Renovation',
    urduTitle: 'گھر کی تزئین نو',
    description: 'Complete home renovation services — from grey structure to turn-key finish. Your one-stop solution for creating the home of your dreams.',
    urduDesc: 'مکمل گھر کی تزئین نو - گرے سٹرکچر سے ٹرن کی تکمیل تک',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
  },
  {
    icon: FaBath,
    title: 'Bathroom Makeover',
    urduTitle: 'باتھ روم کی تزئین',
    description: 'Experience a complete bathroom transformation with expert makeover services. Modern fixtures, stunning tile work, and premium finishes.',
    urduDesc: 'باتھ روم میں مکمل تبدیلی - جدید فٹنگ اور پریمیم ختم',
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
              Build Your Dream | اپنا خواب بنائیں
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
              Quality Services
            </h2>
            <p className="text-secondary text-lg font-semibold mb-4 urdu-text">
              معیاری خدمات
            </p>
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
                  <service.icon className="text-secondary group-hover:text-primary transition-colors duration-300" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-xl text-primary mb-1">
                  {service.title}
                </h3>
                <p className="text-secondary text-xs font-medium mb-3 urdu-text">
                  {service.urduTitle}
                </p>
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
              className="inline-block bg-secondary text-primary px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all duration-300"
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
