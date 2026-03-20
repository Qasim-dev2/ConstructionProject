import { useEffect } from 'react'

/**
 * Custom hook to update page meta tags for SEO
 * Works with React Router for SPA pages
 */
export const usePageMeta = (pageData) => {
  useEffect(() => {
    // Update page title
    if (pageData.title) {
      document.title = pageData.title
    }

    // Update meta description
    const descMeta = document.querySelector('meta[name="description"]')
    if (descMeta && pageData.description) {
      descMeta.setAttribute('content', pageData.description)
    }

    // Update meta keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]')
    if (keywordsMeta && pageData.keywords) {
      keywordsMeta.setAttribute('content', pageData.keywords)
    }

    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    if (canonicalLink && pageData.url) {
      canonicalLink.setAttribute('href', pageData.url)
    }

    // Update Open Graph tags
    if (pageData.ogTitle) {
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.setAttribute('content', pageData.ogTitle)
    }

    if (pageData.ogDescription) {
      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) ogDesc.setAttribute('content', pageData.ogDescription)
    }

    if (pageData.ogImage) {
      const ogImage = document.querySelector('meta[property="og:image"]')
      if (ogImage) ogImage.setAttribute('content', pageData.ogImage)
    }

    if (pageData.ogUrl) {
      const ogUrl = document.querySelector('meta[property="og:url"]')
      if (ogUrl) ogUrl.setAttribute('content', pageData.ogUrl)
    }

    // Update Twitter Card tags
    if (pageData.twitterTitle) {
      const twitterTitle = document.querySelector('meta[name="twitter:title"]')
      if (twitterTitle) twitterTitle.setAttribute('content', pageData.twitterTitle)
    }

    if (pageData.twitterDescription) {
      const twitterDesc = document.querySelector('meta[name="twitter:description"]')
      if (twitterDesc) twitterDesc.setAttribute('content', pageData.twitterDescription)
    }

    // Scroll to top for better UX
    window.scrollTo(0, 0)
  }, [pageData])
}
