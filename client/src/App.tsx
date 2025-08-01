import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { AuthProvider } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Discography from "./pages/Discography";
import Projects from "./pages/Projects";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
// import AdminPanel from "./pages/AdminPanel";
import { AnimatePresence } from "framer-motion";

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/discography" component={Discography} />
        <Route path="/projects" component={Projects} />
        <Route path="/events" component={Events} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin">
          <div className="min-h-screen bg-gradient-to-br from-background to-background/95 py-8">
            <div className="container mx-auto px-4">
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-playfair text-primary mb-2">
                  Painel Administrativo
                </h1>
                <p className="text-xl text-muted-foreground">
                  Gestão de Conteúdo - Tiago Soares Silva
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Gestão de Biografia */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="text-blue-500 mr-2">👤</span>
                    Biografia & Sobre
                  </h3>
                  <p className="text-muted-foreground mb-4">Editar texto da página Sobre, biografia pessoal e profissional</p>
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                    Editar Biografia
                  </button>
                </div>

                {/* Gestão de Eventos */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="text-green-500 mr-2">🗓️</span>
                    Eventos & Concertos
                  </h3>
                  <p className="text-muted-foreground mb-4">Adicionar, editar e remover eventos e apresentações</p>
                  <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                    Gerenciar Eventos
                  </button>
                </div>

                {/* Gestão de Galeria */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="text-purple-500 mr-2">📸</span>
                    Galeria de Fotos
                  </h3>
                  <p className="text-muted-foreground mb-4">Upload e organização de fotos profissionais</p>
                  <button className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors">
                    Gerenciar Fotos
                  </button>
                </div>

                {/* Gestão de Discografia */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="text-red-500 mr-2">🎵</span>
                    Discografia & Áudios
                  </h3>
                  <p className="text-muted-foreground mb-4">Adicionar gravações, álbuns e samples de áudio</p>
                  <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors">
                    Gerenciar Música
                  </button>
                </div>

                {/* Gestão de Avaliações */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="text-yellow-500 mr-2">⭐</span>
                    Avaliações & Reviews
                  </h3>
                  <p className="text-muted-foreground mb-4">Adicionar depoimentos e avaliações de clientes</p>
                  <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors">
                    Gerenciar Reviews
                  </button>
                </div>

                {/* Gestão de Contatos */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="text-indigo-500 mr-2">📧</span>
                    Mensagens & Contatos
                  </h3>
                  <p className="text-muted-foreground mb-4">Ver mensagens recebidas e informações de contato</p>
                  <button className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition-colors">
                    Ver Mensagens
                  </button>
                </div>

                {/* Configurações do Site */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-500">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="text-gray-500 mr-2">⚙️</span>
                    Configurações Gerais
                  </h3>
                  <p className="text-muted-foreground mb-4">Configurar idiomas, cores, links sociais e SEO</p>
                  <button className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors">
                    Configurações
                  </button>
                </div>

                {/* Traduções */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="text-teal-500 mr-2">🌍</span>
                    Traduções
                  </h3>
                  <p className="text-muted-foreground mb-4">Gerenciar conteúdo em Português e Inglês</p>
                  <button className="w-full bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition-colors">
                    Gerenciar Idiomas
                  </button>
                </div>

                {/* Relatórios */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="text-orange-500 mr-2">📊</span>
                    Estatísticas
                  </h3>
                  <p className="text-muted-foreground mb-4">Visualizar dados de visitação e engajamento</p>
                  <button className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors">
                    Ver Relatórios
                  </button>
                </div>
              </div>

              {/* Status do Sistema */}
              <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Status do Sistema</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Database: Online</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Website: Funcionando</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Admin: Logado como Tiago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Layout>
        <Router />
      </Layout>
    </TooltipProvider>
  );
}

export default App;
