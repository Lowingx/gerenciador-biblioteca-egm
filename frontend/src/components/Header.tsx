import { Search, Bell, User } from "lucide-react"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="pl-10 pr-4 py-2 bg-white border-none rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 w-64"
          />
        </div>
        
        <button className="p-2 bg-white rounded-xl shadow-sm text-slate-500">
          <Bell size={20} />
        </button>
        
        <div className="flex items-center gap-3 ml-2 p-1 pr-4 bg-white rounded-xl shadow-sm">
          <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center">
            <User size={18} className="text-slate-500" />
          </div>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  )
}