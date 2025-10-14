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
  const [step, setStep] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateRegistration = () => {
    if (!formData.firstName || !formData.lastName) {
      toast({
        title: "Ошибка",
        description: "Введите имя и фамилию",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email || !formData.email.includes("@")) {
      toast({
        title: "Ошибка",
        description: "Введите корректный email",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.phone || formData.phone.length < 10) {
      toast({
        title: "Ошибка",
        description: "Введите корректный номер телефона",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      toast({
        title: "Ошибка",
        description: "Пароль должен быть не менее 6 символов",
        variant: "destructive",
      });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (step === "register") {
      if (!validateRegistration()) return;
      
      const user = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        initials: `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase(),
      };
      
      localStorage.setItem("userProfile", JSON.stringify(user));
      
      toast({
        title: "Успешно!",
        description: "Регистрация завершена",
      });
      
      onComplete(user);
    } else {
      if (!formData.email || !formData.password) {
        toast({
          title: "Ошибка",
          description: "Введите email и пароль",
          variant: "destructive",
        });
        return;
      }
      
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        const user = JSON.parse(savedProfile);
        onComplete(user);
        toast({
          title: "Добро пожаловать!",
          description: "Вход выполнен успешно",
        });
      } else {
        toast({
          title: "Ошибка",
          description: "Пользователь не найден. Зарегистрируйтесь!",
          variant: "destructive",
        });
      }
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
            {step === "register" ? "Создайте аккаунт" : "Войдите в систему"}
          </p>
        </div>

        <div className="space-y-4">
          {step === "register" ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    placeholder="Иван"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    placeholder="Иванов"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Электронная почта</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ivan@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Придумайте пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Минимум 6 символов"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Повторите пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Введите пароль еще раз"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className="mt-1"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="email">Электронная почта</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ivan@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="mt-1"
                />
              </div>
            </>
          )}

          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-6 text-lg"
            onClick={handleSubmit}
          >
            {step === "register" ? "Зарегистрироваться" : "Войти"}
          </Button>

          <div className="text-center">
            <button
              onClick={() => setStep(step === "login" ? "register" : "login")}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {step === "register" ? (
                <span>Уже есть аккаунт? <span className="font-semibold text-blue-600">Войти</span></span>
              ) : (
                <span>Нет аккаунта? <span className="font-semibold text-green-600">Зарегистрироваться</span></span>
              )}
            </button>
          </div>
        </div>
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
