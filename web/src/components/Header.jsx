export const Header = ({ title }) => (
  <header className="h-24 bg-[#E9ECEF] rounded-[2.5rem] px-10 flex items-center justify-between">
    <h1 className="text-xl font-bold text-slate-600 opacity-70">{title}</h1>
    <div className="w-10 h-10 bg-slate-400 rounded-full" />
  </header>
);
