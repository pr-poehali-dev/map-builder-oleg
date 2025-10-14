import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const RoutesSection = () => {
  const savedRoutes = [
    { from: "Красная площадь", to: "Парк Горького", time: "15 мин", distance: "4.2 км", transport: "walk" },
    { from: "Невский проспект", to: "Эрмитаж", time: "12 мин", distance: "2.8 км", transport: "walk" },
    { from: "Казанский Кремль", to: "Улица Баумана", time: "8 мин", distance: "1.5 км", transport: "car" },
    { from: "Олимпийский парк", to: "Роза Хутор", time: "45 мин", distance: "38 км", transport: "car" },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent">
        Маршруты
      </h2>
      
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <Icon name="MapPin" size={16} className="text-green-600" />
              Откуда
            </label>
            <Input placeholder="Введите адрес отправления" className="bg-white" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <Icon name="Flag" size={16} className="text-red-600" />
              Куда
            </label>
            <Input placeholder="Введите адрес назначения" className="bg-white" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="h-20 flex-col">
              <Icon name="PersonStanding" size={24} className="mb-1" />
              <span className="text-xs">Пешком</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Icon name="Car" size={24} className="mb-1" />
              <span className="text-xs">Авто</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Icon name="Bus" size={24} className="mb-1" />
              <span className="text-xs">Общ. транспорт</span>
            </Button>
          </div>
          <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-12">
            <Icon name="Navigation" size={20} className="mr-2" />
            Построить маршрут
          </Button>
        </div>
      </Card>

      <div className="flex justify-between items-center mt-6">
        <h3 className="text-xl font-bold">Сохраненные маршруты</h3>
        <Badge>Всего: {savedRoutes.length}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedRoutes.map((route, i) => (
          <Card key={i} className="p-4 hover:shadow-lg transition-all cursor-pointer hover:scale-102">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-full">
                <Icon name={route.transport === 'walk' ? 'PersonStanding' : route.transport === 'car' ? 'Car' : 'Bus'} size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="MapPin" size={14} className="text-green-600" />
                  <span className="text-sm font-medium">{route.from}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Flag" size={14} className="text-red-600" />
                  <span className="text-sm font-medium">{route.to}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {route.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Ruler" size={12} />
                      {route.distance}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="h-8">
                    <Icon name="Play" size={14} className="mr-1" />
                    Начать
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoutesSection;
