import Link from "next/link"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function Pricing() {
  return (
    <section className="lg:container flex flex-col gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="text-center lg:text-left mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-4xl leading-[1.1] lg:text-5xl font-extrabold">
          Pricing Plan
        </h2>
        <p className="lg:max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Unlock all features including unlimited graphs for your learning
          journey.
        </p>
      </div>
      <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl">
            What&apos;s included in the PRO plan
          </h3>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> Unlimited Graphs
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> Unlimited Quizzes
            </li>

            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> Prioritized Generation
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> GPT-4
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> Access to Discord
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4" /> Direct, Premium Support
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h4 className="text-5xl lg:text-7xl font-bold">$0</h4>
            <p className="text-sm font-medium text-muted-foreground">
              Billed Monthly
            </p>
          </div>
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="leading-normal text-muted-foreground sm:leading-7">
          Since Qal.AI is in early development stage, we are offering all
          features for free until we figure out the suitable pricing plan.
        </p>
      </div>
    </section>
  )
}
