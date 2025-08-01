import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
// import AdminLogin from './AdminLogin';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { t } = useTranslation();
  const [location] = useLocation();
  // const { user, isAuthenticated, logout } = useAuth();
  const user = null;
  const isAuthenticated = false;
  const logout = () => {};
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { path: "/about", label: t("nav.about") },
    { path: "/gallery", label: t("nav.gallery") },
    { path: "/discography", label: t("nav.discography") },
    { path: "/projects", label: t("nav.projects") },
    { path: "/events", label: t("nav.events") },
    { path: "/contact", label: t("nav.contact") },
  ];
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-2 md:py-4">
        <div className="flex justify-between items-center">
          <Link href="/" onClick={closeMenu} className="text-xl md:text-2xl font-playfair font-bold text-primary transition-colors">
            Tiago Soares Silva
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  href={link.path} 
                  className={`nav-link ${location === link.path ? 'text-primary' : 'text-foreground/80'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <LanguageSwitcher />
            
            {/* Admin controls */}
            {isAuthenticated && user?.isAdmin ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = '/admin'}
                  className="text-foreground/80 hover:text-primary"
                >
                  <Settings size={16} className="mr-1" />
                  Admin
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-foreground/80 hover:text-red-600"
                >
                  <LogOut size={16} />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLogin(true)}
                className="text-foreground/80 hover:text-primary"
              >
                <Settings size={16} className="mr-1" />
                Login
              </Button>
            )}
          </div>
          
          <button 
            className="md:hidden text-foreground focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md"
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    href={link.path} 
                    className={`py-2 ${location === link.path ? 'text-primary' : 'text-foreground/80'}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <LanguageSwitcher />
                  
                  {isAuthenticated && user?.isAdmin ? (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          closeMenu();
                          window.location.href = '/admin';
                        }}
                        className="text-primary"
                      >
                        <Settings size={16} className="mr-1" />
                        Admin
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          closeMenu();
                          logout();
                        }}
                        className="text-red-600"
                      >
                        <LogOut size={16} />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        closeMenu();
                        setShowLogin(true);
                      }}
                      className="text-primary"
                    >
                      <Settings size={16} className="mr-1" />
                      Login
                    </Button>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Login Modal - Temporarily disabled */}
      {/* <AnimatePresence>
        {showLogin && (
          <AdminLogin onClose={() => setShowLogin(false)} />
        )}
      </AnimatePresence> */}
    </header>
  );
};

export default Header;
