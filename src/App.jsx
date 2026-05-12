import Nav from './components/Nav'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import HowItWorks from './components/HowItWorks'
import Zones from './components/Zones'
import Menu from './components/Menu'
import Partnerships from './components/Partnerships'
import Discount from './components/Discount'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Zones />
      <Menu />
      <Partnerships />
      <Discount />
      <CTASection />
      <Footer />
    </div>
  )
}
