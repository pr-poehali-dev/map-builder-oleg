import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Profile, Friend } from "./types";

interface FriendsSectionProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const FriendsSection = ({ profile, setProfile }: FriendsSectionProps) => {
  const { toast } = useToast();
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");
  const [newFriendPhone, setNewFriendPhone] = useState("");
  const [newFriendLocation, setNewFriendLocation] = useState("");

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

  return (
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
};

export default FriendsSection;
