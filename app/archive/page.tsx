"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase"
import { History, Search, FileCheck, ExternalLink, Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ArchivePage() {
  const [syncedInvoices, setSyncedInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchArchive = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('invoices')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'synced')
          .order('created_at', { ascending: false })
        if (data) setSyncedInvoices(data)
      }
      setLoading(false)
    }
    fetchArchive()
  }, [])

  const filteredData = syncedInvoices.filter(inv => 
    inv.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.kra_receipt_number?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-8">
        
        <Button variant="outline" className="shadow-sm">
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>
      </div>

      <div className="table-card">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text"
              placeholder="Search Customer or Receipt..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px] tracking-widest font-bold">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount (KES)</th>
              <th className="px-6 py-4">KRA Receipt</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-500 font-mono">
                  {new Date(inv.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 font-semibold text-slate-800">{inv.customer_name}</td>
                <td className="px-6 py-4 font-bold">{inv.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100 font-mono">
                    {inv.kra_receipt_number}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => window.open(inv.error_message, '_blank')} className="text-blue-600 hover:underline inline-flex items-center gap-1">
                    Verify <ExternalLink size={12}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}