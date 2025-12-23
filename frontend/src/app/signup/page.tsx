import { SignUpForm } from "@/components/SignUp";


// signup page
export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-background to-secondary flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </main>
  )
}