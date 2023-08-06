"use client"

import { Hero } from "@/components/home/hero"
import { HowThisWorks } from "@/components/home/how-this-works"
import { Pricing } from "@/components/home/pricing"
import { Testimonials } from "@/components/home/testimonials"

export default function Home() {
  return (
    <div className="m-6 lg:container space-y-12">
      <Hero />
      <HowThisWorks />
      <Pricing />
      <Testimonials />
    </div>
  )
}
