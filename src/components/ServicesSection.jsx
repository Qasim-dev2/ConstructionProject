import { Link } from 'react-router-dom'
import { FaBolt, FaThermometerHalf, FaRuler, FaRoad, FaPaintRoller, FaWater, FaWind, FaTint, FaCity } from 'react-icons/fa'

const services = [
  {
    icon: FaBolt,
    title: 'Electricity',
    urduTitle: 'بجلی کا نظام',
    description: 'Complete electrical wiring and installation services. Safe, modern electrical systems with proper grounding and quality fittings for your home.',
    urduDesc: 'مکمل بجلی کی وائرنگ اور انسٹالیشن - محفوظ اور جدید نظام',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
  },
  {
    icon: FaThermometerHalf,
    title: 'Heat Insulation',
    urduTitle: 'حرارت سے بچاؤ',
    description: 'Professional thermal insulation solutions to keep your home comfortable year-round. Energy-efficient insulation for walls, roofs, and foundations.',
    urduDesc: 'پیشہ ورانہ ہیٹ انسولیشن - سال بھر آرام دہ گھر',
    image: 'https://i.ibb.co/3y59JLBD/thermal-insulating.png',
  },
  {
    icon: FaRuler,
    title: 'Cad Drawing & Construction Estimation',
    urduTitle: 'کیڈ ڈرائنگ اور تخمینہ',
    description: 'Professional CAD drawing services and accurate construction cost estimation. Detailed technical drawings with precise measurements and comprehensive project budgeting.',
    urduDesc: 'پیشہ ورانہ کیڈ ڈرائنگ اور درست تخمینہ - تعمیراتی منصوبوں کے لیے',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
  },
  {
    icon: FaRoad,
    title: 'Home Construction',
    urduTitle: 'گھر کی تعمیر',
    description: 'Complete home construction services from foundation to finishing. Professional project management, quality materials, and expert workmanship for your dream home.',
    urduDesc: 'مکمل گھر کی تعمیر - بنیاد سے ختم تک',
    image: 'https://i.ibb.co/Yx8Tzkr/wall.png',
  },
  {
    icon: FaPaintRoller,
    title: 'Paint/Ceiling Services',
    urduTitle: 'پینٹ/چھت کی خدمات',
    description: 'Professional painting and ceiling services with POP/Gypsum finishing. Transform your interiors with premium paint and elegant false ceiling designs for complete aesthetic enhancement.',
    urduDesc: 'پیشہ ورانہ پینٹ اور چھت کی خدمات - خوبصورت اندرونی ڈیزائن',
    image: 'https://i.ibb.co/vvXDSRrN/paint-ceiling-new.png',
  },
  {
    icon: FaWater,
    title: 'Sewerage & Drainage System',
    urduTitle: 'نکاسی آب کا نظام',
    description: 'Professional sewerage and drainage system installation. Proper waste management and water drainage solutions for healthy living.',
    urduDesc: 'پیشہ ورانہ نکاسی آب کا نظام - صحت مند زندگی کے لیے',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80',
  },
  {
    icon: FaWind,
    title: 'Heating, Ventilation and Air Conditioning',
    urduTitle: 'ہیٹنگ، وینٹیلیشن اور ایئر کنڈیشننگ',
    description: 'Complete HVAC solutions for residential and commercial projects. Professional installation and maintenance of heating, cooling, and ventilation systems for optimal comfort.',
    urduDesc: 'مکمل HVAC نظام - رہائشی اور تجارتی منصوبوں کے لیے',
    image: 'https://miamilakes.edu/wp-content/uploads/2016/09/AC-Repiar.jpg',
  },
  {
    icon: FaTint,
    title: 'Water Supply and Gas Pipelines',
    urduTitle: 'پانی کی فراہمی اور گیس پائپ لائن',
    description: 'Professional water supply and gas pipeline installation. Quality piping systems with proper safety measures and durable materials for long-lasting performance.',
    urduDesc: 'پیشہ ورانہ پانی اور گیس کی پائپ لائن - محفوظ اور پائیدار',
    image: 'https://rehmanengg.com/wp-content/uploads/2022/12/Workers-laid-water-system-pipeline-at-construction-site.jpg',
  },
  {
    icon: FaCity,
    title: 'Roads and Streets Construction',
    urduTitle: 'سڑکوں کی تعمیر',
    description: 'Expert road and street construction services. Quality paving, proper drainage, and durable surfaces for residential and commercial developments.',
    urduDesc: 'پیشہ ورانہ سڑکوں کی تعمیر - رہائشی اور تجارتی علاقوں کے لیے',
    image: 'https://www.procore.com/library/wp-content/uploads/2024/01/Road_Work_Construction.png',
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
