export default function App() {
  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] p-6 gap-6 overflow-hidden">
      
      {/* Sidebar (Coluna da Esquerda no PDF) */}
      <aside className="w-64 bg-[#E9ECEF] rounded-[2.5rem] p-8 flex flex-col gap-10">
        <div className="w-12 h-12 bg-slate-400 rounded-full" />
        <nav className="flex flex-col gap-6">
          <div className="h-4 bg-slate-300 rounded-full w-full" />
          <div className="h-4 bg-slate-300 rounded-full w-3/4" />
        </nav>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 flex flex-col gap-6">
        
        {/* Header Superior */}
        <header className="h-24 bg-[#E9ECEF] rounded-[2.5rem] px-10 flex items-center">
          <h1 className="text-xl font-bold text-slate-600">Visão Geral</h1>
        </header>

        {/* Grid de Conteúdo */}
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Card Principal Central */}
          <section className="flex-[3] bg-[#E9ECEF] rounded-[2.5rem] p-8">
            <div className="w-full h-full border-4 border-dashed border-slate-300 rounded-[2rem]" />
          </section>
          
          {/* Coluna da Direita (Cards Menores) */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="h-1/3 bg-[#E9ECEF] rounded-[2.5rem]" />
            <div className="flex-1 bg-[#E9ECEF] rounded-[2.5rem]" />
          </div>
        </div>
      </main>
    </div>
  );
}
