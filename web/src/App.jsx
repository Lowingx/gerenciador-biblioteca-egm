import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Card } from './components/Card';

export default function App() {
  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] p-6 gap-6 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col gap-6">
        <Header title="Visão Geral" />

        <div className="flex-1 flex gap-6 min-h-0">
          {/* Main Content Area */}
          <Card className="flex-[3]">
            <div className="w-full h-full border-4 border-dashed border-slate-300 rounded-[2rem]" />
          </Card>
          
          {/* Right Column Stack */}
          <div className="flex-1 flex flex-col gap-6">
            <Card className="h-1/3" />
            <Card className="flex-1" />
          </div>
        </div>
      </main>
    </div>
  );
}
