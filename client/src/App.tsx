import { Route, Switch } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Biography from "@/pages/Biography";
import Gallery from "@/pages/Gallery";
import Recordings from "@/pages/Recordings";
import Repertoire from "@/pages/Repertoire";
import Discography from "@/pages/Discography";
import Calendar from "@/pages/Calendar";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";
import ScrollToTop from "@/components/ScrollToTop";
import { LanguageProvider } from "@/components/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/biography" component={Biography} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/recordings" component={Recordings} />
            <Route path="/repertoire" component={Repertoire} />
            <Route path="/discography" component={Discography} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/projects" component={Projects} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
