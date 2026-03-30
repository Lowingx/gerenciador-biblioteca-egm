import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Animado/GIF */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 z-10" />
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueXF4ZzRndXJueHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif" 
          className="w-full h-full object-cover opacity-40"
          alt="bg"
        />
      </div>

      {/* Card Glassmorphism */}
      <Card className="w-[380px] z-10 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl text-white rounded-3xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tighter">
            GBE <span className="text-blue-400">Library</span>
          </CardTitle>
          <p className="text-sm text-slate-400">Entre com suas credenciais</p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Input 
              type="email" 
              placeholder="usuário@egm.com" 
              className="bg-white/5 border-white/10 rounded-xl h-11 focus:ring-purple-500"
            />
          </div>
          <div className="grid gap-2">
            <Input 
              type="password" 
              placeholder="••••••••" 
              className="bg-white/5 border-white/10 rounded-xl h-11 focus:ring-purple-500"
            />
          </div>
          <Button className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 font-bold transition-all border-none">
            ACESSAR SISTEMA
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}