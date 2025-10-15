import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Profile } from "./types";

interface ProfileSectionProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  onLogout?: () => void;
}

const ProfileSection = ({ profile, setProfile, onLogout }: ProfileSectionProps) => {
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
            localStorage.removeItem('userProfile');
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