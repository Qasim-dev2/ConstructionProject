import { usePageMeta } from '../hooks/usePageMeta'
import { seoData } from '../constants/seoData'
import Hero from '../components/Hero'
import ServicesSection from '../components/ServicesSection'
import AboutSection from '../components/AboutSection'
import StatsSection from '../components/StatsSection'
import CTABanner from '../components/CTABanner'
import ProjectsSection from '../components/ProjectsSection'
import OfficeSection from '../components/OfficeSection'
import ContactForm from '../components/ContactForm'

const Home = () => {
  usePageMeta(seoData.home)

  return (
    <div>
      <Hero />
      <ServicesSection limit={3} />
      <AboutSection />
      <StatsSection />
      <CTABanner />
      <ProjectsSection limit={3} />
      <OfficeSection />
      <ContactForm />
    </div>
  )
}

export default Home
