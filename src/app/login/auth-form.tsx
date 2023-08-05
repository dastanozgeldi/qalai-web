"use client"

import { useRouter } from "next/navigation"
import { auth } from "@/firebase/config"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const [signInWithGoogle, user, loading, fbError] = useSignInWithGoogle(auth)

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={loading}
        onClick={async () => {
          const user = await signInWithGoogle()
          if (user) {
            router.push("/generate")
          }
        }}
      >
        {loading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      {fbError && <p>{fbError.message}</p>}
    </div>
  )
}
