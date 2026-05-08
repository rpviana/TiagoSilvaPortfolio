import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLocation } from 'wouter';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [location] = useLocation();
  
  // Check if we're on an admin route
  const isAdminRoute = location.startsWith('/admin');
  
  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  // Don't render header/footer for admin routes
  if (isAdminRoute) {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[9999] origin-left" 
        style={{ scaleX }}
      />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
