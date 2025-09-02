import { useAuth } from '@/contexts/AuthContext';
import AuthPage from './AuthPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return <AuthPage />;
  }

  // Check if user is gestor or admin
  if (profile.tipo_usuario !== 'gestor' && profile.tipo_usuario !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-destructive mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground mb-6">
            Você não tem permissão para acessar este sistema. 
            Apenas gestores têm acesso ao painel administrativo.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-brand px-6 py-2 rounded-lg"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}