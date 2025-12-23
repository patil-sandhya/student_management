'use client'
import Admin from "@/components/Admin"
import User from "@/components/User"
import PrivateRoute from "@/privateRoute/PrivateRoute"

// private user page
export default function AdminPage() {
  return (
    <main className="">
        <PrivateRoute>
        <Admin />
        </PrivateRoute>
    </main>
  )
}