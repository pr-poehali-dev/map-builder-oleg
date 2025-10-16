import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MapComponentProps {
  city?: string;
  onMarkerClick?: (type: string, data: any) => void;
}

interface Marker {
  id: string;
  type: 'camera' | 'friend' | 'place';
  name: string;
  x: number;
  y: number;
  status?: string;
  description?: string;
}

const MapComponent = ({ city = 'moscow', onMarkerClick }: MapComponentProps) => {
  const [zoom, setZoom] = useState(1);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  
  const cityCoords: Record<string, { name: string; lat: number; lng: number }> = {
    moscow: { name: 'Москва', lat: 55.7558, lng: 37.6173 },
    spb: { name: 'Санкт-Петербург', lat: 59.9343, lng: 30.3351 },
    kazan: { name: 'Казань', lat: 55.8304, lng: 49.0661 },
    sochi: { name: 'Сочи', lat: 43.5855, lng: 39.7231 },
    ekb: { name: 'Екатеринбург', lat: 56.8389, lng: 60.6057 },
  };

  const currentCity = cityCoords[city] || cityCoords.moscow;

  const markers: Record<string, Marker[]> = {
    moscow: [
      { id: '1', type: 'camera', name: 'Красная площадь', x: 50, y: 45, status: 'online' },
      { id: '2', type: 'camera', name: 'Тверская улица', x: 48, y: 42, status: 'online' },
      { id: '3', type: 'friend', name: 'Анна', x: 55, y: 50, description: 'В 2 км от вас' },
      { id: '4', type: 'friend', name: 'Иван', x: 45, y: 48, description: 'Онлайн' },
      { id: '5', type: 'place', name: 'Парк Горького', x: 52, y: 55, description: 'Популярное место' },
      { id: '6', type: 'place', name: 'МГУ', x: 40, y: 60, description: 'Университет' },
    ],
    spb: [
      { id: '1', type: 'camera', name: 'Невский проспект', x: 50, y: 45, status: 'online' },
      { id: '2', type: 'friend', name: 'Ольга', x: 55, y: 50, description: 'В 1 км от вас' },
      { id: '3', type: 'place', name: 'Эрмитаж', x: 48, y: 43, description: 'Музей' },
    ],
    kazan: [
      { id: '1', type: 'camera', name: 'Казанский Кремль', x: 50, y: 45, status: 'online' },
      { id: '2', type: 'place', name: 'Кул-Шариф', x: 51, y: 46, description: 'Мечеть' },
    ],
    sochi: [
      { id: '1', type: 'camera', name: 'Олимпийский парк', x: 50, y: 55, status: 'offline' },
      { id: '2', type: 'place', name: 'Роза Хутор', x: 45, y: 40, description: 'Горнолыжный курорт' },
    ],
    ekb: [
      { id: '1', type: 'camera', name: 'Плотинка', x: 50, y: 45, status: 'online' },
      { id: '2', type: 'place', name: 'Ельцин Центр', x: 52, y: 48, description: 'Музей' },
    ],
  };

  const currentMarkers = markers[city] || markers.moscow;

  const handleMarkerClick = (marker: Marker) => {
    setSelectedMarker(marker);
    if (onMarkerClick) {
      onMarkerClick(marker.type, marker);
    }
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'camera': return 'bg-blue-500';
      case 'friend': return 'bg-green-500';
      case 'place': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'camera': return 'Video';
      case 'friend': return 'User';
      case 'place': return 'MapPin';
      default: return 'Circle';
    }
  };

  return (
    <div className="w-full h-full rounded-xl overflow-hidden relative bg-gradient-to-br from-blue-100 via-green-50 to-blue-50">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button 
          size="sm" 
          variant="secondary"
          onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
          className="bg-white shadow-lg"
        >
          <Icon name="ZoomIn" size={18} />
        </Button>
        <Button 
          size="sm" 
          variant="secondary"
          onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
          className="bg-white shadow-lg"
        >
          <Icon name="ZoomOut" size={18} />
        </Button>
      </div>

      <div 
        className="absolute inset-0 transition-transform duration-300"
        style={{ transform: `scale(${zoom})` }}
      >
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-500"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {currentMarkers.map((marker) => (
          <div
            key={marker.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            onClick={() => handleMarkerClick(marker)}
          >
            <div className={`${getMarkerColor(marker.type)} w-10 h-10 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform animate-bounce-slow`}>
              <Icon name={getMarkerIcon(marker.type) as any} size={20} className="text-white" />
            </div>
            {marker.type === 'camera' && marker.status === 'online' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <p className="text-sm font-semibold">{marker.name}</p>
            </div>
          </div>
        ))}

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full opacity-30 animate-ping"></div>
          </div>
          <p className="text-xs font-semibold text-center mt-2 text-gray-700 bg-white px-2 py-1 rounded shadow">Вы здесь</p>
        </div>
      </div>

      {selectedMarker && (
        <Card className="absolute bottom-4 left-4 right-4 p-4 z-20 animate-slide-in shadow-2xl">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className={`${getMarkerColor(selectedMarker.type)} w-8 h-8 rounded-full flex items-center justify-center`}>
                <Icon name={getMarkerIcon(selectedMarker.type) as any} size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{selectedMarker.name}</h3>
                <p className="text-sm text-gray-600">{selectedMarker.description || 'Нет описания'}</p>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setSelectedMarker(null)}>
              <Icon name="X" size={18} />
            </Button>
          </div>
          {selectedMarker.type === 'camera' && (
            <Badge className={selectedMarker.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}>
              {selectedMarker.status === 'online' ? 'Онлайн' : 'Оффлайн'}
            </Badge>
          )}
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="flex-1">
              <Icon name="Navigation" size={16} className="mr-1" />
              Маршрут
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Icon name="Share2" size={16} className="mr-1" />
              Поделиться
            </Button>
          </div>
        </Card>
      )}

      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          <Icon name="MapPin" size={16} className="text-primary" />
          <p className="text-sm font-semibold">{currentCity.name}</p>
        </div>
        <p className="text-xs text-gray-600">
          {currentCity.lat.toFixed(4)}°, {currentCity.lng.toFixed(4)}°
        </p>
      </div>
    </div>
  );
};

export default MapComponent;