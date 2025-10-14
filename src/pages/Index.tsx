import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import MapComponent from "@/components/MapComponent";
import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Section = "map" | "cameras" | "friends" | "routes" | "assistant" | "profile";

interface Friend {
  id: string;
  name: string;
  phone: string;
  status: "онлайн" | "офлайн";
  location: string;
}

interface Profile {
  name: string;
  email: string;
  initials: string;
  friends: Friend[];
}

interface IndexProps {
  user?: any;
}

const Index = ({ user }: IndexProps) => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<Section>("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: user?.name || "Ваш профиль",
    email: user?.email || "vk@vetkarty.ru",
    initials: user?.initials || "ВК",
    friends: []
  });
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");
  const [newFriendPhone, setNewFriendPhone] = useState("");
  const [newFriendLocation, setNewFriendLocation] = useState("");
  const [isHotlineOpen, setIsHotlineOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("moscow");

  const cities = useMemo(() => [
    { id: "moscow", name: "Москва", icon: "Building" },
    { id: "spb", name: "Санкт-Петербург", icon: "Landmark" },
    { id: "kazan", name: "Казань", icon: "Church" },
    { id: "sochi", name: "Сочи", icon: "Palmtree" },
    { id: "ekb", name: "Екатеринбург", icon: "Mountain" },
  ], []);

  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        initials: user.initials
      }));
    }
    const savedProfile = localStorage.getItem('vetkarty_profile');
    if (savedProfile) {
      try {
        const saved = JSON.parse(savedProfile);
        setProfile(prev => ({
          ...prev,
          friends: saved.friends || []
        }));
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vetkarty_profile', JSON.stringify(profile));
  }, [profile]);

  const menuItems = [
    { id: "map" as Section, label: "Карта", icon: "Map" },
    { id: "cameras" as Section, label: "Камеры", icon: "Video" },
    { id: "friends" as Section, label: "Друзья", icon: "Users" },
    { id: "routes" as Section, label: "Маршруты", icon: "Route" },
    { id: "assistant" as Section, label: "Олег", icon: "MessageSquare" },
    { id: "profile" as Section, label: "Профиль", icon: "User" },
  ];

  const handleMarkerClick = useCallback((type: string, data: any) => {
    console.log('Clicked:', type, data);
  }, []);

  const renderMapSection = () => (
    <div className="relative w-full h-[calc(100vh-12rem)]">
      <MapComponent onMarkerClick={handleMarkerClick} city={selectedCity} />
      
      <div className="absolute top-4 left-4 space-y-3 z-[1000] pointer-events-auto">
        <Card className="p-4 backdrop-blur-sm bg-white/95 shadow-lg animate-slide-in">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="MapPin" size={20} className="text-primary" />
            <span className="font-semibold">Выберите город</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {cities.map((city) => (
              <Button
                key={city.id}
                variant={selectedCity === city.id ? "default" : "outline"}
                size="sm"
                className={`justify-start transition-all ${
                  selectedCity === city.id 
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md" 
                    : "hover:border-primary"
                }`}
                onClick={() => setSelectedCity(city.id)}
              >
                <Icon name={city.icon as any} size={16} className="mr-2" />
                {city.name}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <Badge className="bg-green-500">Онлайн</Badge>
            <Badge variant="outline">{profile.friends.length} друзей</Badge>
          </div>
        </Card>

        <Card className="p-3 backdrop-blur-sm bg-white/95 shadow-lg animate-slide-in" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Video" size={20} className="text-secondary" />
            <span className="font-semibold text-sm">12 камер</span>
          </div>
          <p className="text-xs text-gray-600">в пределах 5 км</p>
        </Card>
      </div>

      <div className="absolute bottom-4 right-4 z-[1000]">
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

  const handleAddFriend = () => {
    if (!newFriendName.trim() || !newFriendPhone.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните имя и номер телефона",
        variant: "destructive"
      });
      return;
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(newFriendPhone.replace(/[\s\-()]/g, ''))) {
      toast({
        title: "Ошибка",
        description: "Введите корректный номер телефона",
        variant: "destructive"
      });
      return;
    }

    const newFriend: Friend = {
      id: Date.now().toString(),
      name: newFriendName.trim(),
      phone: newFriendPhone.trim(),
      status: "офлайн",
      location: newFriendLocation.trim() || "Не указано"
    };

    setProfile(prev => ({
      ...prev,
      friends: [...prev.friends, newFriend]
    }));

    toast({
      title: "Успешно!",
      description: `${newFriendName} добавлен в друзья`
    });

    setNewFriendName("");
    setNewFriendPhone("");
    setNewFriendLocation("");
    setIsAddFriendOpen(false);
  };

  const handleRemoveFriend = (friendId: string) => {
    setProfile(prev => ({
      ...prev,
      friends: prev.friends.filter(f => f.id !== friendId)
    }));
    toast({
      title: "Удалено",
      description: "Друг удален из списка"
    });
  };

  const renderFriendsSection = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary to-green-600 bg-clip-text text-transparent">
          Друзья
        </h2>
        <Dialog open={isAddFriendOpen} onOpenChange={setIsAddFriendOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Icon name="UserPlus" size={18} className="mr-2" />
              Добавить друга
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить друга</DialogTitle>
              <DialogDescription>
                Введите данные друга для добавления в список
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  placeholder="Иван Иванов"
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Номер телефона *</Label>
                <Input
                  id="phone"
                  placeholder="+7 900 123-45-67"
                  value={newFriendPhone}
                  onChange={(e) => setNewFriendPhone(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="location">Город</Label>
                <Input
                  id="location"
                  placeholder="Москва"
                  value={newFriendLocation}
                  onChange={(e) => setNewFriendLocation(e.target.value)}
                />
              </div>
              <Button onClick={handleAddFriend} className="w-full bg-gradient-to-r from-primary to-secondary">
                Добавить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {profile.friends.length === 0 ? (
        <Card className="p-8 text-center">
          <Icon name="Users" size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">У вас пока нет друзей</p>
          <Button onClick={() => setIsAddFriendOpen(true)} className="bg-gradient-to-r from-primary to-secondary">
            <Icon name="UserPlus" size={18} className="mr-2" />
            Добавить первого друга
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.friends.map((friend) => (
            <Card key={friend.id} className="p-4 hover:shadow-lg transition-all hover:scale-102">
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
                  <p className="text-xs text-gray-500">{friend.phone}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    {friend.location}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="hover:scale-110 transition-transform">
                    <Icon name="MessageCircle" size={16} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleRemoveFriend(friend.id)} className="hover:scale-110 transition-transform hover:border-red-500 hover:text-red-500">
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
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
              {profile.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              className="text-3xl font-bold mb-2 border-0 p-0 focus-visible:ring-0"
            />
            <Input
              value={profile.email}
              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              className="text-gray-600 border-0 p-0 focus-visible:ring-0"
            />
            <Badge className="mt-2 bg-green-500">Активный</Badge>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white rounded-lg">
            <Icon name="Users" size={24} className="mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{profile.friends.length}</p>
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
            <Dialog open={isHotlineOpen} onOpenChange={setIsHotlineOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold gap-2">
                  <Icon name="Phone" size={18} />
                  Горячая линия
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Icon name="Phone" size={28} className="text-red-500" />
                    Горячая линия поддержки
                  </DialogTitle>
                  <DialogDescription>
                    Свяжитесь с нами любым удобным способом - мы всегда на связи!
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-4 bg-red-500 rounded-full">
                        <Icon name="Phone" size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">Круглосуточная поддержка</h3>
                        <p className="text-gray-600">Работаем 24/7 без выходных</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <a href="tel:88005553535" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all">
                        <Icon name="Phone" size={20} className="text-red-500" />
                        <div>
                          <p className="font-semibold">8 (800) 555-35-35</p>
                          <p className="text-sm text-gray-600">Звонок бесплатный</p>
                        </div>
                      </a>
                      <a href="mailto:support@vetkarty.ru" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all">
                        <Icon name="Mail" size={20} className="text-blue-500" />
                        <div>
                          <p className="font-semibold">support@vetkarty.ru</p>
                          <p className="text-sm text-gray-600">Ответим в течение часа</p>
                        </div>
                      </a>
                      <a href="https://t.me/vetkarty_support" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all">
                        <Icon name="MessageCircle" size={20} className="text-blue-400" />
                        <div>
                          <p className="font-semibold">@vetkarty_support</p>
                          <p className="text-sm text-gray-600">Telegram чат поддержки</p>
                        </div>
                      </a>
                      <a href="https://wa.me/79991234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all">
                        <Icon name="MessageSquare" size={20} className="text-green-500" />
                        <div>
                          <p className="font-semibold">+7 (999) 123-45-67</p>
                          <p className="text-sm text-gray-600">WhatsApp поддержка</p>
                        </div>
                      </a>
                    </div>
                  </Card>

                  <div className="grid grid-cols-3 gap-3">
                    <Card className="p-4 text-center hover:shadow-lg transition-all">
                      <Icon name="Clock" size={32} className="mx-auto mb-2 text-primary" />
                      <p className="font-semibold">24/7</p>
                      <p className="text-xs text-gray-600">Поддержка</p>
                    </Card>
                    <Card className="p-4 text-center hover:shadow-lg transition-all">
                      <Icon name="Users" size={32} className="mx-auto mb-2 text-secondary" />
                      <p className="font-semibold">50+</p>
                      <p className="text-xs text-gray-600">Операторов</p>
                    </Card>
                    <Card className="p-4 text-center hover:shadow-lg transition-all">
                      <Icon name="Zap" size={32} className="mx-auto mb-2 text-accent" />
                      <p className="font-semibold">2 мин</p>
                      <p className="text-xs text-gray-600">Отклик</p>
                    </Card>
                  </div>

                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Icon name="Info" size={18} className="text-blue-500" />
                      Популярные вопросы
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-green-500 mt-0.5" />
                        <span>Как добавить друга на карту?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-green-500 mt-0.5" />
                        <span>Как построить маршрут между городами?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-green-500 mt-0.5" />
                        <span>Как подключить камеры наблюдения?</span>
                      </li>
                    </ul>
                  </Card>
                </div>
              </DialogContent>
            </Dialog>
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