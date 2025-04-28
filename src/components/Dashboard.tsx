import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { AccessLogType } from "@/types/AccessLog";
import AccessLogsDialog from "./AccessLogsDialog";
import ChangePinDialog from "./ChangePinDialog";
import FeedbackDialog from "./FeedbackDialog";
import AudioService from "@/services/audioService";
import LockerAnimation from "./LockerAnimation";

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

type CompartmentStatus = "locked" | "unlocked";

interface Compartment {
  id: string;
  name: string;
  status: CompartmentStatus;
  requiresPin?: boolean;
}

const Dashboard = ({ username, onLogout }: DashboardProps) => {
  const { toast } = useToast();
  const [compartments, setCompartments] = useState<Compartment[]>([
    { id: "common", name: "Common Compartment", status: "locked" },
    { id: "private", name: "Private Compartment (A)", status: "locked", requiresPin: true }
  ]);
  const [pinDialogOpen, setPinDialogOpen] = useState(false);
  const [changePinDialogOpen, setChangePinDialogOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [currentCompartment, setCurrentCompartment] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const [accessLogs, setAccessLogs] = useState<AccessLogType[]>([]);
  const [logsDialogOpen, setLogsDialogOpen] = useState(false);
  const [compartmentPins, setCompartmentPins] = useState({
    common: "1234",
    private: "1234"
  });

  useEffect(() => {
    AudioService.initialize();
  }, []);

  const isAnyCompartmentUnlocked = compartments.some(c => c.status === "unlocked");

  const verifyAndToggleLock = (compartment: Compartment) => {
    if (compartment.requiresPin && compartment.status === "locked") {
      setCurrentCompartment(compartment.id);
      setPinDialogOpen(true);
      AudioService.speak("Please enter your PIN");
    } else {
      toggleLock(compartment.id);
    }
  };

  const handlePinSubmit = () => {
    if (currentCompartment && pin === compartmentPins[currentCompartment as keyof typeof compartmentPins]) {
      setPinDialogOpen(false);
      setPin("");
      toggleLock(currentCompartment);
      setCurrentCompartment(null);
    } else {
      toast({
        title: "Invalid PIN",
        description: "Please try again",
        variant: "destructive",
      });
      setPin("");
    }
  };

  const toggleLock = (id: string) => {
    setCompartments(compartments.map(compartment => {
      if (compartment.id === id) {
        const newStatus = compartment.status === "locked" ? "unlocked" : "locked";
        
        toast({
          title: `Compartment ${newStatus}`,
          description: `${compartment.name} has been ${newStatus}`,
          variant: newStatus === "unlocked" ? "destructive" : "default",
        });

        AudioService.speak(`${compartment.name} ${newStatus}`);
        addAccessLog(compartment, newStatus);
        
        return {
          ...compartment,
          status: newStatus
        };
      }
      return compartment;
    }));
  };

  const addAccessLog = (compartment: Compartment, action: "locked" | "unlocked") => {
    const newLog: AccessLogType = {
      id: new Date().getTime().toString(),
      compartmentId: compartment.id,
      compartmentName: compartment.name,
      action,
      timestamp: new Date(),
      username,
    };
    setAccessLogs((prev) => [newLog, ...prev]);
  };

  const handleDecoyMode = () => {
    toast({
      title: "Decoy Mode Activated",
      description: "Decoy mode is now active",
    });
  };

  const handleViewLogs = () => {
    setLogsDialogOpen(true);
  };

  const handleChangePin = () => {
    setChangePinDialogOpen(true);
  };

  const handlePinChange = (compartmentId: string, currentPin: string, newPin: string) => {
    if (currentPin === compartmentPins[compartmentId as keyof typeof compartmentPins]) {
      setCompartmentPins(prev => ({
        ...prev,
        [compartmentId]: newPin
      }));
      
      setChangePinDialogOpen(false);
      
      toast({
        title: "PIN Changed",
        description: `PIN for ${compartmentId === 'common' ? 'Common Compartment' : 'Private Compartment'} has been updated successfully`,
      });
    } else {
      toast({
        title: "Invalid Current PIN",
        description: "The current PIN you entered is incorrect",
        variant: "destructive",
      });
    }
  };

  const handleFeedback = () => {
    setFeedbackDialogOpen(true);
  };

  const handleFeedbackSubmit = (type: string, message: string) => {
    console.log("Feedback submitted:", { type, message });
    
    setFeedbackDialogOpen(false);
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback",
    });
  };

  return (
    <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-sm">
      <LockerAnimation isOpen={isAnyCompartmentUnlocked} />
      <h1 className="text-2xl font-bold mb-8">Welcome, {username}</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {compartments.map((compartment) => (
          <div key={compartment.id} className="text-center">
            <Button
              variant="outline"
              className={`w-full mb-2 h-20 flex flex-col items-center justify-center transition-all duration-500 transform ${
                compartment.status === "unlocked" 
                  ? "border-red-500 hover:bg-red-50 scale-105" 
                  : "hover:scale-105"
              }`}
              onClick={() => verifyAndToggleLock(compartment)}
            >
              {compartment.status === "locked" ? (
                <Lock className="w-6 h-6 mb-1 transition-transform duration-500 transform" />
              ) : (
                <Unlock className="w-6 h-6 mb-1 text-red-500 transition-transform duration-500 transform rotate-12" />
              )}
              <span className={`transition-colors duration-500 ${compartment.status === "unlocked" ? "text-red-500" : ""}`}>
                {compartment.status === "locked" ? "Locked" : "Unlocked"}
              </span>
            </Button>
            <span className="text-sm text-gray-600">{compartment.name}</span>
          </div>
        ))}
      </div>

      <Dialog open={pinDialogOpen} onOpenChange={setPinDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter PIN</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <InputOTP
              value={pin}
              onChange={setPin}
              maxLength={4}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, idx) => (
                    <InputOTPSlot key={idx} {...slot} index={idx} />
                  ))}
                </InputOTPGroup>
              )}
            />
            <Button onClick={handlePinSubmit} disabled={pin.length !== 4}>
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AccessLogsDialog 
        open={logsDialogOpen}
        onOpenChange={setLogsDialogOpen}
        logs={accessLogs}
      />
      
      <ChangePinDialog
        open={changePinDialogOpen}
        onOpenChange={setChangePinDialogOpen}
        onPinChange={handlePinChange}
      />
      
      <FeedbackDialog
        open={feedbackDialogOpen}
        onOpenChange={setFeedbackDialogOpen}
        onFeedbackSubmit={handleFeedbackSubmit}
      />

      <div className="space-y-3">
        <Button variant="outline" className="w-full" onClick={handleDecoyMode}>
          <AlertTriangle className="mr-2 h-4 w-4" />
          Decoy Mode
        </Button>
        <Button variant="outline" className="w-full" onClick={handleViewLogs}>
          View Access Logs
        </Button>
        <Button variant="outline" className="w-full" onClick={handleChangePin}>
          Change PIN
        </Button>
        <Button variant="outline" className="w-full" onClick={handleFeedback}>
          Submit Feedback
        </Button>
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
