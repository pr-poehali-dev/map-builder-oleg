import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import MapComponent from "@/components/MapComponent";
import { useToast } from "@/components/ui/use-toast";
import { Profile, Section } from "./types";

interface MapSectionProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  cities: Array<{ id: string; name: string; icon: string }>;
  profile: Profile;
  setActiveSection: (section: Section) => void;
  handleMarkerClick: (type: string, data: any) => void;
}

const MapSection = ({ 
  selectedCity, 
  setSelectedCity, 
  cities, 
  profile, 
  setActiveSection,
  handleMarkerClick 
}: MapSectionProps) => {
  const { toast } = useToast();

  return (
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

        {profile.friends.length > 0 && (
          <Card className="p-3 backdrop-blur-sm bg-white/95 shadow-lg animate-slide-in cursor-pointer hover:shadow-xl transition-all" 
                style={{animationDelay: '0.2s'}}
                onClick={() => setActiveSection("friends")}>
            <div className="flex items-center gap-2 mb-2">
              <div className="relative">
                <Icon name="Users" size={20} className="text-green-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <span className="font-semibold text-sm">Друзья рядом</span>
            </div>
            <div className="flex items-center gap-1">
              <Avatar className="h-6 w-6 border-2 border-white -ml-0">
                <AvatarFallback className="text-xs bg-gradient-to-br from-primary to-secondary text-white">
                  {profile.friends[0]?.name[0] || 'F'}
                </AvatarFallback>
              </Avatar>
              {profile.friends.length > 1 && (
                <Avatar className="h-6 w-6 border-2 border-white -ml-2">
                  <AvatarFallback className="text-xs bg-gradient-to-br from-secondary to-green-600 text-white">
                    {profile.friends[1]?.name[0] || 'F'}
                  </AvatarFallback>
                </Avatar>
              )}
              {profile.friends.length > 2 && (
                <div className="ml-1 text-xs text-gray-600 font-medium">+{profile.friends.length - 2}</div>
              )}
            </div>
          </Card>
        )}
      </div>

      <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-3">
        <Button 
          size="lg"
          className="rounded-full h-16 w-16 bg-gradient-to-r from-red-500 to-orange-600 shadow-2xl hover:scale-110 transition-all animate-pulse"
          onClick={() => toast({ title: "SOS", description: "Экстренный вызов активирован", variant: "destructive" })}
        >
          <Icon name="AlertCircle" size={28} />
        </Button>
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
};

export default MapSection;