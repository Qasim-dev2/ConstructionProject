import { FaHardHat, FaAward, FaUsers, FaProjectDiagram } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'

const stats = [
  { icon: FaHardHat, number: 150, suffix: '+', label: 'Projects Completed' },
  { icon: FaAward, number: 10, suffix: '+', label: 'Years Experience' },
  { icon: FaUsers, number: 200, suffix: '+', label: 'Happy Clients' },
  { icon: FaProjectDiagram, number: 50, suffix: '+', label: 'Active Projects' },
]

const CounterAnimation = ({ target, suffix }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl font-bold text-white">
      {count}{suffix}
    </span>
  )
}

const StatsSection = () => {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-secondary" size={28} />
              </div>
              <CounterAnimation target={stat.number} suffix={stat.suffix} />
              <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
