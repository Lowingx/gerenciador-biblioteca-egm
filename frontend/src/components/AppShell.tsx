import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { CosineBackground, GradientText } from "./ui";
import { PageAnimate } from "../motion";
import { useAuth } from "../AuthContext";
import { useState } from "react";

const NAV = [
  { to: "/app", label: "Dashboard", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  )},
  { to: "/app/livros", label: "Livros", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  )},
  { to: "/app/emprestimos", label: "Empréstimos", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
  )},
  { to: "/app/catalogo", label: "Catálogo", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
  )},
];

export default function AppShell() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <CosineBackground />
      <div className="relative z-10 min-h-screen flex">
        <aside className="hidden md:flex w-64 flex-col card-glass border-r border-white/30 p-6">
          <div className="flex items-center gap-3 mb-10">
            <img src="/Icons/logo-gbe.png" alt="GBE" className="h-12 w-auto object-contain drop-shadow-sm" />
            <div>
              <div className="font-poppins font-bold text-lg text-gray-800 leading-none">GBE</div>
              <div className="font-inter text-[0.65rem] text-gray-400 font-medium tracking-wider uppercase">Biblioteca Escolar</div>
            </div>
          </div>

          <nav className="flex flex-col gap-1 flex-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl font-inter text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#6B46C0]/10 to-[#00B4D8]/10 text-[#6B46C0] font-semibold shadow-sm border border-[#6B46C0]/10"
                      : "text-gray-500 hover:text-gray-700 hover:bg-white/50 border border-transparent"
                  }`
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-white/30 pt-4 mt-4">
            <div className="font-inter text-sm text-gray-700 font-medium truncate">{user?.nome || user?.ra}</div>
            <div className="font-inter text-[0.65rem] text-gray-400 mb-3 font-medium">{user?.ra}</div>
            <button onClick={logout} className="font-inter text-sm text-[#00B4D8] hover:text-[#6B46C0] transition-colors font-medium">
              Sair
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="md:hidden card-glass p-4 flex items-center justify-between border-b border-white/30">
            <div className="flex items-center gap-2">
              <img src="/Icons/logo-gbe.png" alt="GBE" className="h-9 w-auto" />
              <span className="font-poppins font-bold text-gray-800"><GradientText>GBE</GradientText></span>
            </div>
            <button onClick={() => setMenuOpen((v) => !v)} className="font-inter text-gray-500 hover:text-gray-700 transition-colors">
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </header>

          {menuOpen && (
            <nav className="md:hidden card-glass p-4 flex flex-col gap-1 border-b border-white/30">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl font-inter text-sm font-medium ${
                      isActive ? "bg-gradient-to-r from-[#6B46C0]/10 to-[#00B4D8]/10 text-[#6B46C0]" : "text-gray-500"
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
              <button onClick={() => { logout(); nav("/login"); }} className="text-left flex items-center gap-3 px-4 py-2.5 font-inter text-sm text-[#00B4D8]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Sair
              </button>
            </nav>
          )}

          <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            <PageAnimate key={location.pathname}>
              <Outlet />
            </PageAnimate>
          </main>
        </div>
      </div>
    </div>
  );
}
