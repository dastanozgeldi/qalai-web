"use client"

import { auth } from "@/firebase/config"
import { useSignOut } from "react-firebase-hooks/auth"

export const SignOut: React.FC = () => {
  const [signOut, loading, error] = useSignOut(auth)

  if (error) {
    return <p>Error: {error.message}</p>
  }
  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <div className="App">
      <button
        onClick={async () => {
          const success = await signOut()
          if (success) {
            alert("Signed out successfully")
          }
        }}
      >
        Sign out
      </button>
    </div>
  )
}
