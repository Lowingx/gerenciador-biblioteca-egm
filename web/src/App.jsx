import { Card } from './components/Card';

function App() {
  return (
    <div className="min-h-screen bg-egm-bg p-6 flex gap-6 font-sans text-slate-800">
      
      {/* Sidebar Esquerda (Página 1 e 3) */}
      <aside className="w-20 md:w-64 flex flex-col gap-4">
        <Card className="flex-1">
          <div className="h-10 w-10 bg-slate-400 rounded-full mb-10" />
          <div className="space-y-6">
            <div className="h-4 bg-slate-300 rounded w-3/4" />
            <div className="h-4 bg-slate-300 rounded w-1/2" />
            <div className="h-4 bg-slate-300 rounded w-2/3" />
          </div>
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6">
        
        {/* Header Superior */}
        <Card className="h-20 flex items-center justify-between">
          <div className="h-6 bg-slate-300 rounded w-48" />
          <div className="h-10 w-10 bg-slate-400 rounded-full" />
        </Card>

        {/* Grid do Dashboard (Page 1) */}
        <div className="flex flex-1 gap-6">
          <Card className="flex-[3]">
             <h2 className="font-bold text-xl text-slate-600">Visão Geral</h2>
          </Card>

          <div className="flex-1 flex flex-col gap-6">
            <Card className="h-48" />
            <Card className="flex-1" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
