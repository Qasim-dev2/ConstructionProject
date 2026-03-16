import { FaMapMarkerAlt, FaDirections } from 'react-icons/fa'

const OfficeSection = () => {
  return (
    <section className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium text-sm tracking-widest uppercase mb-3">
            Visit Us
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Office
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53800.0!2d74.87!3d32.10!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f2bb1e5e3d0a5%3A0x6c7b4a9c1d3e0f1a!2sNarowal%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2spk!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Office Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <h3 className="font-heading font-semibold text-2xl text-primary">
                Pakistan
              </h3>
            </div>
            <div className="flex items-start space-x-4 mb-6">
              <FaMapMarkerAlt className="text-secondary text-xl mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-700 font-medium">Narowal</p>
                <p className="text-gray-500">Punjab, Pakistan</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-gray-700 font-medium">Phone 1:</span>
              <a href="tel:+923220047310" className="text-secondary font-semibold hover:underline">
                0322-0047310
              </a>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-gray-700 font-medium">Phone 2:</span>
              <a href="tel:+923254049735" className="text-secondary font-semibold hover:underline">
                0325-4049735
              </a>
            </div>
            <a
              href="https://www.google.com/maps/search/Narowal+Punjab+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-secondary text-primary px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all duration-300"
            >
              <FaDirections />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OfficeSection
