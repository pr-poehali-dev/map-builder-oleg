import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const CamerasSection = () => {
  const cameras = [
    { id: 1, name: "Красная площадь", location: "Москва, центр", status: "online", viewers: 1234 },
    { id: 2, name: "Невский проспект", location: "Санкт-Петербург", status: "online", viewers: 892 },
    { id: 3, name: "Казанский Кремль", location: "Казань", status: "online", viewers: 456 },
    { id: 4, name: "Олимпийский парк", location: "Сочи", status: "offline", viewers: 0 },
    { id: 5, name: "Плотинка", location: "Екатеринбург", status: "online", viewers: 678 },
    { id: 6, name: "Набережная", location: "Москва", status: "online", viewers: 2341 },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Камеры наблюдения
        </h2>
        <div className="flex gap-2">
          <Badge className="bg-green-500">Онлайн: {cameras.filter(c => c.status === 'online').length}</Badge>
          <Badge variant="outline">Всего: {cameras.length}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cameras.map((camera) => (
          <Card key={camera.id} className="overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
            <div className="h-40 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center relative group">
              <Icon name="Video" size={48} className="text-white opacity-50 group-hover:opacity-100 transition-opacity" />
              {camera.status === 'online' ? (
                <>
                  <Badge className="absolute top-2 right-2 bg-red-500 animate-pulse flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    LIVE
                  </Badge>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-white text-xs flex items-center gap-1">
                    <Icon name="Eye" size={12} />
                    {camera.viewers}
                  </div>
                </>
              ) : (
                <Badge className="absolute top-2 right-2 bg-gray-500">Оффлайн</Badge>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black hover:bg-white/90">
                  <Icon name="Play" size={16} className="mr-1" />
                  Смотреть
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{camera.name}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Icon name="MapPin" size={14} />
                {camera.location}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 mt-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-full">
            <Icon name="Info" size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">О камерах наблюдения</h3>
            <p className="text-gray-600 text-sm mb-3">
              Все камеры работают в режиме реального времени и помогают отслеживать обстановку в ключевых точках городов.
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Icon name="Bell" size={16} className="mr-1" />
                Настроить уведомления
              </Button>
              <Button size="sm" variant="outline">
                <Icon name="Download" size={16} className="mr-1" />
                Записи
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CamerasSection;
