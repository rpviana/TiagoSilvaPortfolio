import { Link, useLocation } from "wouter";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();

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

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r dark:border-zinc-800 p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold font-playfair">Dashboard Admin</h2>
        </div>
        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
            Início do Painel
          </Link>
          <Link href="/admin/home" className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition text-blue-600 font-semibold">
            Editar Página Inicial
          </Link>
          <Link href="/admin/events" className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
            Eventos
          </Link>
          <Link href="/admin/biography" className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
            Biografia
          </Link>
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
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
