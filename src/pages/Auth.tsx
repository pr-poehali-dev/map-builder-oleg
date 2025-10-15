import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useToast } from "@/components/ui/use-toast";

interface AuthProps {
  onComplete: (user: any) => void;
}

const Auth = ({ onComplete }: AuthProps) => {
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
            onComplete(user);
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
      
      const user = {
        name: formData.name.trim(),
        phone: formData.phone,
        initials: lastName 
          ? `${firstName[0]}${lastName[0]}`.toUpperCase()
          : `${firstName[0]}${firstName[1] || ''}`.toUpperCase(),
      };
      
      localStorage.setItem("userProfile", JSON.stringify(user));
      
      toast({
        title: "Добро пожаловать!",
        description: "Регистрация завершена",
      });
      
      onComplete(user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl mb-4">
            <Icon name="Map" size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Вет Карты
          </h1>
          <p className="text-gray-500 mt-2">
            {mode === "register" ? "Создайте аккаунт для продолжения" : "Войдите в систему"}
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
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-6 text-lg mt-6"
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

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Auth;
