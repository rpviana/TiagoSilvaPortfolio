import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { PanelTop, PanelBottom, Calendar, User, LayoutDashboard, Briefcase, Menu, X, LogOut, Image, Mail } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  // Close menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setLocation("/");
  };

  const navItems = [
    { href: "/admin", label: "Início", shortLabel: "Início", icon: LayoutDashboard },
    { href: "/admin/about", label: "Sobre", shortLabel: "Sobre", icon: User },
    { href: "/admin/header", label: "Header", shortLabel: "Header", icon: PanelTop },
    { href: "/admin/footer", label: "Footer", shortLabel: "Footer", icon: PanelBottom },
    { href: "/admin/gallery", label: "Galeria", shortLabel: "Galeria", icon: Image },
    { href: "/admin/events", label: "Eventos", shortLabel: "Eventos", icon: Calendar },
    { href: "/admin/projects", label: "Projetos", shortLabel: "Projetos", icon: Briefcase },
    { href: "/admin/contact", label: "Contacto", shortLabel: "Contacto", icon: Mail },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-950">
      {/* ── DESKTOP Sidebar (hidden on mobile) ── */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-zinc-900 border-r dark:border-zinc-800 p-6 flex-col shrink-0">
        <div className="mb-8">
          <h2 className="text-xl font-bold font-playfair">Dashboard Admin</h2>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-2 rounded transition ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-2 p-2 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            <LogOut className="w-4 h-4" />
            Sair / Voltar ao Site
          </button>
        </div>
      </aside>

      {/* ── MOBILE Top Bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 flex items-center justify-between px-4 h-14">
        <h2 className="text-base font-bold font-playfair">Dashboard Admin</h2>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── MOBILE Drawer Menu ── */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-30 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="md:hidden fixed top-14 left-0 bottom-0 z-40 w-64 bg-white dark:bg-zinc-900 border-r dark:border-zinc-800 flex flex-col p-4 overflow-y-auto">
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 p-3 rounded transition text-base ${
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 pt-4 border-t dark:border-zinc-800">
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-3 p-3 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              >
                <LogOut className="w-5 h-5" />
                Sair / Voltar ao Site
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-hidden flex flex-col min-w-0">
        {/* Spacer for mobile top bar */}
        <div className="md:hidden h-14 shrink-0" />
        <div className="flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </div>
      </main>

      {/* ── MOBILE Bottom Navigation ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-zinc-900 border-t dark:border-zinc-800 flex items-stretch">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium transition-colors min-w-0 ${
                isActive
                  ? 'text-primary bg-primary/5'
                  : 'text-gray-500 dark:text-gray-400 hover:text-primary'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="truncate w-full text-center px-0.5">{item.shortLabel}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom nav spacer for mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 pointer-events-none" />
    </div>
  );
}
