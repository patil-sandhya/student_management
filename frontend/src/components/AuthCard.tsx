import type React from "react"

interface AuthCardProps {
  children: React.ReactNode
  title: string
  description: string
}

export function AuthCard({ children, title, description }: AuthCardProps) {
  // reusable auth card component to show title, description and children
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-balance">{title}</h1>
        <p className="text-muted-foreground text-balance">{description}</p>
      </div>
      {children}
    </div>
  )
}
