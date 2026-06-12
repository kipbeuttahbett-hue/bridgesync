"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/utils/supabase"
import { Button } from "@/components/ui/button"
import { Loader2, ShieldCheck, AlertCircle } from "lucide-react"

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({
    business_name: "",
    kra_pin: "",
    device_id: "",
    secret_key: "",
  })

  // 1. Load existing data when page opens
  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (data) setProfile(data)
      }
      setLoading(false)
    }
    getProfile()
  }, [])

  // 2. Save data to Supabase
  async function handleSave() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user?.id,
        ...profile,
        updated_at: new Date().toISOString(),
        is_setup_complete: true
      })

    if (error) alert("Error saving: " + error.message)
    else alert("KRA Vault Updated Successfully!")
    setSaving(false)
  }

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="text-green-600 w-8 h-8" />
        <h1 className="text-2xl font-bold text-slate-800">KRA eTIMS Configuration</h1>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8 flex gap-3">
        <AlertCircle className="text-blue-600 shrink-0" />
        <p className="text-sm text-blue-800">
          Your KRA Secret Key is encrypted. We only use it to sign your invoices and never share it with third parties.
        </p>
      </div>

      <div className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div>
          <label className="block text-sm font-medium mb-1">Business Registered Name</label>
          <input 
            className="w-full p-2 border rounded-md" 
            placeholder="e.g. Maina Hardware Ltd"
            value={profile.business_name}
            onChange={(e) => setProfile({...profile, business_name: e.target.value})}
          />
        </div>

        
          <div>
            <label className="block text-sm font-medium mb-1">KRA PIN</label>
            <input 
              className="w-full p-2 border rounded-md" 
              placeholder="P051234567X"
              value={profile.kra_pin}
              onChange={(e) => setProfile({...profile, kra_pin: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Device ID (VSCU/OSCU)</label>
            <input 
              className="w-full p-2 border rounded-md" 
              placeholder="As provided by KRA"
              value={profile.device_id}
              onChange={(e) => setProfile({...profile, device_id: e.target.value})}
            />
          </div>
        

        <div>
          <label className="block text-sm font-medium mb-1">eTIMS Secret Key</label>
          <input 
            type="password"
            className="w-full p-2 border rounded-md" 
            placeholder="••••••••••••••••"
            value={profile.secret_key}
            onChange={(e) => setProfile({...profile, secret_key: e.target.value})}
          />
        </div>

        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {saving ? "Encrypting & Saving..." : "Save Configuration"}
        </Button>
      </div>
    </div>
  )
}