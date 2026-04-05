import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import { Home, PanelTop, PanelBottom, Calendar, User, LayoutDashboard, Briefcase } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setLocation("/");
  };

  const navItems = [
    { href: "/admin", label: "Início do Painel", icon: LayoutDashboard },
    { href: "/admin/home", label: "Página Inicial", icon: Home },
    { href: "/admin/about", label: "Sobre", icon: User },
    { href: "/admin/header", label: "Header", icon: PanelTop },
    { href: "/admin/footer", label: "Footer", icon: PanelBottom },
    { href: "/admin/events", label: "Eventos", icon: Calendar },
    { href: "/admin/projects", label: "Projetos", icon: Briefcase },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r dark:border-zinc-800 p-6 flex flex-col">
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
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full text-left block p-2 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            Sair / Voltar ao Site
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
