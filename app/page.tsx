import BetaBanner from '@/components/landing/BetaBanner'
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import InteractiveDemo from '@/components/landing/InteractiveDemo'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <BetaBanner />
      <Navbar />
      <Hero />
      <HowItWorks />
      <InteractiveDemo />
      <Footer />
    </div>
  )
}