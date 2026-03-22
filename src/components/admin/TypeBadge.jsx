/**
 * TypeBadge component for displaying project type indicators
 */

const TypeBadge = ({ type }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
    type === 'featured'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-blue-100 text-blue-700'
  }`}>
    {type === 'featured' ? 'Featured' : 'Regular'}
  </span>
)

export default TypeBadge