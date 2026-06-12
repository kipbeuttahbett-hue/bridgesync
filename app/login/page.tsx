"use client"
import { useState } from "react"
import { supabase } from "@/utils/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ShieldCheck, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState<"login" | "signup" | "forgot">("login")

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (view === "signup") {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        window.location.href = "/dashboard"
      } else if (view === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        window.location.href = "/dashboard"
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/settings`,
        })
        if (error) throw error
        alert("Reset link sent to your email!")
        setView("login")
      }
    } catch (err: any) { alert(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-3xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-black italic">BridgeSync <span className="text-blue-600">Pro</span></CardTitle>
          <p className="text-slate-500 text-sm">
            {view === "signup" ? "Get started in 30 seconds" : view === "forgot" ? "Reset your password" : "Login to your vault"}
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input type="email" required className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            {view !== "forgot" && (
              <div className="space-y-1">
                <div className="flex justify-between px-1">
                   <label className="text-xs font-bold text-slate-400 uppercase">Password</label>
                   {view === "login" && <button type="button" onClick={() => setView("forgot")} className="text-xs text-blue-600 font-bold">Forgot?</button>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input type="password" required className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
            )}
            <Button className="w-full bg-blue-600 h-12 rounded-xl text-lg font-bold" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : view === "signup" ? "Create Account" : view === "forgot" ? "Send Link" : "Sign In"}
            </Button>
          </form>
          <button onClick={() => setView(view === "login" ? "signup" : "login")} className="w-full mt-6 text-sm font-bold text-slate-500 hover:text-blue-600">
            {view === "login" ? "New to BridgeSync? Create account" : "Already have an account? Sign in"}
          </button>
        </CardContent>
      </Card>
    </div>
  )
}