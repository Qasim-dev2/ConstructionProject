import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'

const TopBar = () => {
  return (
    <div className="bg-primary text-white text-sm hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Contact Info */}
          <div className="flex items-center space-x-6">
            <a href="tel:+923220047310" className="flex items-center space-x-2 hover:text-secondary transition-colors">
              <FaPhoneAlt size={12} />
              <span>0322-0047310</span>
            </a>
            <a href="tel:+923254049735" className="flex items-center space-x-2 hover:text-secondary transition-colors">
              <FaPhoneAlt size={12} />
              <span>0325-4049735</span>
            </a>
            <a href="mailto:info@reconconstruction.pk" className="flex items-center space-x-2 hover:text-secondary transition-colors">
              <FaEnvelope size={12} />
              <span>info@reconconstruction.pk</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <a href="#" className="hover:text-secondary transition-colors"><FaFacebookF size={14} /></a>
            <a href="#" className="hover:text-secondary transition-colors"><FaInstagram size={14} /></a>
            <a href="#" className="hover:text-secondary transition-colors"><FaLinkedinIn size={14} /></a>
            <a href="https://wa.me/923220047310" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors"><FaWhatsapp size={14} /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
