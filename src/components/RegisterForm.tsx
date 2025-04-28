
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

interface RegisterFormProps {
  onRegister: (username: string, password: string, email: string) => void;
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onRegister, onSwitchToLogin }: RegisterFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onRegister(username, password, email);
  };

  return (
    <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-sm">
      <div className="flex flex-col items-center mb-8">
        <Lock className="w-12 h-12 text-primary mb-4" />
        <h1 className="text-2xl font-bold text-center">Create Account</h1>
      </div>
      
      <form onSubmit={handleRegister} className="space-y-4">
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          Register
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          className="w-full"
          onClick={onSwitchToLogin}
        >
          Back to Login
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
