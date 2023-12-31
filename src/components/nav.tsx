"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"

import { CommandMenu } from "./command-menu"
import { Icons } from "./icons"
import { SignInButton } from "./sign-in-button"

export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo width={24} height={24} />
            <span className="text-lg font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-3">
            <SignInButton />
            <CommandMenu />
          </nav>
        </div>
      </div>
    </header>
  )
}
