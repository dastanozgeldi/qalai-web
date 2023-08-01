"use client"

import { auth } from "@/firebase/config"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"

export const SignIn: React.FC = () => {
  const [signInWithGoogle, user, loading, fbError] = useSignInWithGoogle(auth)

  return (
    <div>
      <button disabled={loading} onClick={() => signInWithGoogle()}>
        Login
      </button>

      {fbError && <p>{fbError.message}</p>}
    </div>
  )
}
