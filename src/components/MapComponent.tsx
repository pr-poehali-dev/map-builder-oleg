import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface MapComponentProps {
  city?: string;
  onMarkerClick?: (type: string, data: any) => void;
}

const MapComponent = ({ city = 'moscow' }: MapComponentProps) => {
  const cityCoords: Record<string, { name: string; lat: number; lng: number }> = {
    moscow: { name: 'Москва', lat: 55.7558, lng: 37.6173 },
    spb: { name: 'Санкт-Петербург', lat: 59.9343, lng: 30.3351 },
    kazan: { name: 'Казань', lat: 55.8304, lng: 49.0661 },
    sochi: { name: 'Сочи', lat: 43.5855, lng: 39.7231 },
    ekb: { name: 'Екатеринбург', lat: 56.8389, lng: 60.6057 },
  };

  const currentCity = cityCoords[city] || cityCoords.moscow;

  return (
    <div className="w-full h-full rounded-xl overflow-hidden relative bg-gradient-to-br from-blue-100 via-green-50 to-blue-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md mx-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center animate-pulse">
                <Icon name="Map" size={48} className="text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Badge className="bg-green-500 animate-bounce">
                  <Icon name="MapPin" size={14} className="mr-1" />
                  {currentCity.name}
                </Badge>
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Интерактивная карта
          </h3>
          <p className="text-gray-600 mb-4">
            Карта временно недоступна. Мы работаем над улучшением сервиса.
          </p>
          
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Icon name="Video" size={24} className="mx-auto mb-1 text-blue-600" />
              <p className="text-xs font-semibold">12 камер</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Icon name="Users" size={24} className="mx-auto mb-1 text-green-600" />
              <p className="text-xs font-semibold">5 друзей</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Icon name="Route" size={24} className="mx-auto mb-1 text-purple-600" />
              <p className="text-xs font-semibold">8 маршрутов</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 justify-center">
              <Icon name="Info" size={16} className="text-blue-600" />
              <p className="text-sm text-gray-700">
                Координаты: {currentCity.lat.toFixed(4)}°, {currentCity.lng.toFixed(4)}°
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-500"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default MapComponent;
