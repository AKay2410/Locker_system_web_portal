
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onLogin, onSwitchToRegister }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-sm">
      <div className="flex flex-col items-center mb-8">
        <Lock className="w-12 h-12 text-primary mb-4" />
        <h1 className="text-2xl font-bold text-center">Smart Locker System</h1>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          Login
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          className="w-full"
          onClick={onSwitchToRegister}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
