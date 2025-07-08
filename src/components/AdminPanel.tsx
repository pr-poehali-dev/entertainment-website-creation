import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: "image" | "gif";
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateContent: (contentId: string, newData: any) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  onUpdateContent,
}) => {
  const [activeTab, setActiveTab] = useState("media");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [editingContent, setEditingContent] = useState<any>(null);

  // Примеры медиа-файлов (в реальном проекте они будут загружаться из базы данных)
  const mediaGallery: MediaItem[] = [
    {
      id: "1",
      url: "/img/6605f14e-db0f-40b4-a7d9-3b5f3fd8e75d.jpg",
      name: "Epic Quest Game",
      type: "image",
    },
    {
      id: "2",
      url: "/img/47461bea-58e2-4283-9c32-71a4bf12f996.jpg",
      name: "Funny Cats Animation",
      type: "image",
    },
    {
      id: "3",
      url: "/img/94166d73-1958-451f-a7a7-8eccb6d4a0ae.jpg",
      name: "Superhero Vasiliy",
      type: "image",
    },
    {
      id: "4",
      url: "/placeholder.svg",
      name: "Placeholder Image",
      type: "image",
    },
  ];

  const handleMediaSelect = (media: MediaItem) => {
    setSelectedMedia(media);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // В реальном проекте здесь будет загрузка файла на сервер
      console.log("Загружаем файл:", file.name);
    }
  };

  const contentItems = [
    {
      id: "hero-title",
      title: "Заголовок Hero-секции",
      currentValue: "ЗАГРУЖАЙ СВОЙ КОНТЕНТ",
      type: "text",
    },
    {
      id: "hero-description",
      title: "Описание Hero-секции",
      currentValue:
        "Создавай игры, видео и комиксы. Делись с сообществом. Получай рейтинги!",
      type: "textarea",
    },
    {
      id: "featured-title",
      title: "Заголовок популярного контента",
      currentValue: "ПОПУЛЯРНЫЙ КОНТЕНТ",
      type: "text",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] w-full mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            Панель администратора
          </h2>
          <Button variant="ghost" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 border-r bg-gray-50 p-4">
            <nav className="space-y-2">
              <Button
                variant={activeTab === "media" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("media")}
              >
                <Icon name="Image" size={20} className="mr-2" />
                Медиа-галерея
              </Button>
              <Button
                variant={activeTab === "content" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("content")}
              >
                <Icon name="Edit" size={20} className="mr-2" />
                Редактор контента
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Icon name="Settings" size={20} className="mr-2" />
                Настройки
              </Button>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "media" && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Медиа-галерея</h3>
                  <div className="flex space-x-2">
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button asChild>
                        <span>
                          <Icon name="Upload" size={20} className="mr-2" />
                          Загрузить файл
                        </span>
                      </Button>
                    </Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*,.gif"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {mediaGallery.map((media) => (
                    <Card
                      key={media.id}
                      className={`cursor-pointer transition-all ${
                        selectedMedia?.id === media.id
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => handleMediaSelect(media)}
                    >
                      <CardContent className="p-2">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                          <img
                            src={media.url}
                            alt={media.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium truncate">
                            {media.name}
                          </p>
                          <Badge
                            variant={
                              media.type === "gif" ? "default" : "secondary"
                            }
                          >
                            {media.type.toUpperCase()}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedMedia && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Выбранное изображение</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <img
                          src={selectedMedia.url}
                          alt={selectedMedia.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{selectedMedia.name}</p>
                          <p className="text-sm text-gray-500">
                            {selectedMedia.type}
                          </p>
                          <p className="text-sm text-gray-500 break-all">
                            {selectedMedia.url}
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedMedia.url);
                            alert("URL скопирован в буфер обмена!");
                          }}
                        >
                          <Icon name="Copy" size={16} className="mr-2" />
                          Копировать URL
                        </Button>
                        <Button variant="outline">
                          <Icon
                            name="ExternalLink"
                            size={16}
                            className="mr-2"
                          />
                          Использовать в дизайне
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === "content" && (
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6">
                  Редактор контента
                </h3>
                <div className="space-y-6">
                  {contentItems.map((item) => (
                    <Card key={item.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {item.type === "text" ? (
                          <div className="space-y-4">
                            <div>
                              <Label>Текущее значение:</Label>
                              <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                {item.currentValue}
                              </p>
                            </div>
                            <div>
                              <Label htmlFor={item.id}>Новое значение:</Label>
                              <Input
                                id={item.id}
                                defaultValue={item.currentValue}
                                className="mt-1"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div>
                              <Label>Текущее значение:</Label>
                              <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                {item.currentValue}
                              </p>
                            </div>
                            <div>
                              <Label htmlFor={item.id}>Новое значение:</Label>
                              <Textarea
                                id={item.id}
                                defaultValue={item.currentValue}
                                className="mt-1"
                                rows={3}
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex space-x-2 mt-4">
                          <Button
                            onClick={() => {
                              const input = document.getElementById(
                                item.id,
                              ) as HTMLInputElement;
                              if (input) {
                                onUpdateContent(item.id, input.value);
                                alert("Контент обновлен!");
                              }
                            }}
                          >
                            <Icon name="Save" size={16} className="mr-2" />
                            Сохранить
                          </Button>
                          <Button variant="outline">
                            <Icon name="RotateCcw" size={16} className="mr-2" />
                            Отменить
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6">Настройки сайта</h3>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Цветовая схема</CardTitle>
                      <CardDescription>
                        Настройте основные цвета сайта
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="primary-color">Основной цвет</Label>
                          <Input
                            id="primary-color"
                            type="color"
                            defaultValue="#FF6600"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="secondary-color">
                            Дополнительный цвет
                          </Label>
                          <Input
                            id="secondary-color"
                            type="color"
                            defaultValue="#000000"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Шрифты</CardTitle>
                      <CardDescription>Настройка типографики</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="font-family">Семейство шрифтов</Label>
                          <select
                            id="font-family"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          >
                            <option value="Arial, sans-serif">Arial</option>
                            <option value="Helvetica, sans-serif">
                              Helvetica
                            </option>
                            <option value="Georgia, serif">Georgia</option>
                            <option value="Times New Roman, serif">
                              Times New Roman
                            </option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
