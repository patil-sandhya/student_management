"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

import { AuthCard } from "./AuthCard"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Button } from "./ui/Button"
import { useAlert } from "@/context/AlertContext"
import { useRouter } from "next/navigation"
import ApiSercies from "@/services/CommonApi"

interface SignInErrors {
  email?: string
  password?: string
  submit?: string
}

export function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<SignInErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const {setAlert} = useAlert();
  const router = useRouter();
  const validateForm = () => {
    const newErrors: SignInErrors = {}

    const isStrongPassword = (password: any) => {
    // At least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!\"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~])[A-Za-z\d!\"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]{8,}$/;
    return passwordRegex.test(password);
  };

  // Validate email
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email"
    }

    //validate password
    if (!password.trim()) {
      newErrors.password = "Password is required"
    } else if (isStrongPassword(password) === false) {
      newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()

    // set errors and return early if there are validation errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const data = {
      email,
      password
    }
    let res = await ApiSercies.post_signIn(data)
      console.log(res)
      if(res?.data){
        console.log(res.data)

        setAlert("success", `Welcome to ${res?.data?.data?.role === "Admin" ? "Admin" : "Student"} dashboard. You’re now logged in`)
        localStorage.setItem('token', res?.data?.data?.token);
        localStorage.setItem('role', res?.data?.data?.role);
        // localStorage.setItem('email', res?.data?.email);
        // localStorage.setItem('userid', res?.data?.userid);
        if(res?.data?.data?.role === "Admin"){
          router.push("/admin");
        }
        else{
          sessionStorage.setItem("student_id", res?.data?.data?.userid);
      router.push("/user");
        }
      }
      
    } catch (error) {
      // if error, show error message using alert context
      setAlert('error', "Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard title="Welcome back" description="Sign in to your account to continue">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Email field */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors({ ...errors, email: undefined })
            }}
            disabled={isLoading}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password field */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-sm text-primary hover:underline">
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (errors.password) setErrors({ ...errors, password: undefined })
            }}
            disabled={isLoading}
            className={errors.password ? "border-destructive" : ""}
          />
          {errors.password && (
            <p id="password-error" className="text-sm text-destructive">
              {errors.password}
            </p>
          )}
        </div>

          {/* submit button */}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

          {/* if not account, show sign up link */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">New to us?</span>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </AuthCard>
  )
}
