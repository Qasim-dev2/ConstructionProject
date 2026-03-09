import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-heading">JHR</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg leading-tight">JHR 01</h3>
                <p className="text-gray-400 text-xs -mt-1">Construction</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your ideal home can become a reality with JHR 01 Construction. Your wellbeing 
              and contentment are our top priorities, and we do this by providing customized 
              design, cost-effective solutions, and meticulous planning.
            </p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <FaClock className="text-secondary" />
              <span>Mon - Sat 8:00 - 18:00, Sunday - CLOSED</span>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {['Plumbing', 'Framing', 'Painting', 'Flooring', 'Home Renovation', 'Bathroom Makeover'].map(
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
            <h4 className="font-heading font-semibold text-lg mb-6">Office in Canada</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-secondary mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  1909 Dominion Blvd Windsor, ON N9B 3H8
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-secondary flex-shrink-0" />
                <a href="tel:+12267597402" className="text-gray-400 text-sm hover:text-secondary transition-colors">
                  +1 (226) 759 7402
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-secondary flex-shrink-0" />
                <a href="mailto:info@jhr01construction.ca" className="text-gray-400 text-sm hover:text-secondary transition-colors">
                  info@jhr01construction.ca
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              {[
                { icon: FaFacebookF, link: '#' },
                { icon: FaTwitter, link: '#' },
                { icon: FaInstagram, link: '#' },
                { icon: FaLinkedinIn, link: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
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
              Copyright &copy; {new Date().getFullYear()} JHR 01 Construction. All rights reserved.
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
