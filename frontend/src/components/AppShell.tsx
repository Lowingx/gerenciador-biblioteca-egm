import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ClayBackground, GradientText } from "./ui";
import { PageAnimate } from "../motion";
import { useAuth } from "../AuthContext";

const NAV = [
  { to: "/app", label: "Dashboard", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  )},
  { to: "/app/livros", label: "Livros", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  )},
  { to: "/app/emprestimos", label: "Empréstimos", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
  )},
  { to: "/app/catalogo", label: "Catálogo", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
  )},
];

export default function AppShell() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <ClayBackground />
      <div className="relative z-10 min-h-screen flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-64 flex-col clay-card border-r-0 rounded-none border-l-0 border-t-0 border-b-0 p-6" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-primary)] flex items-center justify-center shadow-md border-3 border-[#4338CA]">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <div>
              <div className="font-heading font-bold text-lg text-[var(--color-fg)] leading-none">GBE</div>
              <div className="font-body text-[0.65rem] text-[var(--color-muted-fg)] font-semibold tracking-wider uppercase">Biblioteca Escolar</div>
            </div>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] font-body text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--color-primary)] text-white border-3 border-[#4338CA] shadow-[var(--shadow-clay)]"
                      : "text-[var(--color-muted-fg)] hover:text-[var(--color-fg)] hover:bg-white border-3 border-transparent"
                  }`
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t-3 border-[var(--color-border)] pt-4 mt-4">
            <div className="font-body text-sm text-[var(--color-fg)] font-bold truncate">{user?.nome || user?.ra}</div>
            <div className="font-body text-[0.65rem] text-[var(--color-muted-fg)] mb-3 font-semibold">{user?.ra}</div>
            <button onClick={logout} className="clay-btn clay-btn-ghost text-sm w-full">Sair</button>
          </div>
        </aside>

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile header */}
          <header className="md:hidden clay-card p-4 flex items-center justify-between rounded-none border-x-0 border-t-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[var(--color-primary)] flex items-center justify-center border-2 border-[#4338CA]">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <span className="font-heading font-bold text-xl text-[var(--color-fg)]"><GradientText>GBE</GradientText></span>
            </div>
            <button onClick={() => setMenuOpen((v) => !v)} className="clay-btn clay-btn-ghost p-2">
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </header>

          {/* Mobile menu */}
          {menuOpen && (
            <nav className="md:hidden clay-card p-4 flex flex-col gap-2 rounded-none border-x-0">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] font-body text-sm font-semibold ${
                      isActive ? "bg-[var(--color-primary)] text-white border-3 border-[#4338CA]" : "text-[var(--color-muted-fg)]"
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
              <button onClick={() => { logout(); nav("/login"); }} className="clay-btn clay-btn-ghost text-sm text-left w-full">Sair</button>
            </nav>
          )}

          {/* Content */}
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
