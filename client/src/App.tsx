import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/LanguageContext";
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
// Admin Imports
import AdminLayout from "./components/AdminLayout";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminHeaderSettings from "./pages/admin/HeaderSettings";
import AdminFooterSettings from "./pages/admin/FooterSettings";
import AdminAboutSettings from "./pages/admin/AboutSettings";
import AdminEventsSettings from "./pages/admin/EventsSettings";
import AdminProjectsSettings from "./pages/admin/ProjectsSettings";
import AdminGallerySettings from "./pages/admin/GallerySettings";
import AdminContactSettings from "./pages/admin/ContactSettings";

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
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={() => (
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        )} />
        <Route path="/admin/header" component={() => (
          <AdminLayout>
            <AdminHeaderSettings />
          </AdminLayout>
        )} />
        <Route path="/admin/footer" component={() => (
          <AdminLayout>
            <AdminFooterSettings />
          </AdminLayout>
        )} />
        <Route path="/admin/about" component={() => (
          <AdminLayout>
            <AdminAboutSettings />
          </AdminLayout>
        )} />
        <Route path="/admin/events" component={() => (
          <AdminLayout>
            <AdminEventsSettings />
          </AdminLayout>
        )} />
        <Route path="/admin/projects" component={() => (
          <AdminLayout>
            <AdminProjectsSettings />
          </AdminLayout>
        )} />
        <Route path="/admin/gallery" component={() => (
          <AdminLayout>
            <AdminGallerySettings />
          </AdminLayout>
        )} />
        <Route path="/admin/contact" component={() => (
          <AdminLayout>
            <AdminContactSettings />
          </AdminLayout>
        )} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Layout>
          <Router />
        </Layout>
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
