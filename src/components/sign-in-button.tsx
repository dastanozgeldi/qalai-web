"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthChanged } from "@/firebase/auth"
import { auth } from "@/firebase/config"
import { useSignOut } from "react-firebase-hooks/auth"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function SignInButton() {
  const [signOut] = useSignOut(auth)
  const router = useRouter()
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    onAuthChanged((user) => {
      setLogged(!!user)
    })
  }, [])

  return logged ? (
    <Button
      className="flex items-center gap-2"
      variant="ghost"
      size="sm"
      onClick={async () => {
        const success = await signOut()
        if (success) {
          router.push("/login")
        }
      }}
    >
      <Icons.logout />
    </Button>
  ) : (
    <Button
      className="flex items-center gap-2"
      variant="ghost"
      size="sm"
      onClick={() => router.push("/login")}
    >
      <Icons.login />
    </Button>
  )
}
