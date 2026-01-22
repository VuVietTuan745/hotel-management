import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Wifi, 
  Car, 
  Utensils, 
  Tv, 
  Bath, 
  Wind, 
  Waves, 
  Dumbbell, 
  Coffee,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  User,
  LogOut,
  Heart,
  Bell,
  Settings
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface HotelWebsiteProps {
  onBookingClick?: () => void;
  onLoginClick?: () => void;
  onProfileClick?: () => void;
  user?: User | null;
  onLogout?: () => void;
}

export const HotelWebsite = React.forwardRef<HTMLDivElement, HotelWebsiteProps>(
  ({ onBookingClick, onLoginClick, onProfileClick, user, onLogout }, ref) => {
    const amenities = [
      { icon: Wifi, name: "WiFi miễn phí", description: "Internet tốc độ cao 24/7" },
      { icon: Waves, name: "Hồ bơi", description: "Hồ bơi ngoài trời với view thành phố" },
      { icon: Dumbbell, name: "Phòng gym", description: "Trang thiết bị hiện đại" },
      { icon: Utensils, name: "Nhà hàng", description: "Ẩm thực cao cấp 5 sao" },
      { icon: Car, name: "Bãi đậu xe", description: "Miễn phí cho khách lưu trú" },
      { icon: Coffee, name: "Coffee lounge", description: "Không gian thư giãn sang trọng" }
    ];

    const features = [
      {
        icon: CheckCircle,
        title: "Check-in linh hoạt",
        description: "24/7 reception service"
      },
      {
        icon: Users,
        title: "Dịch vụ tận tâm",
        description: "Đội ngũ nhân viên chuyên nghiệp"
      },
      {
        icon: MapPin,
        title: "Vị trí đắc địa",
        description: "Trung tâm thành phố, gần các điểm tham quan"
      },
      {
        icon: Clock,
        title: "Phục vụ 24/7",
        description: "Hỗ trợ khách hàng mọi lúc"
      }
    ];

    const rooms = [
      {
        id: 1,
        name: "Standard Room",
        image: "https://images.unsplash.com/photo-1648383228240-6ed939727ad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN0YW5kYXJkJTIwcm9vbXxlbnwxfHx8fDE3NTg0NjkzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        price: "850,000",
        originalPrice: "1,000,000",
        rating: 4.2,
        size: "25m²",
        guests: 2,
        amenities: ["WiFi", "TV", "AC", "Bathroom"]
      },
      {
        id: 2,
        name: "Deluxe Ocean View",
        image: "https://images.unsplash.com/photo-1560703652-7838c2525e2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlbHV4ZSUyMHN1aXRlfGVufDF8fHx8MTc1ODQ2NzI2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
        price: "1,450,000",
        rating: 4.6,
        size: "35m²",
        guests: 3,
        amenities: ["WiFi", "TV", "AC", "Ocean View", "Balcony"]
      },
      {
        id: 3,
        name: "Presidential Suite",
        image: "https://images.unsplash.com/photo-1626868449668-fb47a048d9cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzU4NTI4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        price: "2,800,000",
        rating: 4.9,
        size: "65m²",
        guests: 4,
        amenities: ["WiFi", "TV", "AC", "Butler Service", "Panoramic View"]
      }
    ];

    return (
      <div ref={ref} className="min-h-screen bg-background">
        {/* Navigation Header */}
        <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-white/90 rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">H</span>
              </div>
              <h1 className="font-bold text-xl text-white">Hotel Paradise</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="text-white hover:text-white/80 hover:bg-white/10">Phòng</Button>
              <Button variant="ghost" className="text-white hover:text-white/80 hover:bg-white/10">Dịch vụ</Button>
              <Button variant="ghost" className="text-white hover:text-white/80 hover:bg-white/10">Về chúng tôi</Button>
              <Button variant="ghost" className="text-white hover:text-white/80 hover:bg-white/10">Liên hệ</Button>
            </nav>

            <div className="flex items-center gap-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 text-white hover:text-white/80 hover:bg-white/10">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onProfileClick}>
                      <User className="w-4 h-4 mr-2" />
                      Hồ sơ cá nhân
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onProfileClick}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Đặt phòng của tôi
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onProfileClick}>
                      <Heart className="w-4 h-4 mr-2" />
                      Yêu thích
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onProfileClick}>
                      <Bell className="w-4 h-4 mr-2" />
                      Thông báo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onProfileClick}>
                      <Settings className="w-4 h-4 mr-2" />
                      Cài đặt
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="outline" 
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  onClick={onLoginClick}
                >
                  Đăng nhập
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1695706807850-8c66b24b3413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGxvYmJ5JTIwbW9kZXJufGVufDF8fHx8MTc1ODQ4NjQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hotel Paradise Lobby"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="relative z-10 text-center space-y-6 px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Hotel Paradise
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Trải nghiệm kỳ nghỉ sang trọng với dịch vụ 5 sao tại trung tâm thành phố
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={onBookingClick}>
                Đặt phòng ngay
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                Khám phá thêm
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tại sao chọn chúng tôi?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Chúng tôi mang đến trải nghiệm hoàn hảo với các dịch vụ chất lượng cao và sự chăm sóc tận tình
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tiện ích cao cấp</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Khám phá các tiện ích đẳng cấp được thiết kế để mang lại sự thoải mái tối đa cho quý khách
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-lg border hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <amenity.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{amenity.name}</h3>
                    <p className="text-sm text-muted-foreground">{amenity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rooms Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Phòng nghỉ sang trọng</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Lựa chọn từ bộ sưu tập phòng nghỉ đa dạng với thiết kế tinh tế và tiện nghi hiện đại
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <Card key={room.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <ImageWithFallback
                      src={room.image}
                      alt={room.name}
                      className="w-full h-48 object-cover"
                    />
                    {room.originalPrice && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                        Giảm giá
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{room.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{room.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{room.size}</span>
                        <span>•</span>
                        <span>{room.guests} khách</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {room.amenities.map((amenity, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          {room.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₫{room.originalPrice}
                            </span>
                          )}
                          <div className="text-xl font-bold">
                            ₫{room.price}
                          </div>
                          <span className="text-sm text-muted-foreground">/ đêm</span>
                        </div>
                        <Button onClick={onBookingClick}>
                          Đặt ngay
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button size="lg" variant="outline" onClick={onBookingClick}>
                Xem tất cả phòng
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Liên hệ với chúng tôi
                </h2>
                <p className="text-primary-foreground/80 mb-8">
                  Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. 
                  Hãy liên hệ để được tư vấn và đặt phòng.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <span>123 Lê Lợi, Quận 1, TP. Hồ Chí Minh</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span>+84 28 1234 5678</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <span>info@hotelparadise.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5" />
                    <span>Phục vụ 24/7</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-6">Gửi tin nhắn cho chúng tôi</h3>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Số điện thoại"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Tin nhắn"
                      rows={4}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                    />
                  </div>
                  <Button className="w-full bg-white text-primary hover:bg-white/90">
                    Gửi tin nhắn
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
);

HotelWebsite.displayName = "HotelWebsite";