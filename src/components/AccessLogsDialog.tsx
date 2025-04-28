
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { AccessLogType } from "@/types/AccessLog";

interface AccessLogsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  logs: AccessLogType[];
}

const AccessLogsDialog = ({ open, onOpenChange, logs }: AccessLogsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Access Logs</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Compartment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{format(log.timestamp, "PPpp")}</TableCell>
                  <TableCell>{log.username}</TableCell>
                  <TableCell>{log.compartmentName}</TableCell>
                  <TableCell className={log.action === "unlocked" ? "text-red-500" : "text-green-500"}>
                    {log.action}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AccessLogsDialog;
