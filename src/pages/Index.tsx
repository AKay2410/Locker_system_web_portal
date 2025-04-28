
import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import Dashboard from '@/components/Dashboard';

type AuthMode = 'login' | 'register' | 'dashboard';

const Index = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [user, setUser] = useState<{ username: string } | null>(null);

  const handleLogin = (username: string, password: string) => {
    // Very basic client-side login simulation
    if (username && password) {
      setUser({ username });
      setAuthMode('dashboard');
    } else {
      alert('Invalid login credentials');
    }
  };

  const handleRegister = (username: string, password: string, email: string) => {
    // Basic client-side registration simulation
    if (username && password && email) {
      setUser({ username });
      setAuthMode('dashboard');
    } else {
      alert('Please fill in all registration fields');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setAuthMode('login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {authMode === 'login' && (
        <LoginForm 
          onLogin={handleLogin}
          onSwitchToRegister={() => setAuthMode('register')}
        />
      )}
      {authMode === 'register' && (
        <RegisterForm 
          onRegister={handleRegister}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      )}
      {authMode === 'dashboard' && user && (
        <Dashboard onLogout={handleLogout} username={user.username} />
      )}
    </div>
  );
};

export default Index;
