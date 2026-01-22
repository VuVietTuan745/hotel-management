import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Bed,
  FileText,
  HeadphonesIcon,
  LogOut,
  Bell,
  Settings,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { StaffBookingManagement } from "./staff-booking-management";
import { StaffRoomManagement } from "./staff-room-management";
import { StaffCustomerManagement } from "./staff-customer-management";
import { StaffInvoiceManagement } from "./staff-invoice-management";
import { StaffSupport } from "./staff-support";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role?: string;
}

interface StaffDashboardProps {
  user: User;
  onLogout: () => void;
  onBackToWebsite?: () => void;
}

type MenuItem = "overview" | "bookings" | "rooms" | "customers" | "invoices" | "support";

export const StaffDashboard = React.forwardRef<HTMLDivElement, StaffDashboardProps>(
  ({ user, onLogout, onBackToWebsite }, ref) => {
    const [activeMenu, setActiveMenu] = useState<MenuItem>("overview");

    const menuItems = [
      { id: "overview" as MenuItem, label: "Tổng quan", icon: LayoutDashboard },
      { id: "bookings" as MenuItem, label: "Đặt phòng", icon: Calendar },
      { id: "rooms" as MenuItem, label: "Quản lý phòng", icon: Bed },
      { id: "customers" as MenuItem, label: "Khách hàng", icon: Users },
      { id: "invoices" as MenuItem, label: "Hóa đơn", icon: FileText },
      { id: "support" as MenuItem, label: "Hỗ trợ", icon: HeadphonesIcon },
    ];

    const stats = [
      {
        title: "Đặt phòng chờ duyệt",
        value: "12",
        change: "+3",
        trend: "up",
        icon: Clock,
        color: "text-yellow-600 bg-yellow-50"
      },
      {
        title: "Đặt phòng hôm nay",
        value: "28",
        change: "+8",
        trend: "up",
        icon: CheckCircle2,
        color: "text-green-600 bg-green-50"
      },
      {
        title: "Phòng trống",
        value: "45",
        change: "-5",
        trend: "down",
        icon: Bed,
        color: "text-blue-600 bg-blue-50"
      },
      {
        title: "Yêu cầu hỗ trợ",
        value: "8",
        change: "+2",
        trend: "up",
        icon: AlertCircle,
        color: "text-orange-600 bg-orange-50"
      }
    ];

    const pendingBookings = [
      {
        id: "BK001",
        customerName: "Nguyễn Văn A",
        room: "Deluxe Ocean View",
        checkIn: "2024-10-28",
        checkOut: "2024-10-30",
        status: "pending",
        total: "2,900,000"
      },
      {
        id: "BK002",
        customerName: "Trần Thị B",
        room: "Standard Room",
        checkIn: "2024-10-27",
        checkOut: "2024-10-29",
        status: "pending",
        total: "1,700,000"
      },
      {
        id: "BK003",
        customerName: "Lê Văn C",
        room: "Presidential Suite",
        checkIn: "2024-10-29",
        checkOut: "2024-11-01",
        status: "pending",
        total: "8,400,000"
      }
    ];

    const recentActivities = [
      {
        id: 1,
        action: "Đã duyệt đặt phòng",
        detail: "BK045 - Nguyễn Thị D",
        time: "5 phút trước",
        icon: CheckCircle2,
        color: "text-green-600"
      },
      {
        id: 2,
        action: "Cập nhật trạng thái phòng",
        detail: "Phòng 301 - Đã dọn dẹp",
        time: "15 phút trước",
        icon: Bed,
        color: "text-blue-600"
      },
      {
        id: 3,
        action: "Xác nhận thanh toán",
        detail: "INV089 - 3,200,000 VNĐ",
        time: "25 phút trước",
        icon: FileText,
        color: "text-purple-600"
      },
      {
        id: 4,
        action: "Phản hồi hỗ trợ",
        detail: "Ticket #124",
        time: "1 giờ trước",
        icon: HeadphonesIcon,
        color: "text-orange-600"
      }
    ];

    const renderContent = () => {
      switch (activeMenu) {
        case "bookings":
          return <StaffBookingManagement />;
        case "rooms":
          return <StaffRoomManagement />;
        case "customers":
          return <StaffCustomerManagement />;
        case "invoices":
          return <StaffInvoiceManagement />;
        case "support":
          return <StaffSupport />;
        default:
          return (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                          <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold">{stat.value}</h3>
                            <span className={`text-sm flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                              {stat.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                              {stat.change}
                            </span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-full ${stat.color}`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Đặt phòng chờ duyệt</CardTitle>
                    <CardDescription>Các yêu cầu đặt phòng cần được xử lý</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{booking.id}</span>
                              <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
                                Chờ duyệt
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{booking.customerName}</p>
                            <p className="text-sm">{booking.room}</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.checkIn} → {booking.checkOut}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold mb-2">₫{booking.total}</p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="h-8">
                                <XCircle className="w-3 h-3 mr-1" />
                                Từ chối
                              </Button>
                              <Button size="sm" className="h-8">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Duyệt
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full" onClick={() => setActiveMenu("bookings")}>
                        Xem tất cả
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hoạt động gần đây</CardTitle>
                    <CardDescription>Các hoạt động của bạn trong hệ thống</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                            <activity.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{activity.action}</p>
                            <p className="text-sm text-muted-foreground truncate">{activity.detail}</p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
      }
    };

    return (
      <div ref={ref} className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-background">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">H</span>
                </div>
                <div>
                  <h1 className="font-bold">Hotel Paradise</h1>
                  <p className="text-xs text-muted-foreground">Quản lý nhân viên</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-3 border-l pl-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">Nhân viên</p>
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <aside className="col-span-12 lg:col-span-3">
              <Card>
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <Button
                        key={item.id}
                        variant={activeMenu === item.id ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveMenu(item.id)}
                      >
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.label}
                      </Button>
                    ))}
                  </nav>
                  
                  {onBackToWebsite && (
                    <>
                      <div className="my-4 border-t" />
                      <Button variant="outline" className="w-full" onClick={onBackToWebsite}>
                        Về trang chủ
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="col-span-12 lg:col-span-9">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>
    );
  }
);

StaffDashboard.displayName = "StaffDashboard";
