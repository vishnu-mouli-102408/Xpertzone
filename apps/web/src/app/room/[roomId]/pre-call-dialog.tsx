import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Progress } from "@repo/ui/components/progress";
import { Clock } from "lucide-react";

import { formatTimeRemaining } from "../../utils";

interface PreCallDialogProps {
  open: boolean;
  onClose: () => void;
  progress: number;
  timeRemaining: number;
  callStarted: boolean;
}

const PreCallDialog = ({
  open,
  onClose,
  progress,
  timeRemaining,
  callStarted,
}: PreCallDialogProps) => {
  return (
    <Dialog open={open && !callStarted} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-white/10 bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Call Starts Soon
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Your session with the expert will begin shortly
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="flex items-center justify-center gap-3">
            <Clock className="h-10 w-10 text-blue-400" />
            <div className="text-4xl font-bold text-white">
              {formatTimeRemaining(timeRemaining)}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Waiting</span>
              <span>Call Starts</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="rounded-lg bg-black/30 p-4 text-center">
            <p className="text-gray-300">
              Please ensure your camera and microphone are ready before the call
              starts.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreCallDialog;
