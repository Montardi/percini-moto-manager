import { useState } from "react";
import { 
  Bike, 
  Plus, 
  Search, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  BarChart3,
  Clock,
  MapPin,
  FileText,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RentalForm from "./RentalForm";
import RentalList from "./RentalList";
import Reports from "./Reports";
import perciniLogo from "@/assets/percini-logo.jpg";

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showRentalForm, setShowRentalForm] = useState(false);

  // Mock data for demonstration
  const stats = {
    totalRentals: 124,
    activeRentals: 15,
    monthlyRevenue: 45670,
    averageRental: 3.2
  };

  const recentRentals = [
    {
      id: 1,
      cpf: "123.456.789-10",
      customerName: "João Silva",
      bike: "Honda CB 600F",
      startDate: "2024-01-15",
      endDate: "2024-01-18",
      startKm: 15420,
      endKm: 15890,
      value: 450,
      status: "active"
    },
    {
      id: 2,
      cpf: "987.654.321-00",
      customerName: "Maria Santos",
      bike: "Yamaha MT-07",
      startDate: "2024-01-14",
      endDate: "2024-01-16",
      startKm: 8730,
      endKm: 9120,
      value: 320,
      status: "completed"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden shadow-brand">
              <img 
                src={perciniLogo} 
                alt="PERCINI MOTOS" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-xl font-bold text-foreground">PERCINI MOTOS</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLogout}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-card border border-border">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Visão Geral</span>
            </TabsTrigger>
            <TabsTrigger value="rentals" className="flex items-center space-x-2">
              <Bike className="w-4 h-4" />
              <span>Aluguéis</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Relatórios</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-feature">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Aluguéis</CardTitle>
                  <Bike className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.totalRentals}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% em relação ao mês passado
                  </p>
                </CardContent>
              </Card>

              <Card className="card-feature">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Aluguéis Ativos</CardTitle>
                  <Clock className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.activeRentals}</div>
                  <p className="text-xs text-muted-foreground">
                    Motos em uso no momento
                  </p>
                </CardContent>
              </Card>

              <Card className="card-feature">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                  <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    R$ {stats.monthlyRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +8% em relação ao mês passado
                  </p>
                </CardContent>
              </Card>

              <Card className="card-feature">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Média de Dias</CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.averageRental}</div>
                  <p className="text-xs text-muted-foreground">
                    Duração média dos aluguéis
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Rentals */}
            <Card className="card-brand">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Aluguéis Recentes</CardTitle>
                  <CardDescription>
                    Últimas transações registradas no sistema
                  </CardDescription>
                </div>
                <Button 
                  className="btn-brand"
                  onClick={() => setShowRentalForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Aluguel
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRentals.map((rental) => (
                    <div
                      key={rental.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Bike className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{rental.customerName}</p>
                          <p className="text-sm text-muted-foreground">CPF: {rental.cpf}</p>
                          <p className="text-sm text-muted-foreground">{rental.bike}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R$ {rental.value}</p>
                        <Badge 
                          variant={rental.status === "active" ? "default" : "secondary"}
                          className={rental.status === "active" ? "bg-primary text-primary-foreground" : ""}
                        >
                          {rental.status === "active" ? "Ativo" : "Concluído"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rentals Tab */}
          <TabsContent value="rentals">
            <RentalList />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Reports />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="card-brand">
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
                <CardDescription>
                  Gerencie as configurações gerais do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Configurações em desenvolvimento...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Rental Form Modal */}
      {showRentalForm && (
        <RentalForm onClose={() => setShowRentalForm(false)} />
      )}
    </div>
  );
}