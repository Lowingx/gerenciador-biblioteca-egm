import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, User, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [ra, setRa] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrar com backend JWT
    console.log('Login:', { ra, senha });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background animado estilo PS4 (GIF fluindo sutil) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://assets.mixkit.co/videos/preview/12345/12345-large.mp4')`, // substitua por um GIF ou video sutil de gradiente fluindo
          filter: 'brightness(0.6) blur(2px)',
        }}
      />
      
      {/* Overlay gradiente suave */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-purple-950/80 to-violet-950/80" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card className="w-[380px] bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GBE
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Bem-vindo ao GBE<br />
              Faça login para continuar
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="RA (Registro do Aluno)"
                    value={ra}
                    onChange={(e) => setRa(e.target.value)}
                    className="pl-10 h-12 bg-white border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="pl-10 h-12 bg-white border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-base rounded-xl transition-all duration-300"
              >
                Entrar
              </Button>
            </form>

            <div className="mt-6 flex justify-center gap-4 text-sm text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-colors">Esqueceu sua senha?</a>
              <span className="text-gray-300">•</span>
              <a href="#" className="hover:text-blue-600 transition-colors">Precisa de ajuda?</a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
