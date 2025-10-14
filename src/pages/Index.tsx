import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Section = "map" | "cameras" | "friends" | "routes" | "assistant" | "profile";

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const menuItems = [
    { id: "map" as Section, label: "Карта", icon: "Map" },
    { id: "cameras" as Section, label: "Камеры", icon: "Video" },
    { id: "friends" as Section, label: "Друзья", icon: "Users" },
    { id: "routes" as Section, label: "Маршруты", icon: "Route" },
    { id: "assistant" as Section, label: "Олег", icon: "MessageSquare" },
    { id: "profile" as Section, label: "Профиль", icon: "User" },
  ];

  const renderMapSection = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="relative inline-block">
            <Icon name="MapPin" size={80} className="text-primary animate-pulse-slow" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full animate-ping"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-700">Интерактивная карта</h3>
          <p className="text-gray-600">Москва и Санкт-Петербург</p>
          <div className="flex gap-3 justify-center mt-4">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all">
              <Icon name="Navigation" size={18} className="mr-2" />
              Построить маршрут
            </Button>
            <Button variant="outline" className="border-2 hover:scale-105 transition-transform">
              <Icon name="Search" size={18} className="mr-2" />
              Поиск места
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 space-y-3">
        <Card className="p-3 backdrop-blur-sm bg-white/90 shadow-lg animate-slide-in">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="MapPin" size={20} className="text-primary" />
            <span className="font-semibold text-sm">Москва</span>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-green-500">Онлайн</Badge>
            <Badge variant="outline">156 друзей</Badge>
          </div>
        </Card>

        <Card className="p-3 backdrop-blur-sm bg-white/90 shadow-lg animate-slide-in" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Video" size={20} className="text-secondary" />
            <span className="font-semibold text-sm">12 камер</span>
          </div>
          <p className="text-xs text-gray-600">в пределах 5 км</p>
        </Card>
      </div>

      <div className="absolute bottom-4 right-4">
        <Button 
          size="lg"
          className="rounded-full h-16 w-16 bg-gradient-to-r from-accent to-orange-500 shadow-2xl hover:scale-110 transition-all"
          onClick={() => setActiveSection("assistant")}
        >
          <Icon name="Mic" size={28} />
        </Button>
      </div>
    </div>
  );

  const renderCamerasSection = () => (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Камеры наблюдения
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden hover:shadow-xl transition-all hover:scale-105">
            <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center relative">
              <Icon name="Video" size={48} className="text-white opacity-50" />
              <Badge className="absolute top-2 right-2 bg-red-500 animate-pulse">LIVE</Badge>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">Камера #{i}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Icon name="MapPin" size={14} />
                Москва, центр
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderFriendsSection = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary to-green-600 bg-clip-text text-transparent">
          Друзья
        </h2>
        <Button className="bg-gradient-to-r from-primary to-secondary">
          <Icon name="UserPlus" size={18} className="mr-2" />
          Добавить друга
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "Анна Иванова", status: "онлайн", location: "Москва" },
          { name: "Петр Смирнов", status: "офлайн", location: "СПб" },
          { name: "Мария Петрова", status: "онлайн", location: "Москва" },
          { name: "Иван Сидоров", status: "онлайн", location: "СПб" },
        ].map((friend, i) => (
          <Card key={i} className="p-4 hover:shadow-lg transition-all hover:scale-102">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-14 w-14 border-2 border-primary">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                    {friend.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                  friend.status === "онлайн" ? "bg-green-500" : "bg-gray-400"
                }`}></div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{friend.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Icon name="MapPin" size={12} />
                  {friend.location}
                </p>
              </div>
              <Button variant="outline" size="sm" className="hover:scale-110 transition-transform">
                <Icon name="MessageCircle" size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRoutesSection = () => (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent">
        Маршруты
      </h2>
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Откуда</label>
            <Input placeholder="Введите адрес отправления" className="bg-white" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Куда</label>
            <Input placeholder="Введите адрес назначения" className="bg-white" />
          </div>
          <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-12">
            <Icon name="Navigation" size={20} className="mr-2" />
            Построить маршрут
          </Button>
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {[
          { from: "Красная площадь", to: "Парк Горького", time: "15 мин", distance: "4.2 км" },
          { from: "Невский проспект", to: "Эрмитаж", time: "12 мин", distance: "2.8 км" },
        ].map((route, i) => (
          <Card key={i} className="p-4 hover:shadow-lg transition-all">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-full">
                <Icon name="Route" size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="MapPin" size={14} className="text-primary" />
                  <span className="text-sm font-medium">{route.from}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Flag" size={14} className="text-secondary" />
                  <span className="text-sm font-medium">{route.to}</span>
                </div>
                <div className="flex gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    {route.time}
                  </span>
                  <span>{route.distance}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAssistantSection = () => (
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Где я?", icon: "MapPin" },
          { label: "Маршрут", icon: "Navigation" },
          { label: "Камеры", icon: "Video" },
          { label: "Друзья", icon: "Users" },
        ].map((cmd, i) => (
          <Button
            key={i}
            variant="outline"
            className="h-20 flex-col hover:scale-105 transition-all hover:border-accent"
          >
            <Icon name={cmd.icon as any} size={24} className="mb-2" />
            <span className="text-sm">{cmd.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  const renderProfileSection = () => (
    <div className="space-y-4 animate-fade-in">
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-3xl font-bold">
              ВК
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-3xl font-bold mb-1">Ваш профиль</h2>
            <p className="text-gray-600">vk@vetkarty.ru</p>
            <Badge className="mt-2 bg-green-500">Активный</Badge>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white rounded-lg">
            <Icon name="Users" size={24} className="mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-gray-600">Друзей</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <Icon name="Route" size={24} className="mx-auto mb-2 text-secondary" />
            <p className="text-2xl font-bold">42</p>
            <p className="text-sm text-gray-600">Маршрутов</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <Icon name="MapPin" size={24} className="mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold">89</p>
            <p className="text-sm text-gray-600">Меток</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-xl mb-4">Настройки</h3>
        <div className="space-y-3">
          {[
            { label: "Редактировать профиль", icon: "Edit" },
            { label: "Уведомления", icon: "Bell" },
            { label: "Конфиденциальность", icon: "Shield" },
            { label: "Помощь", icon: "HelpCircle" },
          ].map((item, i) => (
            <Button
              key={i}
              variant="outline"
              className="w-full justify-start h-12 hover:bg-primary/5 hover:border-primary transition-all"
            >
              <Icon name={item.icon as any} size={20} className="mr-3" />
              {item.label}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "map":
        return renderMapSection();
      case "cameras":
        return renderCamerasSection();
      case "friends":
        return renderFriendsSection();
      case "routes":
        return renderRoutesSection();
      case "assistant":
        return renderAssistantSection();
      case "profile":
        return renderProfileSection();
      default:
        return renderMapSection();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Icon name="Map" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Вет Карты
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Поиск на карте..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-gray-50"
              />
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-6">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveSection(item.id)}
                  >
                    <Icon name={item.icon as any} size={20} className="mr-3" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex gap-6">
        <aside className="hidden md:block w-64 shrink-0">
          <Card className="p-4 sticky top-24">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className={`w-full justify-start transition-all ${
                    activeSection === item.id 
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105" 
                      : "hover:scale-102"
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <Icon name={item.icon as any} size={20} className="mr-3" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </Card>
        </aside>

        <main className="flex-1 min-h-[calc(100vh-8rem)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
