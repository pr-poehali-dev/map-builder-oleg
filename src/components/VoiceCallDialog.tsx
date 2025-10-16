import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";

interface VoiceCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CallStatus = "idle" | "connecting" | "ringing" | "talking" | "ended";

const VoiceCallDialog = ({ open, onOpenChange }: VoiceCallDialogProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (callStatus === "talking") {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callStatus]);

  useEffect(() => {
    if (open && callStatus === "idle") {
      setCallStatus("connecting");
      
      setTimeout(() => {
        setCallStatus("ringing");
      }, 1500);

      setTimeout(() => {
        setCallStatus("talking");
      }, 5000);
    }
  }, [open, callStatus]);

  const handleEndCall = () => {
    setCallStatus("ended");
    setTimeout(() => {
      setCallStatus("idle");
      setCallDuration(0);
      onOpenChange(false);
    }, 2000);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = () => {
    switch (callStatus) {
      case "connecting":
        return "Подключение...";
      case "ringing":
        return "Ожидание ответа...";
      case "talking":
        return "На связи";
      case "ended":
        return "Звонок завершен";
      default:
        return "";
    }
  };

  const getStatusColor = () => {
    switch (callStatus) {
      case "connecting":
        return "text-yellow-600";
      case "ringing":
        return "text-blue-600";
      case "talking":
        return "text-green-600";
      case "ended":
        return "text-gray-600";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen && callStatus === "talking") {
        handleEndCall();
      } else {
        onOpenChange(newOpen);
      }
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center ${callStatus === "ringing" ? "animate-pulse" : ""}`}>
                <Icon name="Phone" size={48} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Горячая линия</h3>
                <p className={`text-sm font-semibold ${getStatusColor()}`}>
                  {getStatusText()}
                </p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {callStatus === "ringing" && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-3">
                <Icon name="Music" size={24} className="text-blue-600 animate-pulse" />
                <p className="text-sm text-blue-800">
                  Играет музыка ожидания...
                </p>
              </div>
            </Card>
          )}

          {callStatus === "talking" && (
            <>
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Bot" size={24} className="text-green-600" />
                  <p className="font-semibold text-green-800">
                    Виртуальный ассистент
                  </p>
                </div>
                <p className="text-sm text-green-800">
                  Здравствуйте! Я виртуальный помощник горячей линии ВетКарты. Чем могу помочь?
                </p>
              </Card>

              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  {formatDuration(callDuration)}
                </div>
                <p className="text-sm text-gray-600 mt-1">Длительность звонка</p>
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  variant={isMuted ? "default" : "outline"}
                  size="lg"
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-20 h-20 rounded-full"
                >
                  <Icon name={isMuted ? "MicOff" : "Mic"} size={28} />
                </Button>
              </div>
            </>
          )}

          {callStatus === "ended" && (
            <Card className="p-6 bg-gray-50 text-center">
              <Icon name="CheckCircle" size={48} className="mx-auto mb-3 text-green-600" />
              <p className="text-lg font-semibold">Спасибо за звонок!</p>
              <p className="text-sm text-gray-600 mt-2">
                Длительность: {formatDuration(callDuration)}
              </p>
            </Card>
          )}

          {(callStatus === "talking" || callStatus === "connecting" || callStatus === "ringing") && (
            <Button
              variant="destructive"
              size="lg"
              onClick={handleEndCall}
              className="w-full h-16 text-lg font-semibold"
            >
              <Icon name="PhoneOff" size={24} className="mr-2" />
              Завершить звонок
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceCallDialog;
