import { useEffect, useState } from 'react'
import { FaEnvelope, FaUser, FaPhone, FaTrash, FaClock, FaCheckCircle } from 'react-icons/fa'
import AdminLayout from '../../components/admin/AdminLayout'
import { supabase } from '../../lib/supabase'

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedQuote, setSelectedQuote] = useState(null)

  const fetchQuotes = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching quotes:', error)
    } else {
      setQuotes(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this quote request?')) return

    const { error } = await supabase.from('contacts').delete().eq('id', id)

    if (error) {
      console.error('Error deleting quote:', error)
      alert('Failed to delete quote request')
    } else {
      fetchQuotes()
      setSelectedQuote(null)
    }
  }

  const handleMarkRead = async (id, currentStatus) => {
    const { error } = await supabase
      .from('contacts')
      .update({ read: !currentStatus })
      .eq('id', id)

    if (error) {
      console.error('Error updating quote:', error)
    } else {
      fetchQuotes()
      if (selectedQuote?.id === id) {
        setSelectedQuote({ ...selectedQuote, read: !currentStatus })
      }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <AdminLayout title="Quote Requests">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Quotes List */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">All Requests</h2>
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              {quotes.length}
            </span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-400 text-sm">Loading...</div>
          ) : quotes.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">
              No quote requests yet.
            </div>
          ) : (
            <div className="overflow-y-auto flex-1">
              {quotes.map((quote) => (
                <div
                  key={quote.id}
                  onClick={() => setSelectedQuote(quote)}
                  className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${
                    selectedQuote?.id === quote.id
                      ? 'bg-yellow-50 border-l-4 border-l-yellow-400'
                      : 'hover:bg-gray-50'
                  } ${!quote.read ? 'bg-blue-50/30' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 truncate">{quote.name}</p>
                        {!quote.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{quote.email}</p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{quote.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-400 mt-2">
                    <FaClock size={10} className="mr-1" />
                    {formatDate(quote.created_at)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quote Details */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          {selectedQuote ? (
            <>
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Quote Details</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMarkRead(selectedQuote.id, selectedQuote.read)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedQuote.read
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    <FaCheckCircle size={12} />
                    <span>{selectedQuote.read ? 'Mark Unread' : 'Mark Read'}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(selectedQuote.id)}
                    className="flex items-center space-x-1 bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  >
                    <FaTrash size={12} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <div className="space-y-6">
                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaUser className="text-gray-600" size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-medium">Name</p>
                        <p className="text-gray-900 font-medium mt-1">{selectedQuote.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaEnvelope className="text-gray-600" size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-medium">Email</p>
                        <a
                          href={`mailto:${selectedQuote.email}`}
                          className="text-blue-600 hover:underline mt-1 block break-all"
                        >
                          {selectedQuote.email}
                        </a>
                      </div>
                    </div>

                    {selectedQuote.phone && (
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FaPhone className="text-gray-600" size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-medium">Phone</p>
                          <a
                            href={`tel:${selectedQuote.phone}`}
                            className="text-blue-600 hover:underline mt-1 block"
                          >
                            {selectedQuote.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaClock className="text-gray-600" size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-medium">Submitted</p>
                        <p className="text-gray-900 font-medium mt-1">{formatDate(selectedQuote.created_at)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium mb-2">Message</p>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedQuote.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <FaEnvelope size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm">Select a quote request to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminQuotes
