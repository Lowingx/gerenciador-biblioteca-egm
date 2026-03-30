import { LayoutDashboard, Book, Users, Settings } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-64 h-full bg-white rounded-[2rem] shadow-sm flex flex-col p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-purple-600 rounded-lg" />
        <span className="font-bold text-xl tracking-tight">GBE Library</span>
      </div>
      
      <nav className="flex-1 space-y-2">
        <div className="flex items-center gap-3 p-3 bg-purple-50 text-purple-600 rounded-xl">
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </div>
        <div className="flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
          <Book size={20} />
          <span>Livros</span>
        </div>
        <div className="flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
          <Users size={20} />
          <span>Usuários</span>
        </div>
      </nav>

      <div className="pt-6 border-t">
        <div className="flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
          <Settings size={20} />
          <span>Configurações</span>
        </div>
      </div>
    </aside>
  )
}