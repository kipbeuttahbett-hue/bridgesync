"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation" 
import * as XLSX from "xlsx"
import { supabase } from "@/utils/supabase"
import { Button } from "@/components/ui/button"
import { Upload, FileSpreadsheet, CheckCircle2, Loader2 } from "lucide-react"

export default function UploadPage() {
  const router = useRouter() 
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const binaryData = event.target?.result
        const workbook = XLSX.read(binaryData, { type: "array" })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const parsedData = XLSX.utils.sheet_to_json(sheet)
        setData(parsedData)
      } catch (err) {
        console.error("Error parsing Excel:", err)
      }
    }
    reader.readAsArrayBuffer(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // FIXED: Added 'async' here
  const saveToDatabase = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert("Please login first")
        return
      }

      const { data: batch, error: batchError } = await supabase
        .from('batches')
        .insert({ user_id: user.id, filename: fileName })
        .select().single()

      if (batchError) throw batchError

      const formattedInvoices = data.map(row => {
        const lowerRow = Object.keys(row).reduce((acc, key) => {
          acc[key.toLowerCase()] = row[key]
          return acc
        }, {} as any)

        return {
          batch_id: batch.id,
          user_id: user.id,
          customer_name: String(lowerRow.cust || lowerRow.customer || lowerRow.name || "Unknown"),
          amount: parseFloat(lowerRow.price || lowerRow.amount || 0),
          quantity: parseInt(lowerRow.qty || lowerRow.quantity || 1),
          item_description: String(lowerRow.description || lowerRow.item || "No Item Name"),
          status: 'draft'
        }
      })

      const { error } = await supabase.from('invoices').insert(formattedInvoices)
      if (error) throw error

      alert(`Successfully staged ${data.length} invoices!`)
      // HARD REDIRECT to force Dashboard to refresh
      window.location.href = "/dashboard"
      
    } catch (err: any) {
      alert("Error: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Module 2: Intake Pipe</h1>
      <p className="text-slate-500 mb-8">Upload your daily sales record to begin KRA validation.</p>

      <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center bg-white shadow-sm">
        <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden" 
          accept=".xlsx, .xls, .csv"
        />
        <Button 
          onClick={triggerFileInput} 
          className="bg-blue-600 hover:bg-blue-700 h-14 px-10 text-lg rounded-xl shadow-lg"
        >
          Upload File
        </Button>
        {fileName && (
          <p className="mt-4 text-blue-600 font-bold flex items-center justify-center gap-2">
            <FileSpreadsheet className="w-4 h-4" /> {fileName}
          </p>
        )}
      </div>

      {data.length > 0 && (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Preview ({data.length} rows)</h2>
            <Button onClick={saveToDatabase} disabled={loading} className="bg-green-600 hover:bg-green-700 px-8 h-12">
              {loading ? <Loader2 className="animate-spin mr-2" /> : <CheckCircle2 className="mr-2" />}
              Push To SupaBase
            </Button>
          </div>
          <div className="border rounded-2xl overflow-hidden bg-white shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b">
                <tr>
                  {Object.keys(data[0]).map(k => (
                    <th key={k} className="p-4 font-semibold text-slate-700 capitalize">{k}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 5).map((row, i) => (
                  <tr key={i} className="border-b">
                    {Object.values(row).map((v: any, j) => (
                      <td key={j} className="p-4 text-slate-600">{String(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}