import { useState } from 'react'
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane } from 'react-icons/fa'
import { supabase } from '../lib/supabase'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: supabaseError } = await supabase.from('contacts').insert([{
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    }])

    setLoading(false)

    if (supabaseError) {
      console.error('Supabase error:', supabaseError)
      setError(supabaseError.message || 'Something went wrong. Please try again.')
    } else {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', email: '', phone: '', message: '' })
      }, 3000)
    }
  }

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="text-secondary font-medium text-sm tracking-widest uppercase mb-3">
            Ready to Work Together?
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Request a Quote
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Build a project with us! Fill out the form and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-2">Thank You!</h3>
              <p className="text-gray-600">We've received your message and will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
                {/* Email */}
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message *"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all resize-none"
                ></textarea>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-secondary text-primary px-10 py-4 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <FaPaperPlane />
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactForm
