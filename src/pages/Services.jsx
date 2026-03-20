import { usePageMeta } from '../hooks/usePageMeta'
import { seoData } from '../constants/seoData'
import ServicesSection from '../components/ServicesSection'
import CTABanner from '../components/CTABanner'
import { FaCheckCircle } from 'react-icons/fa'

const Services = () => {
  usePageMeta(seoData.services)

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
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">
            Our Services
          </h1>
          <p className="text-secondary text-2xl font-bold mb-4" style={{ fontFamily: 'Noto Nastaliq Urdu, serif', direction: 'rtl' }}>
            ہماری خدمات
          </p>
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
                Why Choose Us | ہمیں کیوں منتخب کریں
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2 leading-tight">
                Quality Craftsmanship You Can Trust
              </h2>
              <p className="text-secondary text-xl font-semibold mb-4" style={{ fontFamily: 'Noto Nastaliq Urdu, serif', direction: 'rtl' }}>
                معیاری کاریگری جس پر آپ بھروسہ کر سکتے ہیں
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                At RECON Construction, we believe in delivering excellence in every project.
                Our commitment to quality, transparency, and customer satisfaction sets us apart
                from the rest. Serving across Narowal, Lahore, DHA, Bahria Town and all of Punjab.
              </p>
              <div className="space-y-4">
                {[
                  { en: 'Free Consultation & Estimates', ur: 'مفت مشاورت اور تخمینہ' },
                  { en: 'Experienced & Skilled Team', ur: 'تجربہ کار اور ماہر ٹیم' },
                  { en: 'Premium Quality Materials', ur: 'اعلیٰ معیار کا مواد' },
                  { en: 'Transparent Pricing', ur: 'شفاف قیمتیں' },
                  { en: '100% Satisfaction Guarantee', ur: '100٪ اطمینان کی ضمانت' },
                  { en: 'Post-Project Support', ur: 'منصوبے کے بعد سپورٹ' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <FaCheckCircle className="text-secondary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <span className="text-gray-700 font-medium block">{item.en}</span>
                      <span className="text-secondary text-sm" style={{ fontFamily: 'Noto Nastaliq Urdu, serif', direction: 'rtl' }}>
                        {item.ur}
                      </span>
                    </div>
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
