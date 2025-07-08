import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import AdminPanel from "@/components/AdminPanel";
import { useState } from "react";

const Index = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [contentData, setContentData] = useState({
    "hero-title": "ЗАГРУЖАЙ СВОЙ КОНТЕНТ",
    "hero-description":
      "Создавай игры, видео и комиксы. Делись с сообществом. Получай рейтинги!",
    "featured-title": "ПОПУЛЯРНЫЙ КОНТЕНТ",
  });

  const handleUpdateContent = (contentId: string, newValue: string) => {
    setContentData((prev) => ({
      ...prev,
      [contentId]: newValue,
    }));
  };
  const featuredContent = [
    {
      id: 1,
      title: "Epic Quest Adventure",
      type: "game",
      rating: 4.8,
      author: "GameDev123",
      description: "Невероятная RPG с открытым миром",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Смешные Коты",
      type: "video",
      rating: 4.5,
      author: "FunnyAnimator",
      description: "Веселая анимация про котов",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Супергерой Василий",
      type: "comic",
      rating: 4.9,
      author: "ComicArtist",
      description: "Первый выпуск комикса про Василия",
      image: "/placeholder.svg",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="Star"
          size={16}
          className={`${i <= rating ? "text-newgrounds-yellow fill-newgrounds-yellow" : "text-gray-300"}`}
        />,
      );
    }
    return stars;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "game":
        return "Gamepad2";
      case "video":
        return "Play";
      case "comic":
        return "BookOpen";
      default:
        return "Star";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "game":
        return "bg-newgrounds-orange";
      case "video":
        return "bg-red-500";
      case "comic":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-newgrounds-black text-newgrounds-white">
      {/* Header */}
      <header className="bg-newgrounds-orange px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1
              className="text-3xl font-bold text-newgrounds-black"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              ENTERTAINMENT PORTAL
            </h1>
            <Badge
              variant="secondary"
              className="bg-newgrounds-yellow text-newgrounds-black font-bold"
            >
              2000s EDITION
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-6">
              <Button
                variant="ghost"
                className="text-newgrounds-black hover:bg-newgrounds-black hover:text-newgrounds-orange font-bold"
              >
                <Icon name="Home" size={20} className="mr-2" />
                ГЛАВНАЯ
              </Button>
              <Button
                variant="ghost"
                className="text-newgrounds-black hover:bg-newgrounds-black hover:text-newgrounds-orange font-bold"
              >
                <Icon name="Gamepad2" size={20} className="mr-2" />
                ИГРЫ
              </Button>
              <Button
                variant="ghost"
                className="text-newgrounds-black hover:bg-newgrounds-black hover:text-newgrounds-orange font-bold"
              >
                <Icon name="Play" size={20} className="mr-2" />
                ВИДЕО
              </Button>
              <Button
                variant="ghost"
                className="text-newgrounds-black hover:bg-newgrounds-black hover:text-newgrounds-orange font-bold"
              >
                <Icon name="BookOpen" size={20} className="mr-2" />
                КОМИКСЫ
              </Button>
            </nav>
            <Button
              onClick={() => setIsAdminMode(true)}
              className="bg-newgrounds-black text-newgrounds-orange hover:bg-gray-800 font-bold"
            >
              <Icon name="Settings" size={20} className="mr-2" />
              РЕДАКТОР
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-newgrounds-orange to-newgrounds-yellow py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2
            className="text-5xl font-bold text-newgrounds-black mb-4"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {contentData["hero-title"]}
          </h2>
          <p className="text-xl text-newgrounds-black mb-8 max-w-2xl mx-auto">
            {contentData["hero-description"]}
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-newgrounds-black text-newgrounds-orange hover:bg-gray-800 px-8 py-3 text-lg font-bold">
              <Icon name="Upload" size={24} className="mr-2" />
              ЗАГРУЗИТЬ ИГРУ
            </Button>
            <Button className="bg-newgrounds-black text-newgrounds-orange hover:bg-gray-800 px-8 py-3 text-lg font-bold">
              <Icon name="Video" size={24} className="mr-2" />
              ЗАГРУЗИТЬ ВИДЕО
            </Button>
            <Button className="bg-newgrounds-black text-newgrounds-orange hover:bg-gray-800 px-8 py-3 text-lg font-bold">
              <Icon name="PenTool" size={24} className="mr-2" />
              ЗАГРУЗИТЬ КОМИКС
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3
            className="text-3xl font-bold text-newgrounds-orange mb-12 text-center"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {contentData["featured-title"]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredContent.map((item) => (
              <Card
                key={item.id}
                className="bg-gray-900 border-newgrounds-orange border-2 hover:border-newgrounds-yellow transition-colors group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      className={`${getTypeColor(item.type)} text-white font-bold`}
                    >
                      <Icon
                        name={getTypeIcon(item.type)}
                        size={16}
                        className="mr-1"
                      />
                      {item.type.toUpperCase()}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {renderStars(item.rating)}
                      <span className="text-sm text-gray-400 ml-2">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-newgrounds-white group-hover:text-newgrounds-yellow transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    by {item.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="bg-newgrounds-orange hover:bg-orange-600 text-newgrounds-black font-bold flex-1"
                    >
                      <Icon name="Play" size={16} className="mr-2" />
                      ИГРАТЬ
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-newgrounds-orange text-newgrounds-orange hover:bg-newgrounds-orange hover:text-newgrounds-black"
                    >
                      <Icon name="Heart" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-newgrounds-orange py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h4
            className="text-2xl font-bold text-newgrounds-black mb-4"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            ПРИСОЕДИНЯЙСЯ К СООБЩЕСТВУ
          </h4>
          <p className="text-newgrounds-black mb-6 max-w-md mx-auto">
            Тысячи создателей уже делятся своими работами. Стань частью истории!
          </p>
          <Button className="bg-newgrounds-black text-newgrounds-orange hover:bg-gray-800 px-8 py-3 text-lg font-bold">
            <Icon name="Users" size={24} className="mr-2" />
            РЕГИСТРАЦИЯ
          </Button>
        </div>
      </footer>

      <AdminPanel
        isOpen={isAdminMode}
        onClose={() => setIsAdminMode(false)}
        onUpdateContent={handleUpdateContent}
      />
    </div>
  );
};

export default Index;
