import Link from "next/link"

import { siteConfig } from "@/config/site"

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden text-xl font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  )
}
