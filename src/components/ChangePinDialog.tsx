
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ChangePinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPinChange: (compartmentId: string, currentPin: string, newPin: string) => void;
}

const ChangePinDialog = ({ open, onOpenChange, onPinChange }: ChangePinDialogProps) => {
  const [step, setStep] = useState<"select" | "current" | "new" | "confirm">("select");
  const [selectedCompartment, setSelectedCompartment] = useState<string>("");
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (step === "select") {
      setStep("current");
    } else if (step === "current") {
      setStep("new");
    } else if (step === "new") {
      setStep("confirm");
    }
  };

  const handleSubmit = () => {
    if (newPin !== confirmPin) {
      setError("PINs don't match. Please try again.");
      setNewPin("");
      setConfirmPin("");
      setStep("new");
      return;
    }

    onPinChange(selectedCompartment, currentPin, newPin);
    resetForm();
  };

  const resetForm = () => {
    setStep("select");
    setSelectedCompartment("");
    setCurrentPin("");
    setNewPin("");
    setConfirmPin("");
    setError(null);
  };

  const onDialogOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={onDialogOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change PIN</DialogTitle>
          <DialogDescription>
            {step === "select" && "Select which compartment PIN you want to change."}
            {step === "current" && "Please enter your current PIN."}
            {step === "new" && "Enter your new PIN."}
            {step === "confirm" && "Confirm your new PIN."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          {error && <p className="text-destructive text-sm">{error}</p>}

          {step === "select" && (
            <>
              <div className="w-full space-y-2">
                <Label>Select Compartment</Label>
                <Select
                  value={selectedCompartment}
                  onValueChange={setSelectedCompartment}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select compartment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="common">Common Compartment</SelectItem>
                    <SelectItem value="private">Private Compartment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleNext} disabled={!selectedCompartment}>
                Next
              </Button>
            </>
          )}

          {step === "current" && (
            <>
              <InputOTP
                value={currentPin}
                onChange={setCurrentPin}
                maxLength={4}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, idx) => (
                      <InputOTPSlot key={idx} {...slot} index={idx} />
                    ))}
                  </InputOTPGroup>
                )}
              />
              <Button onClick={handleNext} disabled={currentPin.length !== 4}>
                Next
              </Button>
            </>
          )}

          {step === "new" && (
            <>
              <InputOTP
                value={newPin}
                onChange={setNewPin}
                maxLength={4}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, idx) => (
                      <InputOTPSlot key={idx} {...slot} index={idx} />
                    ))}
                  </InputOTPGroup>
                )}
              />
              <Button onClick={handleNext} disabled={newPin.length !== 4}>
                Next
              </Button>
            </>
          )}

          {step === "confirm" && (
            <>
              <InputOTP
                value={confirmPin}
                onChange={setConfirmPin}
                maxLength={4}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, idx) => (
                      <InputOTPSlot key={idx} {...slot} index={idx} />
                    ))}
                  </InputOTPGroup>
                )}
              />
              <Button onClick={handleSubmit} disabled={confirmPin.length !== 4}>
                Change PIN
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePinDialog;
