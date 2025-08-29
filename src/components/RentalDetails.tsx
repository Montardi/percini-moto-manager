import { useState } from "react";
import { X, Calendar, User, Bike, MapPin, Clock, DollarSign, Edit, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface RentalDetailsProps {
  rental: any;
  onClose: () => void;
}

export default function RentalDetails({ rental, onClose }: RentalDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [endKm, setEndKm] = useState(rental.endKm?.toString() || "");
  const { toast } = useToast();

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

  const calculateDaysAndValue = () => {
    const startDate = new Date(rental.startDate);
    const endDate = rental.endDate ? new Date(rental.endDate) : new Date();
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalValue = diffDays * rental.dailyRate;
    
    return { days: diffDays, value: totalValue };
  };

  const { days, value } = calculateDaysAndValue();
  const kmTraveled = rental.endKm && rental.startKm ? rental.endKm - rental.startKm : null;

  const handleFinishRental = () => {
    if (!endKm || parseInt(endKm) <= rental.startKm) {
      toast({
        title: "Erro",
        description: "A quilometragem final deve ser maior que a inicial",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Aluguel finalizado!",
      description: `Aluguel de ${rental.customerName} foi finalizado com sucesso`,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="card-brand w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Bike className="w-5 h-5 text-primary" />
              <span>Detalhes do Aluguel #{rental.id}</span>
            </CardTitle>
            <CardDescription>
              Informações completas do aluguel
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

        <CardContent className="space-y-6">
          {/* Status and Actions */}
          <div className="flex justify-between items-center">
            <Badge className={`${getStatusColor(rental.status)} text-sm px-3 py-1`}>
              {getStatusText(rental.status)}
            </Badge>
            
            {rental.status === "active" && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  {isEditing ? "Cancelar" : "Finalizar"}
                </Button>
              </div>
            )}
          </div>

          <Separator />

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <User className="w-4 h-4 text-primary" />
              <span>Dados do Cliente</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <Label className="text-muted-foreground">Nome Completo</Label>
                <p className="font-medium">{rental.customerName}</p>
              </div>
              
              <div className="space-y-1">
                <Label className="text-muted-foreground">CPF</Label>
                <p className="font-mono">{rental.cpf}</p>
              </div>
              
              <div className="space-y-1">
                <Label className="text-muted-foreground">Telefone</Label>
                <p className="font-mono">{rental.phone}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Rental Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Bike className="w-4 h-4 text-primary" />
              <span>Dados do Aluguel</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-1">
                <Label className="text-muted-foreground">Moto</Label>
                <p className="font-medium">{rental.bike}</p>
              </div>
              
              <div className="space-y-1">
                <Label className="text-muted-foreground">Valor Diária</Label>
                <p className="font-medium">R$ {rental.dailyRate}</p>
              </div>
              
              <div className="space-y-1">
                <Label className="text-muted-foreground">Data de Início</Label>
                <p className="font-mono">{new Date(rental.startDate).toLocaleDateString()}</p>
              </div>
              
              <div className="space-y-1">
                <Label className="text-muted-foreground">Data de Término</Label>
                <p className="font-mono">
                  {rental.endDate ? new Date(rental.endDate).toLocaleDateString() : "Em aberto"}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Mileage Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Quilometragem</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <Label className="text-muted-foreground">KM Inicial</Label>
                <p className="font-mono text-lg">{rental.startKm.toLocaleString()}</p>
              </div>
              
              <div className="space-y-1">
                <Label className="text-muted-foreground">KM Final</Label>
                {isEditing && rental.status === "active" ? (
                  <Input
                    type="number"
                    value={endKm}
                    onChange={(e) => setEndKm(e.target.value)}
                    placeholder="Digite a quilometragem final"
                    className="font-mono"
                    min={rental.startKm + 1}
                  />
                ) : (
                  <p className="font-mono text-lg">
                    {rental.endKm ? rental.endKm.toLocaleString() : "N/A"}
                  </p>
                )}
              </div>
              
              <div className="space-y-1">
                <Label className="text-muted-foreground">KM Rodados</Label>
                <p className="font-mono text-lg font-semibold text-primary">
                  {kmTraveled ? kmTraveled.toLocaleString() : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span>Resumo Financeiro</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <Label className="text-muted-foreground">Dias Alugados</Label>
                <p className="text-2xl font-bold text-primary">{days}</p>
              </div>
              
              <div className="space-y-1">
                <Label className="text-muted-foreground">Valor por Dia</Label>
                <p className="text-lg font-medium">R$ {rental.dailyRate}</p>
              </div>
              
              <div className="space-y-1">
                <Label className="text-muted-foreground">Valor Total</Label>
                <p className="text-2xl font-bold text-primary">R$ {value.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && rental.status === "active" && (
            <>
              <Separator />
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="btn-brand"
                  onClick={handleFinishRental}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Finalizar Aluguel
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}