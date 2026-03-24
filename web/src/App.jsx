import { Card } from './components/Card';

export default function App() {
  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] p-6 gap-6 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#E9ECEF] rounded-[2rem] p-8 flex flex-col gap-10">
        <div className="w-12 h-12 bg-slate-400 rounded-full" />
        <nav className="flex flex-col gap-6">
          <div className="h-4 bg-slate-300 rounded-full w-full" />
          <div className="h-4 bg-slate-300 rounded-full w-3/4" />
          <div className="h-4 bg-slate-300 rounded-full w-1/2" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6">
        {/* Header */}
        <header className="h-24 bg-[#E9ECEF] rounded-[2rem] px-10 flex items-center justify-between">
          <h1 className="text-xl font-bold opacity-60">Visão Geral</h1>
          <div className="w-10 h-10 bg-slate-400 rounded-full" />
        </header>

        {/* Bento Grid */}
        <div className="flex-1 flex gap-6">
          <section className="flex-[3] bg-[#E9ECEF] rounded-[2rem] p-8">
            <div className="w-full h-full border-2 border-dashed border-slate-300 rounded-[1.5rem]" />
          </section>
          
          <div className="flex-1 flex flex-col gap-6">
            <div className="h-1/3 bg-[#E9ECEF] rounded-[2rem]" />
            <div className="flex-1 bg-[#E9ECEF] rounded-[2rem]" />
          </div>
        </div>
      </main>
    </div>
  );
}
