/**
 * Date formatting utilities for the admin panel
 * Centralized date formatting to ensure consistency across components
 */

/**
 * Format date for admin listings (short format)
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatAdminDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-PK')
}

/**
 * Format date with time for detailed views
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string with time
 */
export const formatDetailedDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}