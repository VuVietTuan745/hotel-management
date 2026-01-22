import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, Wifi, Car, Utensils, Tv, Bath, Wind } from "lucide-react@0.487.0";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Room {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  size: string;
  guests: number;
  amenities: string[];
  description: string;
  available: boolean;
  discount?: number;
}

interface RoomCardProps {
  room: Room;
  onViewDetails: (room: Room) => void;
  onBookNow: (room: Room) => void;
}

const amenityIcons: Record<string, React.ComponentType<any>> = {
  wifi: Wifi,
  parking: Car,
  restaurant: Utensils,
  tv: Tv,
  bathroom: Bath,
  ac: Wind
};

export const RoomCard = React.forwardRef<HTMLDivElement, RoomCardProps>(
  ({ room, onViewDetails, onBookNow }, ref) => {
    return (
      <Card ref={ref} className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <ImageWithFallback
            src={room.image}
            alt={room.name}
            className="w-full h-48 object-cover"
          />
          {room.discount && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white">
              -{room.discount}%
            </Badge>
          )}
          {!room.available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary">Hết phòng</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{room.name}</h3>
                <p className="text-sm text-muted-foreground">{room.type}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{room.rating}</span>
                <span className="text-sm text-muted-foreground">({room.reviews})</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {room.description}
            </p>

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{room.size}</span>
              <span>{room.guests} khách</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {room.amenities.slice(0, 4).map((amenity) => {
                const Icon = amenityIcons[amenity] || Wifi;
                return (
                  <div key={amenity} className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon className="w-3 h-3" />
                    <span className="capitalize">{amenity}</span>
                  </div>
                );
              })}
              {room.amenities.length > 4 && (
                <span className="text-xs text-muted-foreground">+{room.amenities.length - 4} tiện ích khác</span>
              )}
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {room.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₫{room.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xl font-bold">
                    ₫{room.price.toLocaleString()}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">/ đêm</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onViewDetails(room)}
          >
            Xem chi tiết
          </Button>
          <Button 
            className="flex-1"
            onClick={() => onBookNow(room)}
            disabled={!room.available}
          >
            {room.available ? "Đặt ngay" : "Hết phòng"}
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

RoomCard.displayName = "RoomCard";