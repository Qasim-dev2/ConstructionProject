import { FaWhatsapp } from 'react-icons/fa'

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/923086067607?text=Hi%20RECON%20Construction%2C%20I%20am%20interested%20in%20your%20construction%20and%20maintenance%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  )
}

export default WhatsAppButton
