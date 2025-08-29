import { useState } from "react";
import { 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Download, 
  BarChart3, 
  PieChart,
  FileText,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("financial");

  // Mock data for reports
  const financialData = {
    totalRevenue: 89340,
    totalRentals: 267,
    averageRental: 334.5,
    growth: 12.5,
    monthlyData: [
      { month: "Jan", revenue: 15400, rentals: 42 },
      { month: "Fev", revenue: 18200, rentals: 51 },
      { month: "Mar", revenue: 22100, rentals: 67 },
      { month: "Abr", revenue: 19800, rentals: 59 },
      { month: "Mai", revenue: 13840, rentals: 48 },
    ]
  };

  const bikeData = [
    { bike: "Honda CB 600F", rentals: 45, revenue: 8100, utilization: 85 },
    { bike: "Yamaha MT-07", rentals: 38, revenue: 6080, utilization: 72 },
    { bike: "Kawasaki Z650", rentals: 42, revenue: 7140, utilization: 78 },
    { bike: "Honda CBR 650R", rentals: 35, revenue: 7000, utilization: 68 },
    { bike: "Yamaha XJ6", rentals: 40, revenue: 6000, utilization: 75 },
    { bike: "Suzuki GSX-S750", rentals: 33, revenue: 6270, utilization: 65 },
  ];

  const topCustomers = [
    { name: "João Silva", cpf: "123.456.789-10", rentals: 8, totalSpent: 2240 },
    { name: "Maria Santos", cpf: "987.654.321-00", rentals: 6, totalSpent: 1680 },
    { name: "Pedro Costa", cpf: "456.789.123-45", rentals: 7, totalSpent: 1890 },
    { name: "Ana Oliveira", cpf: "321.654.987-88", rentals: 5, totalSpent: 1400 },
    { name: "Carlos Lima", cpf: "789.123.456-33", rentals: 5, totalSpent: 1250 },
  ];

  const renderFinancialReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-feature">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              R$ {financialData.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{financialData.growth}% este mês
            </p>
          </CardContent>
        </Card>

        <Card className="card-feature">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Aluguéis</p>
                <p className="text-2xl font-bold text-primary">{financialData.totalRentals}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-feature">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ticket Médio</p>
                <p className="text-2xl font-bold text-primary">
                  R$ {financialData.averageRental.toFixed(0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-feature">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Crescimento</p>
                <p className="text-2xl font-bold text-green-500">
                  +{financialData.growth}%
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card className="card-brand">
        <CardHeader>
          <CardTitle>Performance Mensal</CardTitle>
          <CardDescription>
            Receita e número de aluguéis por mês
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {financialData.monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{data.month}</p>
                    <p className="text-sm text-muted-foreground">{data.rentals} aluguéis</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">R$ {data.revenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    R$ {(data.revenue / data.rentals).toFixed(0)} média
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBikeReport = () => (
    <div className="space-y-6">
      <Card className="card-brand">
        <CardHeader>
          <CardTitle>Performance por Moto</CardTitle>
          <CardDescription>
            Análise de utilização e receita de cada moto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {bikeData.map((bike, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{bike.bike}</h3>
                    <p className="text-sm text-muted-foreground">
                      {bike.rentals} aluguéis • R$ {bike.revenue.toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {bike.utilization}% utilização
                  </Badge>
                </div>
                <Progress value={bike.utilization} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCustomerReport = () => (
    <div className="space-y-6">
      <Card className="card-brand">
        <CardHeader>
          <CardTitle>Top Clientes</CardTitle>
          <CardDescription>
            Clientes com maior número de aluguéis e gastos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">{customer.cpf}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">R$ {customer.totalSpent.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{customer.rentals} aluguéis</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Relatórios e Análises</h2>
          <p className="text-muted-foreground">
            Insights detalhados sobre o desempenho do negócio
          </p>
        </div>
        <Button className="btn-brand">
          <Download className="w-4 h-4 mr-2" />
          Exportar PDF
        </Button>
      </div>

      {/* Filters */}
      <Card className="card-brand">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger className="w-full sm:w-48">
                <FileText className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Tipo de relatório" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="financial">Financeiro</SelectItem>
                <SelectItem value="bikes">Motos</SelectItem>
                <SelectItem value="customers">Clientes</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-48">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="quarter">Este Trimestre</SelectItem>
                <SelectItem value="year">Este Ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Report Content */}
      {selectedReport === "financial" && renderFinancialReport()}
      {selectedReport === "bikes" && renderBikeReport()}
      {selectedReport === "customers" && renderCustomerReport()}
    </div>
  );
}