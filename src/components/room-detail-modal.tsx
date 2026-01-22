import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Star, Users, Maximize, Wifi, Car, Utensils, Tv, Bath, Wind, MapPin, Phone, Mail } from "lucide-react@0.487.0";
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

interface RoomDetailModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
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

const amenityLabels: Record<string, string> = {
  wifi: 'WiFi miễn phí',
  parking: 'Chỗ đậu xe',
  restaurant: 'Nhà hàng',
  tv: 'TV màn hình phẳng',
  bathroom: 'Phòng tắm riêng',
  ac: 'Điều hòa không khí'
};

export const RoomDetailModal = React.forwardRef<HTMLDivElement, RoomDetailModalProps>(
  ({ room, isOpen, onClose, onBookNow }, ref) => {
    if (!room) return null;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent ref={ref} className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{room.name}</DialogTitle>
            <DialogDescription>{room.type}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Image and basic info */}
            <div className="relative">
              <ImageWithFallback
                src={room.image}
                alt={room.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              {room.discount && (
                <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                  -{room.discount}%
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column - Details */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Mô tả phòng</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {room.description}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-4">Thông tin phòng</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Maximize className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{room.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Tối đa {room.guests} khách</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{room.rating} ({room.reviews} đánh giá)</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-4">Tiện ích phòng</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {room.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity] || Wifi;
                      const label = amenityLabels[amenity] || amenity;
                      return (
                        <div key={amenity} className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-4">Chính sách khách sạn</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Check-in: 14:00 - 23:00</p>
                    <p>• Check-out: 07:00 - 12:00</p>
                    <p>• Không hút thuốc</p>
                    <p>• Không cho phép thú cưng</p>
                    <p>• Hủy phòng miễn phí trước 24h</p>
                  </div>
                </div>
              </div>

              {/* Right column - Booking */}
              <div className="space-y-4">
                <div className="border rounded-lg p-4 space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        {room.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₫{room.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <div className="text-2xl font-bold">
                          ₫{room.price.toLocaleString()}
                        </div>
                        <span className="text-sm text-muted-foreground">/ đêm</span>
                      </div>
                      {!room.available && (
                        <Badge variant="secondary">Hết phòng</Badge>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Ngày nhận phòng</label>
                      <input 
                        type="date" 
                        className="w-full mt-1 p-2 border rounded-md"
                        defaultValue="2024-02-01"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Ngày trả phòng</label>
                      <input 
                        type="date" 
                        className="w-full mt-1 p-2 border rounded-md"
                        defaultValue="2024-02-03"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Số khách</label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option>1 khách</option>
                        <option>2 khách</option>
                        <option>3 khách</option>
                        <option>4 khách</option>
                      </select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>₫{room.price.toLocaleString()} x 2 đêm</span>
                      <span>₫{(room.price * 2).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí dịch vụ</span>
                      <span>₫50,000</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Tổng cộng</span>
                      <span>₫{(room.price * 2 + 50000).toLocaleString()}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => onBookNow(room)}
                    disabled={!room.available}
                  >
                    {room.available ? "Đặt phòng ngay" : "Hết phòng"}
                  </Button>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold">Thông tin liên hệ</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>+84 28 1234 5678</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>info@hotelparadise.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>123 Lê Lợi, Quận 1, TP.HCM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

RoomDetailModal.displayName = "RoomDetailModal";