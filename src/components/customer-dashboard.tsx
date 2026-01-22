import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { toast } from "sonner@2.0.3";
import {
  User,
  Calendar,
  Heart,
  Bell,
  Settings,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Shield,
  ChevronRight,
  Star,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  Edit,
  Trash2
} from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role?: string;
}

interface CustomerDashboardProps {
  user: User;
  onLogout: () => void;
  onBackToWebsite: () => void;
}

interface Booking {
  id: string;
  bookingCode: string;
  roomType: string;
  roomImage: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: "upcoming" | "completed" | "cancelled";
  createdAt: string;
}

interface FavoriteRoom {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  rating: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "booking" | "promotion" | "system";
}

export const CustomerDashboard = React.forwardRef<HTMLDivElement, CustomerDashboardProps>(
  ({ user, onLogout, onBackToWebsite }, ref) => {
    const [activeTab, setActiveTab] = useState("profile");

    const mockBookings: Booking[] = [
      {
        id: "1",
        bookingCode: "BK2024001",
        roomType: "Deluxe Ocean View",
        roomImage: "https://images.unsplash.com/photo-1560703652-7838c2525e2f?w=400",
        checkIn: "2024-11-15",
        checkOut: "2024-11-18",
        guests: 2,
        totalAmount: 4350000,
        status: "upcoming",
        createdAt: "2024-10-26"
      },
      {
        id: "2",
        bookingCode: "BK2024002",
        roomType: "Standard Room",
        roomImage: "https://images.unsplash.com/photo-1648383228240-6ed939727ad6?w=400",
        checkIn: "2024-10-20",
        checkOut: "2024-10-22",
        guests: 2,
        totalAmount: 1700000,
        status: "completed",
        createdAt: "2024-10-18"
      }
    ];

    const mockFavorites: FavoriteRoom[] = [
      {
        id: "1",
        name: "Presidential Suite",
        type: "Suite",
        image: "https://images.unsplash.com/photo-1626868449668-fb47a048d9cb?w=400",
        price: 2800000,
        rating: 4.9
      },
      {
        id: "2",
        name: "Deluxe Ocean View",
        type: "Deluxe",
        image: "https://images.unsplash.com/photo-1560703652-7838c2525e2f?w=400",
        price: 1450000,
        rating: 4.6
      }
    ];

    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "Đặt phòng thành công",
        message: "Đặt phòng BK2024001 đã được xác nhận",
        time: "2 giờ trước",
        read: false,
        type: "booking"
      },
      {
        id: "2",
        title: "Ưu đãi đặc biệt",
        message: "Giảm 20% cho đặt phòng cuối tuần",
        time: "1 ngày trước",
        read: false,
        type: "promotion"
      },
      {
        id: "3",
        title: "Nhắc nhở check-in",
        message: "Đặt phòng của bạn sẽ check-in vào 15/11",
        time: "2 ngày trước",
        read: true,
        type: "system"
      }
    ];

    const getStatusBadge = (status: Booking["status"]) => {
      const configs = {
        upcoming: { label: "Sắp tới", className: "bg-blue-50 text-blue-700", icon: Clock },
        completed: { label: "Hoàn thành", className: "bg-green-50 text-green-700", icon: CheckCircle2 },
        cancelled: { label: "Đã hủy", className: "bg-red-50 text-red-700", icon: XCircle }
      };
      const config = configs[status];
      return (
        <Badge className={config.className}>
          <config.icon className="w-3 h-3 mr-1" />
          {config.label}
        </Badge>
      );
    };

    const handleSaveProfile = () => {
      toast.success("Đã cập nhật thông tin cá nhân");
    };

    const handleRemoveFavorite = (id: string) => {
      toast.success("Đã xóa khỏi danh sách yêu thích");
    };

    const handleMarkAllRead = () => {
      toast.success("Đã đánh dấu tất cả là đã đọc");
    };

    return (
      <div ref={ref} className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="border-b bg-background">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 cursor-pointer" onClick={onBackToWebsite}>
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">H</span>
                </div>
                <h1 className="font-bold">Hotel Paradise</h1>
              </div>
            </div>

            <Button variant="outline" onClick={onBackToWebsite}>
              Về trang chủ
            </Button>
          </div>
        </header>

        <div className="container py-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <aside className="col-span-12 lg:col-span-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-20 w-20 mb-3">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>

                  <nav className="space-y-1">
                    <Button
                      variant={activeTab === "profile" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Hồ sơ cá nhân
                    </Button>
                    <Button
                      variant={activeTab === "bookings" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("bookings")}
                    >
                      <Calendar className="w-4 h-4 mr-3" />
                      Đặt phòng của tôi
                    </Button>
                    <Button
                      variant={activeTab === "favorites" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("favorites")}
                    >
                      <Heart className="w-4 h-4 mr-3" />
                      Yêu thích
                    </Button>
                    <Button
                      variant={activeTab === "notifications" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("notifications")}
                    >
                      <Bell className="w-4 h-4 mr-3" />
                      Thông báo
                      {mockNotifications.filter(n => !n.read).length > 0 && (
                        <Badge className="ml-auto" variant="destructive">
                          {mockNotifications.filter(n => !n.read).length}
                        </Badge>
                      )}
                    </Button>
                    <Button
                      variant={activeTab === "settings" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Cài đặt
                    </Button>
                  </nav>

                  <Separator className="my-4" />

                  <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={onLogout}>
                    Đăng xuất
                  </Button>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="col-span-12 lg:col-span-9">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Hồ sơ cá nhân</CardTitle>
                    <CardDescription>Quản lý thông tin cá nhân của bạn</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Họ và tên</Label>
                        <Input defaultValue={user.name} className="mt-2" />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input type="email" defaultValue={user.email} className="mt-2" disabled />
                      </div>
                      <div>
                        <Label>Số điện thoại</Label>
                        <Input defaultValue={user.phone || "0901234567"} className="mt-2" />
                      </div>
                      <div>
                        <Label>Ngày sinh</Label>
                        <Input type="date" defaultValue="1990-01-01" className="mt-2" />
                      </div>
                      <div className="col-span-2">
                        <Label>Địa chỉ</Label>
                        <Input defaultValue="123 Lê Lợi, Q1, TP.HCM" className="mt-2" />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-4">Thông tin bổ sung</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>CCCD/Passport</Label>
                          <Input defaultValue="001234567890" className="mt-2" />
                        </div>
                        <div>
                          <Label>Quốc tịch</Label>
                          <Input defaultValue="Việt Nam" className="mt-2" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile}>
                        Lưu thay đổi
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Bookings Tab */}
              {activeTab === "bookings" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Đặt phòng của tôi</CardTitle>
                      <CardDescription>Xem và quản lý các đặt phòng của bạn</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="upcoming">
                        <TabsList>
                          <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
                          <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
                          <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
                        </TabsList>

                        <TabsContent value="upcoming" className="space-y-4 mt-4">
                          {mockBookings.filter(b => b.status === "upcoming").map((booking) => (
                            <Card key={booking.id}>
                              <CardContent className="p-6">
                                <div className="flex gap-4">
                                  <img
                                    src={booking.roomImage}
                                    alt={booking.roomType}
                                    className="w-32 h-32 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <h4 className="font-semibold">{booking.roomType}</h4>
                                        <p className="text-sm text-muted-foreground">
                                          Mã đặt phòng: {booking.bookingCode}
                                        </p>
                                      </div>
                                      {getStatusBadge(booking.status)}
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                                      <div>
                                        <p className="text-muted-foreground">Check-in</p>
                                        <p className="font-medium">{booking.checkIn}</p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">Check-out</p>
                                        <p className="font-medium">{booking.checkOut}</p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">Số khách</p>
                                        <p className="font-medium">{booking.guests} người</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                      <div>
                                        <p className="text-sm text-muted-foreground">Tổng tiền</p>
                                        <p className="text-lg font-bold">₫{booking.totalAmount.toLocaleString()}</p>
                                      </div>
                                      <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                          <Download className="w-4 h-4 mr-2" />
                                          Hóa đơn
                                        </Button>
                                        <Button variant="outline" size="sm">
                                          Chi tiết
                                          <ChevronRight className="w-4 h-4 ml-2" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </TabsContent>

                        <TabsContent value="completed" className="space-y-4 mt-4">
                          {mockBookings.filter(b => b.status === "completed").map((booking) => (
                            <Card key={booking.id}>
                              <CardContent className="p-6">
                                <div className="flex gap-4">
                                  <img
                                    src={booking.roomImage}
                                    alt={booking.roomType}
                                    className="w-32 h-32 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <h4 className="font-semibold">{booking.roomType}</h4>
                                        <p className="text-sm text-muted-foreground">
                                          Mã đặt phòng: {booking.bookingCode}
                                        </p>
                                      </div>
                                      {getStatusBadge(booking.status)}
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                                      <div>
                                        <p className="text-muted-foreground">Check-in</p>
                                        <p className="font-medium">{booking.checkIn}</p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">Check-out</p>
                                        <p className="font-medium">{booking.checkOut}</p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">Số khách</p>
                                        <p className="font-medium">{booking.guests} người</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                      <div>
                                        <p className="text-sm text-muted-foreground">Tổng tiền</p>
                                        <p className="text-lg font-bold">₫{booking.totalAmount.toLocaleString()}</p>
                                      </div>
                                      <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                          Đặt lại
                                        </Button>
                                        <Button variant="outline" size="sm">
                                          <Star className="w-4 h-4 mr-2" />
                                          Đánh giá
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </TabsContent>

                        <TabsContent value="cancelled" className="mt-4">
                          <div className="text-center py-12">
                            <XCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                            <p className="text-muted-foreground">Không có đặt phòng nào đã hủy</p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === "favorites" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Phòng yêu thích</CardTitle>
                    <CardDescription>Các phòng bạn đã lưu để xem sau</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockFavorites.map((room) => (
                        <Card key={room.id}>
                          <CardContent className="p-4">
                            <div className="relative mb-3">
                              <img
                                src={room.image}
                                alt={room.name}
                                className="w-full h-40 object-cover rounded-lg"
                              />
                              <Button
                                size="icon"
                                variant="secondary"
                                className="absolute top-2 right-2"
                                onClick={() => handleRemoveFavorite(room.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <h4 className="font-semibold mb-1">{room.name}</h4>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{room.type}</Badge>
                              <div className="flex items-center gap-1 text-sm">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                {room.rating}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <div>
                                <p className="text-sm text-muted-foreground">Từ</p>
                                <p className="font-bold">₫{room.price.toLocaleString()}</p>
                              </div>
                              <Button size="sm">Đặt ngay</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Thông báo</CardTitle>
                        <CardDescription>Cập nhật và tin tức mới nhất</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
                        Đánh dấu tất cả đã đọc
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 rounded-lg border ${notification.read ? "bg-background" : "bg-muted/50"}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-full ${
                                notification.type === "booking" ? "bg-blue-100 text-blue-600" :
                                notification.type === "promotion" ? "bg-green-100 text-green-600" :
                                "bg-gray-100 text-gray-600"
                              }`}>
                                {notification.type === "booking" && <Calendar className="w-4 h-4" />}
                                {notification.type === "promotion" && <Star className="w-4 h-4" />}
                                {notification.type === "system" && <Bell className="w-4 h-4" />}
                              </div>
                              <div>
                                <h4 className="font-semibold">{notification.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                              </div>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground ml-11">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Bảo mật</CardTitle>
                      <CardDescription>Quản lý mật khẩu và bảo mật tài khoản</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Mật khẩu hiện tại</Label>
                        <Input type="password" className="mt-2" />
                      </div>
                      <div>
                        <Label>Mật khẩu mới</Label>
                        <Input type="password" className="mt-2" />
                      </div>
                      <div>
                        <Label>Xác nhận mật khẩu mới</Label>
                        <Input type="password" className="mt-2" />
                      </div>
                      <Button>Đổi mật khẩu</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tùy chọn thông báo</CardTitle>
                      <CardDescription>Chọn thông báo bạn muốn nhận</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email marketing</Label>
                          <p className="text-sm text-muted-foreground">Nhận ưu đãi và khuyến mãi</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Thông báo đặt phòng</Label>
                          <p className="text-sm text-muted-foreground">Cập nhật về đặt phòng của bạn</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Nhắc nhở</Label>
                          <p className="text-sm text-muted-foreground">Nhắc nhở check-in/check-out</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Ngôn ngữ & Khu vực</CardTitle>
                      <CardDescription>Tùy chỉnh ngôn ngữ và múi giờ</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Ngôn ngữ</Label>
                        <select className="w-full mt-2 p-2 border rounded-md">
                          <option>Tiếng Việt</option>
                          <option>English</option>
                        </select>
                      </div>
                      <div>
                        <Label>Múi giờ</Label>
                        <select className="w-full mt-2 p-2 border rounded-md">
                          <option>GMT+7 (Bangkok, Hanoi)</option>
                          <option>GMT+0 (London)</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
);

CustomerDashboard.displayName = "CustomerDashboard";
