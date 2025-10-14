import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const customIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="
    background: linear-gradient(135deg, #2563EB 0%, #10B981 100%);
    width: 32px;
    height: 32px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  ">
    <div style="
      width: 12px;
      height: 12px;
      background: white;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    "></div>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const cameraIcon = L.divIcon({
  className: 'camera-marker',
  html: `<div style="
    background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%);
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: pulse 2s infinite;
  ">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18],
});

const friendIcon = L.divIcon({
  className: 'friend-marker',
  html: `<div style="
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  ">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

const MapUpdater = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

interface MapComponentProps {
  onMarkerClick?: (type: string, data: any) => void;
}

const MapComponent = ({ onMarkerClick }: MapComponentProps) => {
  const moscowCenter: [number, number] = [55.7558, 37.6173];

  const locations = [
    { 
      pos: [55.7539, 37.6208] as [number, number], 
      name: 'Красная площадь',
      type: 'place',
      description: 'Главная площадь Москвы',
      visitors: 1234
    },
    { 
      pos: [55.7558, 37.6173] as [number, number], 
      name: 'ГУМ',
      type: 'place',
      description: 'Торговый центр',
      visitors: 892
    },
    { 
      pos: [55.7520, 37.6175] as [number, number], 
      name: 'Кремль',
      type: 'place',
      description: 'Исторический комплекс',
      visitors: 2341
    },
  ];

  const cameras = [
    { pos: [55.7540, 37.6200] as [number, number], name: 'Камера #1', status: 'online' },
    { pos: [55.7565, 37.6180] as [number, number], name: 'Камера #2', status: 'online' },
    { pos: [55.7530, 37.6190] as [number, number], name: 'Камера #3', status: 'online' },
  ];

  const friends = [
    { pos: [55.7550, 37.6210] as [number, number], name: 'Анна Иванова', status: 'онлайн' },
    { pos: [55.7545, 37.6165] as [number, number], name: 'Петр Смирнов', status: 'онлайн' },
  ];

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
      <MapContainer
        center={moscowCenter}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <MapUpdater center={moscowCenter} zoom={15} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc, idx) => (
          <Marker key={`place-${idx}`} position={loc.pos} icon={customIcon}>
            <Popup className="custom-popup">
              {(close) => (
                <Card className="border-0 shadow-none p-3 min-w-[200px]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                      <Icon name="MapPin" size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-1">{loc.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{loc.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-green-500 text-xs">
                          <Icon name="Users" size={12} className="mr-1" />
                          {loc.visitors}
                        </Badge>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full bg-gradient-to-r from-primary to-secondary"
                        onClick={() => onMarkerClick?.('place', loc)}
                      >
                        <Icon name="Eye" size={14} className="mr-1" />
                        Посмотреть
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </Popup>
          </Marker>
        ))}

        {cameras.map((cam, idx) => (
          <Marker key={`camera-${idx}`} position={cam.pos} icon={cameraIcon}>
            <Popup className="custom-popup">
              {(close) => (
                <Card className="border-0 shadow-none p-3 min-w-[180px]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-accent to-orange-500 rounded-lg">
                      <Icon name="Video" size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-1">{cam.name}</h3>
                      <Badge className="bg-red-500 text-xs mb-3 animate-pulse">
                        LIVE
                      </Badge>
                      <Button 
                        size="sm" 
                        className="w-full bg-gradient-to-r from-accent to-orange-500"
                        onClick={() => onMarkerClick?.('camera', cam)}
                      >
                        <Icon name="Play" size={14} className="mr-1" />
                        Смотреть
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </Popup>
          </Marker>
        ))}

        {friends.map((friend, idx) => (
          <Marker key={`friend-${idx}`} position={friend.pos} icon={friendIcon}>
            <Popup className="custom-popup">
              {(close) => (
                <Card className="border-0 shadow-none p-3 min-w-[180px]">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-secondary to-green-600 rounded-lg">
                      <Icon name="User" size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-1">{friend.name}</h3>
                      <Badge className="bg-green-500 text-xs mb-3">
                        {friend.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        className="w-full bg-gradient-to-r from-secondary to-green-600"
                        onClick={() => onMarkerClick?.('friend', friend)}
                      >
                        <Icon name="MessageCircle" size={14} className="mr-1" />
                        Написать
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style>{`
        .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        .leaflet-popup-content {
          margin: 0;
          min-width: 200px;
        }
        .leaflet-popup-tip {
          background: white;
        }
        .custom-marker, .camera-marker, .friend-marker {
          background: transparent;
          border: none;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default MapComponent;
