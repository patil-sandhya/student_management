"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Button } from "./ui/Button"
import { AuthCard } from "./AuthCard"
import { useAlert } from "@/context/AlertContext"
import { useRouter } from "next/navigation"
import ApiSercies from "@/services/CommonApi"

interface SignUpErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  submit?: string
}

export function SignUpForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<SignUpErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const {setAlert} = useAlert();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: SignUpErrors = {}
const isStrongPassword = (password: any) => {
    // At least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!\"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~])[A-Za-z\d!\"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]{8,}$/;
    return passwordRegex.test(password);
  };

  // validate name  
    if (!name.trim()) {
      newErrors.name = "Name is required"
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    // validate email
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email"
    }

    // validate password
    if (!password.trim()) {
      newErrors.password = "Password is required"
    } else if (isStrongPassword(password) === false) {
      newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    }

    // validate confirm password
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    return newErrors
  }


// handle form submission
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
     let res = await ApiSercies.post_signUp({
        name,
        email,
        password
      })
      if (res.data) {
        setAlert('success', "Account created successfully! Please sign in.");
        router.push("/");
      }
    } catch (error) {
        setAlert('error', "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard title="Create account" description="Get started with your new account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/*  Name field */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (errors.name) setErrors({ ...errors, name: undefined })
            }}
            disabled={isLoading}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-destructive">
              {errors.name}
            </p>
          )}
        </div>

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
          <Label htmlFor="password">Password</Label>
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

        {/* Confirm Password field */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined })
            }}
            disabled={isLoading}
            className={errors.confirmPassword ? "border-destructive" : ""}
            
          />
          {errors.confirmPassword && (
            <p id="confirmPassword-error" className="text-sm text-destructive">
              {errors.confirmPassword}
            </p>
          )}
        </div>

          {/* Submit button */}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Creating account..." : "Sign up"}
        </Button>
      </form>

           {/* already have account */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Already have an account?</span>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already signed up?{" "}
        <Link href="/" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </AuthCard>
  )
}
