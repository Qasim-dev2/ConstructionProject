import { Link } from 'react-router-dom'
import { FaFacebookF, FaWhatsapp, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img
                src="/logo-new.png"
                alt="RECON Construction"
                className="h-16 w-auto mb-2"
              />
              <p className="text-secondary text-xs font-semibold tracking-widest uppercase">
                Established 2021
              </p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your dream home can become a reality with RECON Construction. Based in Narowal, Punjab,
              we deliver customized designs, cost-effective solutions, and meticulous planning across Pakistan.
            </p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <FaClock className="text-secondary" />
              <span>Mon - Sat 8:00 AM - 5:00 PM, Sunday - CLOSED</span>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {['Complete Home Construction', 'Iron Concrete Designing', 'Plumbing', 'Painting', 'Flooring', 'Home Renovation'].map(
                (service) => (
                  <li key={service}>
                    <Link
                      to="/services"
                      className="text-gray-400 text-sm hover:text-secondary transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                      <span>{service}</span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Projects', path: '/projects' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-secondary transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Office in Pakistan</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-secondary mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Narowal, Punjab, Pakistan
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-secondary flex-shrink-0" />
                <a href="tel:+923220047310" className="text-gray-400 text-sm hover:text-secondary transition-colors">
                  0322-0047310
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-secondary flex-shrink-0" />
                <a href="tel:+923254049735" className="text-gray-400 text-sm hover:text-secondary transition-colors">
                  0325-4049735
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-secondary flex-shrink-0" />
                <a href="mailto:info@reconconstruction.pk" className="text-gray-400 text-sm hover:text-secondary transition-colors">
                  info@reconconstruction.pk
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              {[
                { icon: FaFacebookF, link: '#' },
                { icon: FaWhatsapp, link: 'https://wa.me/923220047310' },
                { icon: FaInstagram, link: '#' },
                { icon: FaLinkedinIn, link: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target={social.link !== '#' ? '_blank' : undefined}
                  rel={social.link !== '#' ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-500 text-sm">
              Copyright &copy; 2021 RECON Construction. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 text-sm hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 text-sm hover:text-secondary transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
