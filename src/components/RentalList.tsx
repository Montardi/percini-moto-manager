import { useState } from "react";
import { Search, Filter, Edit, Eye, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RentalForm from "./RentalForm";
import RentalDetails from "./RentalDetails";

export default function RentalList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showRentalForm, setShowRentalForm] = useState(false);
  const [selectedRental, setSelectedRental] = useState<any>(null);

  // Mock data
  const rentals = [
    {
      id: 1,
      cpf: "123.456.789-10",
      customerName: "João Silva",
      phone: "(11) 99999-1111",
      bike: "Honda CB 600F",
      startDate: "2024-01-15",
      endDate: "2024-01-18",
      startKm: 15420,
      endKm: 15890,
      dailyRate: 180,
      totalValue: 540,
      daysRented: 3,
      status: "active",
      createdAt: "2024-01-15T09:00:00"
    },
    {
      id: 2,
      cpf: "987.654.321-00",
      customerName: "Maria Santos",
      phone: "(11) 98888-2222",
      bike: "Yamaha MT-07",
      startDate: "2024-01-14",
      endDate: "2024-01-16",
      startKm: 8730,
      endKm: 9120,
      dailyRate: 160,
      totalValue: 320,
      daysRented: 2,
      status: "completed",
      createdAt: "2024-01-14T14:30:00"
    },
    {
      id: 3,
      cpf: "456.789.123-45",
      customerName: "Pedro Costa",
      phone: "(11) 97777-3333",
      bike: "Kawasaki Z650",
      startDate: "2024-01-16",
      endDate: "2024-01-20",
      startKm: 12500,
      endKm: null,
      dailyRate: 170,
      totalValue: 680,
      daysRented: 4,
      status: "active",
      createdAt: "2024-01-16T11:15:00"
    },
    {
      id: 4,
      cpf: "321.654.987-88",
      customerName: "Ana Oliveira",
      phone: "(11) 96666-4444",
      bike: "Honda CBR 650R",
      startDate: "2024-01-10",
      endDate: "2024-01-12",
      startKm: 20100,
      endKm: 20450,
      dailyRate: 200,
      totalValue: 400,
      daysRented: 2,
      status: "completed",
      createdAt: "2024-01-10T08:45:00"
    },
    {
      id: 5,
      cpf: "789.123.456-33",
      customerName: "Carlos Lima",
      phone: "(11) 95555-5555",
      bike: "Yamaha XJ6",
      startDate: "2024-01-17",
      endDate: "2024-01-19",
      startKm: 35600,
      endKm: null,
      dailyRate: 150,
      totalValue: 300,
      daysRented: 2,
      status: "overdue",
      createdAt: "2024-01-17T16:20:00"
    }
  ];

  const filteredRentals = rentals.filter(rental => {
    const matchesSearch = 
      rental.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.cpf.includes(searchTerm) ||
      rental.bike.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || rental.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-green-500 text-white";
      case "overdue":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "completed":
        return "Concluído";
      case "overdue":
        return "Atrasado";
      default:
        return "Desconhecido";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Aluguéis</h2>
          <p className="text-muted-foreground">
            Visualize e gerencie todos os aluguéis de motos
          </p>
        </div>
        <Button 
          className="btn-brand"
          onClick={() => setShowRentalForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Aluguel
        </Button>
      </div>

      {/* Filters */}
      <Card className="card-brand">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome, CPF ou moto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="overdue">Atrasado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rentals List */}
      <div className="grid gap-4">
        {filteredRentals.map((rental) => (
          <Card key={rental.id} className="card-feature">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg">{rental.customerName}</h3>
                      <Badge className={getStatusColor(rental.status)}>
                        {getStatusIcon(rental.status)}
                        <span className="ml-1">{getStatusText(rental.status)}</span>
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-primary">
                        R$ {rental.totalValue.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {rental.daysRented} dia(s)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">CPF</p>
                      <p className="font-mono">{rental.cpf}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Moto</p>
                      <p className="font-medium">{rental.bike}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Período</p>
                      <p>
                        {new Date(rental.startDate).toLocaleDateString()} - {" "}
                        {rental.endDate ? new Date(rental.endDate).toLocaleDateString() : "Em aberto"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Telefone</p>
                      <p className="font-mono">{rental.phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">KM Inicial</p>
                      <p className="font-mono">{rental.startKm.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">KM Final</p>
                      <p className="font-mono">
                        {rental.endKm ? rental.endKm.toLocaleString() : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedRental(rental)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="btn-brand-outline"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRentals.length === 0 && (
        <Card className="card-brand">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum aluguel encontrado</h3>
              <p className="text-muted-foreground mb-4">
                Tente ajustar os filtros ou criar um novo aluguel
              </p>
              <Button 
                className="btn-brand"
                onClick={() => setShowRentalForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Aluguel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      {showRentalForm && (
        <RentalForm onClose={() => setShowRentalForm(false)} />
      )}
      
      {selectedRental && (
        <RentalDetails 
          rental={selectedRental} 
          onClose={() => setSelectedRental(null)} 
        />
      )}
    </div>
  );
}