import { useState } from "react";
import { X, Calendar, User, Bike, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface RentalFormProps {
  onClose: () => void;
}

export default function RentalForm({ onClose }: RentalFormProps) {
  const [formData, setFormData] = useState({
    cpf: "",
    customerName: "",
    phone: "",
    bike: "",
    startDate: "",
    endDate: "",
    startKm: "",
    dailyRate: "",
  });

  const { toast } = useToast();

  const bikes = [
    "Honda CB 600F",
    "Yamaha MT-07",
    "Kawasaki Z650",
    "Honda CBR 650R",
    "Yamaha XJ6",
    "Suzuki GSX-S750",
  ];

  const dailyRates = {
    "Honda CB 600F": 180,
    "Yamaha MT-07": 160,
    "Kawasaki Z650": 170,
    "Honda CBR 650R": 200,
    "Yamaha XJ6": 150,
    "Suzuki GSX-S750": 190,
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === "bike" && value ? { dailyRate: dailyRates[value as keyof typeof dailyRates].toString() } : {})
    }));
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.cpf || !formData.customerName || !formData.bike || !formData.startDate || !formData.startKm) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    // Simulate saving
    toast({
      title: "Aluguel registrado com sucesso!",
      description: `Aluguel para ${formData.customerName} foi criado`,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="card-brand w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Bike className="w-5 h-5 text-primary" />
              <span>Novo Aluguel</span>
            </CardTitle>
            <CardDescription>
              Registre um novo aluguel de moto
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <User className="w-4 h-4 text-primary" />
                <span>Dados do Cliente</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    maxLength={14}
                    value={formData.cpf}
                    onChange={(e) => handleInputChange("cpf", formatCPF(e.target.value))}
                    className="font-mono"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customerName">Nome Completo *</Label>
                  <Input
                    id="customerName"
                    placeholder="Nome do cliente"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", formatPhone(e.target.value))}
                    className="font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Rental Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Bike className="w-4 h-4 text-primary" />
                <span>Dados do Aluguel</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bike">Moto *</Label>
                  <Select value={formData.bike} onValueChange={(value) => handleInputChange("bike", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a moto" />
                    </SelectTrigger>
                    <SelectContent>
                      {bikes.map((bike) => (
                        <SelectItem key={bike} value={bike}>
                          {bike}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dailyRate">Valor Diária (R$)</Label>
                  <Input
                    id="dailyRate"
                    type="number"
                    placeholder="0.00"
                    value={formData.dailyRate}
                    onChange={(e) => handleInputChange("dailyRate", e.target.value)}
                    className="font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Data de Início *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">Data de Término</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    min={formData.startDate}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startKm">Quilometragem Inicial *</Label>
                  <Input
                    id="startKm"
                    type="number"
                    placeholder="0"
                    value={formData.startKm}
                    onChange={(e) => handleInputChange("startKm", e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="btn-brand"
              >
                Registrar Aluguel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}