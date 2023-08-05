"use client"

import React from "react"
import Link from "next/link"

import { UserAuthForm } from "./auth-form"

export default function AuthenticationPage() {
  return (
    <div className="h-[600px] flex items-center justify-center lg:px-0 p-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose one of the providers to sign in.
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <blockquote className="text-center absolute bottom-12 space-y-2 sm:w-[350px]">
        <p className="text-md">
          &ldquo;This web app has saved me countless hours of research work and
          helped me acquire new skills much faster and more efficient.&rdquo;
        </p>
        <footer className="text-sm">
          Elon Musk, CEO @ SpaceX
        </footer>
      </blockquote>
    </div>
  )
}
