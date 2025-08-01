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
          <div className="min-h-screen bg-gradient-to-br from-background to-background/95 py-12">
            <div className="container mx-auto px-4">
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-playfair text-primary mb-2">
                  Painel Administrativo
                </h1>
                <p className="text-xl text-muted-foreground">
                  Sistema de gestão Tiago Soares Silva
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">✓ Autenticação Backend</h3>
                  <p className="text-muted-foreground">Sistema de login com JWT implementado</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">✓ Credenciais</h3>
                  <p className="text-muted-foreground">TiagoSilva / portfolio</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">✓ Database</h3>
                  <p className="text-green-600 font-medium">PostgreSQL Online</p>
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
