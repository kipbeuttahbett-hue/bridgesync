import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Zap, Layers, Lock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      {/* Navigation - Optimized for focus */}
      <nav className="flex flex-col items-center gap-4 px-8 py-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200">
            <ShieldCheck className="text-white w-7 h-7" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight italic">
            BridgeSync <span className="text-blue-600">Pro</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">
            Sign In
          </button>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 shadow-md transition-all">
            Start Free Trial
          </button>
        </div>
      </nav>

      {/* Hero Section - The "Hook" */}
      <section className="px-8 pt-12 pb-24 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
          <Zap size={14} /> New: V2.0 Integration Engine
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r dark:from-slate-900 from-slate-800 to-slate-500">
          Sync your workflow <br /> 
          <span className="text-blue-600">without the friction.</span>
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The all-in-one bridge for your data and team communication. Automate the boring stuff so you can focus on building what matters.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2">
            Get Started for Free <ArrowRight size={20} />
          </button>
          <p className="text-sm text-slate-400 font-medium italic">No credit card required.</p>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            <div className="font-bold text-xl">ACME Corp</div>
            <div className="font-bold text-xl">GLOBALTECH</div>
            <div className="font-bold text-xl">SYNC.IO</div>
            <div className="font-bold text-xl">FLOWS</div>
          </div>
        </div>
      </section>

      {/* Features - The "Value" */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything you need to scale</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="group p-8 bg-white rounded-3xl border border-slate-100 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300">
            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
              <Layers className="text-blue-600 group-hover:text-white" size={24} />
            </div>
            <h3 className="font-bold text-xl mb-3">Multi-Stack Sync</h3>
            <p className="text-slate-500 leading-relaxed">
              Connect 100+ apps in minutes. BridgeSync ensures your data is consistent everywhere.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-8 bg-white rounded-3xl border border-slate-100 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300">
            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
              <Lock className="text-blue-600 group-hover:text-white" size={24} />
            </div>
            <h3 className="font-bold text-xl mb-3">Enterprise Security</h3>
            <p className="text-slate-500 leading-relaxed">
              Bank-grade encryption and SOC2 compliance come standard on every single account.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 bg-white rounded-3xl border border-slate-100 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300">
            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
              <CheckCircle2 className="text-blue-600 group-hover:text-white" size={24} />
            </div>
            <h3 className="font-bold text-xl mb-3">Real-time Analytics</h3>
            <p className="text-slate-500 leading-relaxed">
              Monitor every bridge and sync event with beautiful, easy-to-read dashboards.
            </p>
          </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className="bg-slate-900 text-white py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to sync your future?</h2>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl">
            Get BridgeSync Pro Now
          </button>
          <div className="mt-12 pt-12 border-t border-slate-800 text-slate-500 text-sm">
            © {new Date().getFullYear()} BridgeSync Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}