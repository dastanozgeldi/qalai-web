"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { onAuthChanged } from "@/firebase/auth"

import { siteConfig } from "@/config/site"

import { SignIn } from "./sign-in"
import { SignOut } from "./sign-out"

export function Nav() {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    onAuthChanged((user) => {
      setAuth(!!user)
    })
  }, [])

  return (
    <div className="flex gap-6 md:gap-10 items-center">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden text-xl font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {!auth && <SignIn />}
      {auth && (
        <div className="flex items-center gap-3">
          <Link href="/dashboard">Dashboard</Link>
          <SignOut />
        </div>
      )}
    </div>
  )
}
