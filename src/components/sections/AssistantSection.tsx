import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useToast } from "@/components/ui/use-toast";

const AssistantSection = () => {
  const { toast } = useToast();
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-accent to-orange-500 mb-4 animate-pulse-slow">
          <Icon name="MessageSquare" size={48} className="text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-2">Привет! Я Олег</h2>
        <p className="text-gray-600">Ваш голосовой помощник для навигации</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="flex items-center gap-4 mb-4">
          <Button
            size="lg"
            className={`rounded-full h-16 w-16 ${
              isVoiceActive 
                ? "bg-red-500 animate-pulse" 
                : "bg-gradient-to-r from-accent to-orange-500"
            }`}
            onClick={() => setIsVoiceActive(!isVoiceActive)}
          >
            <Icon name={isVoiceActive ? "MicOff" : "Mic"} size={28} className="text-white" />
          </Button>
          <div className="flex-1">
            <Input 
              placeholder="Спросите Олега или нажмите на микрофон..."
              className="bg-white text-lg"
            />
          </div>
        </div>
        {isVoiceActive && (
          <div className="flex items-center gap-2 text-red-500 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-sm font-medium">Слушаю...</span>
          </div>
        )}
      </Card>

      <div>
        <h3 className="text-lg font-bold mb-3">Быстрые команды</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Где я?", icon: "MapPin", color: "from-blue-500 to-cyan-500" },
            { label: "Маршрут", icon: "Navigation", color: "from-green-500 to-emerald-500" },
            { label: "Камеры", icon: "Video", color: "from-purple-500 to-pink-500" },
            { label: "Друзья рядом", icon: "Users", color: "from-orange-500 to-red-500" },
            { label: "Погода", icon: "CloudRain", color: "from-sky-500 to-blue-500" },
            { label: "Пробки", icon: "Car", color: "from-red-500 to-orange-500" },
            { label: "Заправки", icon: "Fuel", color: "from-yellow-500 to-amber-500" },
            { label: "Помощь", icon: "LifeBuoy", color: "from-pink-500 to-rose-500" },
          ].map((cmd, i) => (
            <Button
              key={i}
              variant="outline"
              className="h-24 flex-col hover:scale-105 transition-all hover:shadow-lg group"
              onClick={() => toast({ title: cmd.label, description: "Функция в разработке" })}
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${cmd.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                <Icon name={cmd.icon as any} size={24} className="text-white" />
              </div>
              <span className="text-xs font-medium">{cmd.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Icon name="Sparkles" size={20} className="text-accent" />
          Возможности Олега
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <Icon name="Check" size={16} className="text-green-600 mt-1" />
            <span>Голосовая навигация и подсказки</span>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="Check" size={16} className="text-green-600 mt-1" />
            <span>Поиск мест и построение маршрутов</span>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="Check" size={16} className="text-green-600 mt-1" />
            <span>Уведомления о пробках</span>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="Check" size={16} className="text-green-600 mt-1" />
            <span>Поиск друзей поблизости</span>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="Check" size={16} className="text-green-600 mt-1" />
            <span>Информация о погоде</span>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="Check" size={16} className="text-green-600 mt-1" />
            <span>Экстренная помощь SOS</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AssistantSection;
