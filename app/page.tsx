"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Save
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      {/* Changed to flex-col and items-center to stack them vertically */}
      <nav className="flex flex-col items-center gap-6 px-8 py-8 max-w-7xl mx-auto border-b border-slate-50">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-md shadow-blue-200">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 italic">
            BridgeSync <span className="text-blue-600">Pro</span>
          </span>
        </div>

        {/* Buttons Section - Now sits underneath */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Button 
            onClick={() => window.location.href='/login'} 
            className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 px-6"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-24 max-w-7xl mx-auto text-center animate-in fade-in slide-in-from-top-4 duration-700">
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
          Stop Manually Typing <br /><span className="text-blue-600">eTIMS Receipts.</span>
        </h1>
        <p className="text-xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed">
          The official bridge for Kenyan Wholesalers and Pharmacies. 
          Upload your daily sales Excel. We sync it with KRA in seconds. 
          <span className="block font-semibold text-slate-800 mt-2">No more 1 Million Shilling fines.</span>
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Button 
            onClick={() => window.location.href='/login'} 
            className="h-16 px-12 text-lg bg-blue-600 hover:bg-blue-700 w-full md:w-auto rounded-2xl shadow-xl shadow-blue-200 font-bold"
          >
            Secure Your Business <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
             <ShieldAlert className="w-4 h-4" /> Trusted by 50+ Nairobi Vendors
          </div>
        </div>
      </section>

      {/* The "Painkiller" Features */}
      <section className="bg-slate-50 py-24 px-8 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Compliance Bridge</h2>
            <p className="text-slate-500">Why change your whole system when you only need a bridge?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 hover:border-blue-300 transition-all group">
              <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <Clock className="w-7 h-7 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Save 2 Hours Daily</h3>
              <p className="text-slate-500 leading-relaxed">End the "Evening Typing Session." Upload your entire day's work in under 5 seconds.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 hover:border-blue-300 transition-all group">
              <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <Save className="w-7 h-7 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Keep Your Excel</h3>
              <p className="text-slate-500 leading-relaxed">Don't buy expensive new ERPs. BridgeSync works with your current Excel or CSV sales records.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 hover:border-blue-300 transition-all group">
              <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <CheckCircle2 className="w-7 h-7 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Zero Error Policy</h3>
              <p className="text-slate-500 leading-relaxed">Our AI-Scrubber catches missing PINs and incorrect amounts before they reach the KRA portal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Offer Section */}
      <section className="py-24 px-8 text-center">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-[3rem] p-16 text-white shadow-2xl relative overflow-hidden">
            {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <h2 className="text-4xl font-bold mb-4 relative z-10">Early Adopter Offer</h2>
          <p className="text-slate-400 mb-10 text-lg">One-time payment. Lifetime compliance peace of mind.</p>
          
          <div className="flex items-end justify-center gap-2 mb-10 relative z-10">
            <span className="text-6xl font-black text-white italic">Ksh 25,000</span>
            <span className="text-slate-500 text-sm font-bold uppercase mb-2">/ one-time</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left max-w-2xl mx-auto relative z-10">
            <div className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="text-blue-500 w-5 h-5" /> Professional Set-up</div>
            <div className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="text-blue-500 w-5 h-5" /> Direct KRA API Link</div>
            <div className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="text-blue-500 w-5 h-5" /> Unlimited Sales Sync</div>
            <div className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="text-blue-500 w-5 h-5" /> Archive for Tax Audits</div>
          </div>

          <Button 
            onClick={() => window.location.href='/login'} 
            className="w-full md:w-auto h-16 px-16 bg-blue-600 hover:bg-blue-700 text-lg font-bold rounded-2xl transition-transform hover:scale-105"
          >
            Get Compliant Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm">© 2024 BridgeSync Pro. Helping Kenyan Businesses Grow Compliantly.</p>
      </footer>
    </div>
  )
}