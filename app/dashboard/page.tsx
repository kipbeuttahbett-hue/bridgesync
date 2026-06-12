"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase"
import { Button } from "@/components/ui/button"
import { 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  RefreshCcw, 
  ShieldCheck, 
  Send,
  Trash2,
  Settings as SettingsIcon,
  UploadCloud
} from "lucide-react"

export default function Dashboard() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [progress, setProgress] = useState(0)

  // 1. Fetch Draft Invoices
  const fetchInvoices = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('invoices')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'draft') 
        
        if (data) setInvoices(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchInvoices() }, [])

  // 2. Live Update Row
  const updateInvoice = async (id: string, field: string, value: any) => {
    const { error } = await supabase
      .from('invoices')
      .update({ [field]: value })
      .eq('id', id)
    
    if (!error) {
      setInvoices(invoices.map(inv => inv.id === id ? { ...inv, [field]: value } : inv))
    }
  }

  // 3. Clear Workspace
  const clearStagedInvoices = async () => {
    if (!confirm("This will delete all unsynced invoices. Are you sure?")) return
    
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('user_id', user.id)
        .eq('status', 'draft')
      
      if (!error) {
        setInvoices([])
        alert("Workspace cleared.")
      }
    }
  }

  // 4. Mock KRA Sync Engine
  const startKRAThresholdSync = async () => {
    const readyInvoices = invoices.filter(inv => 
      inv.amount > 0 && 
      inv.customer_name !== "Unknown" && 
      inv.customer_name !== ""
    )
    
    if (readyInvoices.length === 0) {
      alert("No ready invoices to sync! Fix the red fields first.")
      return
    }

    setSyncing(true)
    let completed = 0

    for (const inv of readyInvoices) {
      await new Promise(r => setTimeout(r, 600))
      const mockReceipt = "KRA-" + Math.random().toString(36).substr(2, 9).toUpperCase()
      
      const { error } = await supabase
        .from('invoices')
        .update({ 
          status: 'synced', 
          kra_receipt_number: mockReceipt,
          error_message: `https://etims.kra.go.ke/verify/${mockReceipt}` 
        })
        .eq('id', inv.id)

      if (!error) {
        completed++
        setProgress(Math.round((completed / readyInvoices.length) * 100))
      }
    }

    setSyncing(false)
    setProgress(0)
    fetchInvoices()
    alert(`Success! ${completed} invoices synced with KRA.`)
  }

  if (loading) return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      <p className="text-slate-500 font-medium">Scanning Cloud Vault...</p>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto py-4">
      {/* Dashboard Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="text-blue-600 w-4 h-4" />
            <span className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">BridgeSync Pro</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">DASHBOARD</h1>
          <p className="text-slate-500">Upload, validate and sync your  ETIMS data</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchInvoices} variant="outline" size="sm">
            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          {invoices.length > 0 && (
            <Button onClick={clearStagedInvoices} variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
              <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
          )}
        </div>
      </div>

      {/* Conditional Content */}
      {invoices.length === 0 ? (
        <div className="max-w-4xl mt-10">
          <div className="bg-white border-2 border-dashed rounded-[2rem] p-12 text-center mb-10">
            <CheckCircle className="mx-auto w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">Your Workspace is Clean</h3>
            <p className="text-slate-500">No invoices are currently waiting for validation.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border-2 border-blue-100 shadow-sm">
              <SettingsIcon className="text-blue-600 mb-4 w-8 h-8" />
              <h3 className="font-bold mb-1">1. Configure</h3>
              <p className="text-xs text-slate-500 mb-4">Set your KRA PIN and Device ID.</p>
              <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.href='/settings'}>Settings</Button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <UploadCloud className="text-slate-400 mb-4 w-8 h-8" />
              <h3 className="font-bold mb-1 text-slate-400">2. Upload</h3>
              <p className="text-xs text-slate-400 mb-4">Drop your daily sales Excel here.</p>
              <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.href='/upload'}>Upload</Button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 opacity-50">
              <Send className="text-slate-400 mb-4 w-8 h-8" />
              <h3 className="font-bold mb-1 text-slate-400">3. Sync</h3>
              <p className="text-xs text-slate-400">Push verified data to KRA portal.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold">Item Description</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold text-center">Qty</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 text-slate-700">{inv.item_description}</td>
                  <td className="px-6 py-4">
                    <input 
                      className={`border rounded-md px-3 py-1.5 w-full ${inv.customer_name === "Unknown" ? "bg-red-50 border-red-200" : "border-slate-200"}`}
                      value={inv.customer_name}
                      onChange={(e) => updateInvoice(inv.id, 'customer_name', e.target.value)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input 
                      type="number"
                      className="border border-slate-200 rounded-md px-3 py-1.5 w-20 mx-auto block text-center"
                      value={inv.quantity}
                      onChange={(e) => updateInvoice(inv.id, 'quantity', e.target.value)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input 
                      type="number"
                      className={`border rounded-md px-3 py-1.5 w-28 ${inv.amount === 0 ? "bg-red-50 border-red-200" : "border-slate-200"}`}
                      value={inv.amount}
                      onChange={(e) => updateInvoice(inv.id, 'amount', e.target.value)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    {inv.amount > 0 && inv.customer_name !== "Unknown" ? (
                      <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md font-bold text-[10px] uppercase flex items-center gap-1 w-fit">
                        <CheckCircle size={10} /> Ready
                      </span>
                    ) : (
                      <span className="text-red-600 bg-red-50 px-2 py-1 rounded-md font-bold text-[10px] uppercase flex items-center gap-1 w-fit">
                        <AlertCircle size={10} /> Error
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-8 bg-slate-50 border-t flex flex-col items-end gap-4">
            {syncing && (
              <div className="w-full max-w-md">
                <div className="flex justify-between text-xs mb-2 font-bold text-blue-600">
                  <span>Transmitting to KRA eTIMS...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
            <Button onClick={startKRAThresholdSync} disabled={syncing} className="bg-blue-600 hover:bg-blue-700 h-14 px-12 text-lg rounded-xl shadow-lg">
              {syncing ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" />}
              {syncing ? "Syncing..." : "Submit to KRA eTIMS"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}