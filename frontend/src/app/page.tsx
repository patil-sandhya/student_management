import { SignInForm } from "@/components/SignIn";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-background to-secondary flex items-center justify-center px-4 py-8" suppressHydrationWarning={true}>
      <div className="w-full max-w-sm">
      <SignInForm />
      </div>
    </main>
  );
}
