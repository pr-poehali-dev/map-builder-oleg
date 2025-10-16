import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoiceCallDialog from "@/components/VoiceCallDialog";
import { Profile } from "./types";

interface Post {
  id: number;
  author: {
    name: string;
    avatar?: string;
    initials: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

interface Channel {
  id: number;
  name: string;
  category: string;
  subscribers: number;
  isSubscribed: boolean;
  avatar: string;
}

interface Friend {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "online" | "offline";
  initials: string;
}

interface SocialSectionProps {
  profile: Profile;
}

const SocialSection = ({ profile }: SocialSectionProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("feed");
  const [newPost, setNewPost] = useState("");
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [friendPhone, setFriendPhone] = useState("");
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: { name: "Мария Петрова", initials: "МП" },
      content: "Отличная прогулка сегодня! Погода супер ☀️",
      likes: 24,
      comments: 5,
      timestamp: "2 часа назад",
      isLiked: false,
    },
    {
      id: 2,
      author: { name: "Иван Сидоров", initials: "ИС" },
      content: "Кто-нибудь знает хороший маршрут для вечерней пробежки?",
      likes: 12,
      comments: 8,
      timestamp: "5 часов назад",
      isLiked: true,
    },
  ]);

  const [channels, setChannels] = useState<Channel[]>([
    { id: 1, name: "Новости города", category: "Новости", subscribers: 15240, isSubscribed: true, avatar: "📰" },
    { id: 2, name: "Спорт и фитнес", category: "Спорт", subscribers: 8950, isSubscribed: false, avatar: "🏃" },
    { id: 3, name: "Путешествия", category: "Досуг", subscribers: 12100, isSubscribed: true, avatar: "✈️" },
    { id: 4, name: "Технологии", category: "IT", subscribers: 22500, isSubscribed: false, avatar: "💻" },
  ]);

  const [friends, setFriends] = useState<Friend[]>([
    { id: 1, name: "Анна Смирнова", email: "anna@example.com", phone: "+7 999 123-45-67", status: "online", initials: "АС" },
    { id: 2, name: "Петр Иванов", email: "petr@example.com", phone: "+7 999 234-56-78", status: "online", initials: "ПИ" },
    { id: 3, name: "Ольга Козлова", email: "olga@example.com", phone: "+7 999 345-67-89", status: "offline", initials: "ОК" },
  ]);

  const handleCreatePost = () => {
    if (!newPost.trim()) {
      toast({
        title: "Ошибка",
        description: "Напишите текст поста",
        variant: "destructive",
      });
      return;
    }

    const post: Post = {
      id: Date.now(),
      author: {
        name: profile.name,
        initials: profile.initials,
      },
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: "Только что",
      isLiked: false,
    };

    setPosts([post, ...posts]);
    setNewPost("");
    toast({
      title: "Успех!",
      description: "Пост опубликован",
    });
  };

  const handleLikePost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSubscribeChannel = (channelId: number) => {
    setChannels(channels.map(channel =>
      channel.id === channelId
        ? { ...channel, isSubscribed: !channel.isSubscribed, subscribers: channel.isSubscribed ? channel.subscribers - 1 : channel.subscribers + 1 }
        : channel
    ));
    
    const channel = channels.find(c => c.id === channelId);
    toast({
      title: channel?.isSubscribed ? "Отписка" : "Подписка",
      description: channel?.isSubscribed ? `Вы отписались от "${channel.name}"` : `Вы подписались на "${channel?.name}"`,
    });
  };

  const handleAddFriend = () => {
    if (!friendEmail && !friendPhone) {
      toast({
        title: "Ошибка",
        description: "Укажите email или телефон",
        variant: "destructive",
      });
      return;
    }

    const newFriend: Friend = {
      id: Date.now(),
      name: friendEmail || friendPhone,
      email: friendEmail,
      phone: friendPhone,
      status: "offline",
      initials: (friendEmail || friendPhone).substring(0, 2).toUpperCase(),
    };

    setFriends([...friends, newFriend]);
    setFriendEmail("");
    setFriendPhone("");
    setIsAddFriendOpen(false);
    
    toast({
      title: "Запрос отправлен",
      description: "Ожидайте подтверждения дружбы",
    });
  };

  const handleCallFriend = (friend: Friend) => {
    setSelectedFriend(friend);
    setIsCallDialogOpen(true);
    toast({
      title: "Звонок",
      description: `Звоним ${friend.name}...`,
    });
  };

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    channel.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-fade-in">
      <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-4 border-white">
            <AvatarFallback className="bg-white text-purple-600 text-xl font-bold">
              {profile.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <div className="flex gap-4 mt-2">
              <div className="text-sm">
                <span className="font-bold">{friends.length}</span> друзей
              </div>
              <div className="text-sm">
                <span className="font-bold">{channels.filter(c => c.isSubscribed).length}</span> подписок
              </div>
              <div className="text-sm">
                <span className="font-bold">{posts.filter(p => p.author.name === profile.name).length}</span> постов
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed">
            <Icon name="Home" size={18} className="mr-2" />
            Лента
          </TabsTrigger>
          <TabsTrigger value="friends">
            <Icon name="Users" size={18} className="mr-2" />
            Друзья
          </TabsTrigger>
          <TabsTrigger value="channels">
            <Icon name="Tv" size={18} className="mr-2" />
            Каналы
          </TabsTrigger>
          <TabsTrigger value="create">
            <Icon name="Plus" size={18} className="mr-2" />
            Создать
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4 mt-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  {post.author.avatar ? (
                    <AvatarImage src={post.author.avatar} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      {post.author.initials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-bold">{post.author.name}</h3>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-4">{post.content}</p>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikePost(post.id)}
                      className={post.isLiked ? "text-red-500" : ""}
                    >
                      <Icon name={post.isLiked ? "Heart" : "Heart"} size={18} className="mr-2" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MessageCircle" size={18} className="mr-2" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Share2" size={18} className="mr-2" />
                      Поделиться
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="friends" className="space-y-4 mt-4">
          <div className="flex gap-2">
            <Dialog open={isAddFriendOpen} onOpenChange={setIsAddFriendOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                  <Icon name="UserPlus" size={18} className="mr-2" />
                  Добавить друга
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить друга</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      placeholder="friend@example.com"
                      value={friendEmail}
                      onChange={(e) => setFriendEmail(e.target.value)}
                    />
                  </div>
                  <div className="text-center text-gray-500">или</div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон</label>
                    <Input
                      placeholder="+7 999 123-45-67"
                      value={friendPhone}
                      onChange={(e) => setFriendPhone(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleAddFriend} className="w-full">
                    Отправить запрос
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {friends.map((friend) => (
              <Card key={friend.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white">
                        {friend.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${friend.status === "online" ? "bg-green-500" : "bg-gray-400"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{friend.name}</h3>
                    <p className="text-sm text-gray-600">{friend.email}</p>
                    <Badge className={friend.status === "online" ? "bg-green-500" : "bg-gray-400"}>
                      {friend.status === "online" ? "В сети" : "Не в сети"}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    onClick={() => handleCallFriend(friend)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-500"
                  >
                    <Icon name="Phone" size={16} className="mr-2" />
                    Позвонить
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Написать
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4 mt-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Поиск каналов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredChannels.map((channel) => (
              <Card key={channel.id} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{channel.avatar}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{channel.name}</h3>
                    <Badge variant="outline" className="mb-2">{channel.category}</Badge>
                    <p className="text-sm text-gray-600 mb-3">
                      {channel.subscribers.toLocaleString()} подписчиков
                    </p>
                    <Button
                      onClick={() => handleSubscribeChannel(channel.id)}
                      variant={channel.isSubscribed ? "outline" : "default"}
                      className={channel.isSubscribed ? "" : "bg-gradient-to-r from-purple-500 to-pink-500"}
                    >
                      <Icon name={channel.isSubscribed ? "Check" : "Plus"} size={16} className="mr-2" />
                      {channel.isSubscribed ? "Подписан" : "Подписаться"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-4 mt-4">
          <Card className="p-6">
            <h3 className="font-bold text-xl mb-4">Создать пост</h3>
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  {profile.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Что у вас нового?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Image" size={18} className="mr-2" />
                  Фото
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Video" size={18} className="mr-2" />
                  Видео
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="MapPin" size={18} className="mr-2" />
                  Место
                </Button>
              </div>
              <Button
                onClick={handleCreatePost}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <Icon name="Send" size={18} className="mr-2" />
                Опубликовать
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <VoiceCallDialog 
        open={isCallDialogOpen} 
        onOpenChange={setIsCallDialogOpen}
      />
    </div>
  );
};

export default SocialSection;
