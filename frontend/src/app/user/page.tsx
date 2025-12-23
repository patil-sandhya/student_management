'use client'
import User from "@/components/User"
import PrivateRoute from "@/privateRoute/PrivateRoute"

// private user page
export default function UserPage() {
  return (
    <main className="">
        <PrivateRoute>
        <User />
        </PrivateRoute>
    </main>
  )
}