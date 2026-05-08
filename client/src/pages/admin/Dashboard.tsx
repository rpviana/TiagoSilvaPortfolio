import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">
        <h1 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">
          Painel de Controlo
        </h1>
        <Button variant="outline" className="w-full sm:w-auto">
          Criar Novo Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-blue-500">👤</span> Biografia / Sobre
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Edite a sua biografia nos idiomas configurados (PT e EN).
            </p>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Gerir Biografia
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-green-500">🗓️</span> Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Pode adicionar, remover ou editar datas de concertos e tours.
            </p>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              Gerir Eventos
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-red-500">🎵</span> Discografia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Adicione os seus álbuns, faixas, e links de compra (em PT e EN).
            </p>
            <Button className="w-full bg-red-500 hover:bg-red-600">
              Gerir Discografia
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
