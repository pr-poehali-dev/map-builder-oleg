import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useToast } from "@/components/ui/use-toast";
import { Profile } from "./types";

interface ProfileSectionProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  onLogin?: (user: any) => void;
  onLogout?: () => void;
  isGuest?: boolean;
}

const ProfileSection = ({ profile, setProfile, onLogin, onLogout, isGuest }: ProfileSectionProps) => {
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "register">("register");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (mode === "register") {
      if (!formData.name || formData.name.trim().length < 2) {
        toast({
          title: "Ошибка",
          description: "Введите ваше имя",
          variant: "destructive",
        });
        return false;
      }
    }
    
    if (!formData.phone || formData.phone.length < 10) {
      toast({
        title: "Ошибка",
        description: "Введите корректный номер телефона",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    if (mode === "login") {
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        try {
          const user = JSON.parse(savedProfile);
          if (user.phone === formData.phone) {
            if (onLogin) {
              onLogin(user);
            }
            toast({
              title: "Добро пожаловать!",
              description: `Рады видеть вас снова, ${user.name}`,
            });
          } else {
            toast({
              title: "Ошибка",
              description: "Неверный номер телефона",
              variant: "destructive",
            });
          }
        } catch (error) {
          toast({
            title: "Ошибка",
            description: "Пользователь не найден",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Ошибка",
          description: "Аккаунт не найден. Зарегистрируйтесь!",
          variant: "destructive",
        });
      }
    } else {
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts[1] || '';
      
      const newUser = {
        name: formData.name.trim(),
        phone: formData.phone,
        email: `${formData.phone}@vetkarty.ru`,
        initials: lastName 
          ? `${firstName[0]}${lastName[0]}`.toUpperCase()
          : `${firstName[0]}${firstName[1] || ''}`.toUpperCase(),
        friends: [],
      };
      
      setProfile(newUser);
      
      if (onLogin) {
        onLogin(newUser);
      }
      
      toast({
        title: "Добро пожаловать!",
        description: "Регистрация завершена",
      });
      
      setFormData({ name: "", phone: "" });
    }
  };

  if (isGuest) {
    return (
      <div className="space-y-4 animate-fade-in max-w-md mx-auto">
        <Card className="p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl mb-4">
              <Icon name="User" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold">Профиль</h2>
            <p className="text-gray-500 mt-2">
              {mode === "register" ? "Создайте аккаунт" : "Войдите в систему"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "register" && (
              <div>
                <Label htmlFor="name">Ваше имя</Label>
                <Input
                  id="name"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="mt-1"
                  autoFocus
                />
              </div>
            )}

            <div>
              <Label htmlFor="phone">Номер телефона</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="mt-1"
                autoFocus={mode === "login"}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-6 text-lg"
            >
              {mode === "register" ? "Зарегистрироваться" : "Войти"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setFormData({ name: "", phone: "" });
                }}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {mode === "register" ? (
                  <span>Уже есть аккаунт? <span className="font-semibold text-blue-600">Войти</span></span>
                ) : (
                  <span>Нет аккаунта? <span className="font-semibold text-green-600">Зарегистрироваться</span></span>
                )}
              </button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return (
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
          <div className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <Icon name="Users" size={24} className="mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{profile.friends.length}</p>
            <p className="text-sm text-gray-600">Друзей</p>
          </div>
          <div className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <Icon name="Route" size={24} className="mx-auto mb-2 text-secondary" />
            <p className="text-2xl font-bold">42</p>
            <p className="text-sm text-gray-600">Маршрутов</p>
          </div>
          <div className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <Icon name="MapPin" size={24} className="mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold">89</p>
            <p className="text-sm text-gray-600">Меток</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <Icon name="Trophy" size={24} className="text-yellow-600" />
          Достижения
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: "Star", label: "Первый друг", unlocked: true },
            { icon: "Map", label: "10 маршрутов", unlocked: true },
            { icon: "Camera", label: "Просмотр камер", unlocked: true },
            { icon: "Award", label: "100 км", unlocked: false },
          ].map((achievement, i) => (
            <div key={i} className={`p-4 rounded-lg text-center transition-all ${achievement.unlocked ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' : 'bg-gray-200 opacity-50'}`}>
              <Icon name={achievement.icon as any} size={32} className="mx-auto mb-2" />
              <p className="text-xs font-medium">{achievement.label}</p>
            </div>
          ))}
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
        <Button 
          variant="destructive" 
          className="w-full mt-4 h-12"
          onClick={() => {
            if (onLogout) {
              onLogout();
            }
          }}
        >
          <Icon name="LogOut" size={20} className="mr-2" />
          Выйти из аккаунта
        </Button>
      </Card>
    </div>
  );
};

export default ProfileSection;