import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
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
import { Section, Profile } from "@/components/sections/types";
import MapSection from "@/components/sections/MapSection";
import CamerasSection from "@/components/sections/CamerasSection";
import FriendsSection from "@/components/sections/FriendsSection";
import RoutesSection from "@/components/sections/RoutesSection";
import AssistantSection from "@/components/sections/AssistantSection";
import ProfileSection from "@/components/sections/ProfileSection";

interface IndexProps {
  user?: any;
}

const Index = ({ user }: IndexProps) => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<Section>("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState<Profile>({
    name: user?.name || "Ваш профиль",
    email: user?.email || "vk@vetkarty.ru",
    initials: user?.initials || "ВК",
    friends: []
  });
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
    const savedProfile = localStorage.getItem('vetkarty_profile');
    if (savedProfile) {
      try {
        const saved = JSON.parse(savedProfile);
        setProfile(prev => ({
          ...prev,
          name: user?.name || prev.name,
          email: user?.email || prev.email,
          initials: user?.initials || prev.initials,
          friends: saved.friends || []
        }));
      } catch (error) {
        // Ошибка загрузки профиля
      }
    } else if (user) {
      setProfile(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        initials: user.initials
      }));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vetkarty_profile', JSON.stringify({ friends: profile.friends }));
  }, [profile.friends]);

  const menuItems = [
    { id: "map" as Section, label: "Карта", icon: "Map" },
    { id: "cameras" as Section, label: "Камеры", icon: "Video" },
    { id: "friends" as Section, label: "Друзья", icon: "Users" },
    { id: "routes" as Section, label: "Маршруты", icon: "Route" },
    { id: "assistant" as Section, label: "Олег", icon: "MessageSquare" },
    { id: "profile" as Section, label: "Профиль", icon: "User" },
  ];

  const handleMarkerClick = useCallback((type: string, data: any) => {
    if (type === 'place') {
      toast({
        title: data.name,
        description: `${data.description} • Посетителей: ${data.visitors}`
      });
    } else if (type === 'camera') {
      toast({
        title: "Трансляция камеры",
        description: `Открываю ${data.name}...`
      });
    } else if (type === 'friend') {
      toast({
        title: data.name,
        description: "Открываю чат..."
      });
    }
  }, [toast]);

  const renderContent = () => {
    switch (activeSection) {
      case "map":
        return (
          <MapSection
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            cities={cities}
            profile={profile}
            setActiveSection={setActiveSection}
            handleMarkerClick={handleMarkerClick}
          />
        );
      case "cameras":
        return <CamerasSection />;
      case "friends":
        return <FriendsSection profile={profile} setProfile={setProfile} />;
      case "routes":
        return <RoutesSection />;
      case "assistant":
        return <AssistantSection />;
      case "profile":
        return <ProfileSection profile={profile} setProfile={setProfile} />;
      default:
        return (
          <MapSection
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            cities={cities}
            profile={profile}
            setActiveSection={setActiveSection}
            handleMarkerClick={handleMarkerClick}
          />
        );
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