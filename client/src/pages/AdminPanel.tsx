import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  MessageSquare, 
  Calendar, 
  Music, 
  Image, 
  Globe, 
  Palette,
  Settings,
  Shield,
  Database
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user?.isAdmin)) {
      toast({
        title: "Acesso Negado",
        description: "Você precisa ser um administrador para acessar esta página",
        variant: "destructive"
      });
      // Redirect to home after showing toast
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  }, [isAuthenticated, user, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return null;
  }

  const adminSections = [
    {
      id: 'profile',
      title: 'Perfil & Biografia',
      description: 'Gerencie informações pessoais e biografia',
      icon: User,
      color: 'bg-blue-500'
    },
    {
      id: 'gallery',
      title: 'Galeria de Fotos',
      description: 'Upload e organize fotos do portfólio',
      icon: Image,
      color: 'bg-green-500'
    },
    {
      id: 'discography',
      title: 'Discografia & Reviews',
      description: 'Gerencie álbuns, faixas e reviews',
      icon: Music,
      color: 'bg-purple-500'
    },
    {
      id: 'events',
      title: 'Eventos & Concertos',
      description: 'Adicione e edite eventos futuros',
      icon: Calendar,
      color: 'bg-orange-500'
    },
    {
      id: 'messages',
      title: 'Mensagens de Contato',
      description: 'Visualize mensagens recebidas',
      icon: MessageSquare,
      color: 'bg-red-500'
    },
    {
      id: 'translations',
      title: 'Traduções',
      description: 'Gerencie conteúdo em múltiplos idiomas',
      icon: Globe,
      color: 'bg-indigo-500'
    },
    {
      id: 'design',
      title: 'Cores & Design',
      description: 'Personalize a aparência do site',
      icon: Palette,
      color: 'bg-pink-500'
    },
    {
      id: 'system',
      title: 'Configurações do Sistema',
      description: 'Configurações avançadas e backup',
      icon: Settings,
      color: 'bg-gray-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-background to-background/95 py-12"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-playfair text-primary mb-2">
            Painel Administrativo
          </h1>
          <p className="text-xl text-muted-foreground">
            Bem-vindo, {user.firstName || user.username}! Gerencie todo o conteúdo do seu portfólio.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <h3 className="font-semibold">Status</h3>
              <p className="text-sm text-muted-foreground">Online</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Database className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <h3 className="font-semibold">Database</h3>
              <p className="text-sm text-muted-foreground">Conectado</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <h3 className="font-semibold">Idiomas</h3>
              <p className="text-sm text-muted-foreground">2 ativos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <User className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h3 className="font-semibold">Admin</h3>
              <p className="text-sm text-muted-foreground">{user.username}</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adminSections.map((section) => {
            const IconComponent = section.icon;
            
            return (
              <motion.div
                key={section.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${section.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {section.description}
                    </p>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => {
                        toast({
                          title: "Em desenvolvimento",
                          description: `A seção "${section.title}" será implementada em breve.`,
                        });
                      }}
                    >
                      Gerenciar
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <Shield className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">Login realizado com sucesso</p>
                  <p className="text-sm text-muted-foreground">Agora mesmo</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <Database className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">Sistema administrativo ativado</p>
                  <p className="text-sm text-muted-foreground">Sistema pronto para uso</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Painel Administrativo - Portfólio Tiago Soares Silva
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminPanel;