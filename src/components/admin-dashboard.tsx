import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  LayoutDashboard,
  Users,
  Bed,
  BarChart3,
  Settings,
  Activity,
  LogOut,
  Bell,
  TrendingUp,
  TrendingDown,
  DollarSign,
  UserPlus,
  CheckCircle2,
  AlertTriangle,
  Shield
} from "lucide-react";
import { AdminStaffManagement } from "./admin-staff-management";
import { AdminRoomConfiguration } from "./admin-room-configuration";
import { AdminReports } from "./admin-reports";
import { AdminSystemSettings } from "./admin-system-settings";
import { AdminActivityLogs } from "./admin-activity-logs";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role?: string;
}

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  onBackToWebsite?: () => void;
}

type MenuItem = "overview" | "staff" | "rooms" | "reports" | "settings" | "logs";

export const AdminDashboard = React.forwardRef<HTMLDivElement, AdminDashboardProps>(
  ({ user, onLogout, onBackToWebsite }, ref) => {
    const [activeMenu, setActiveMenu] = useState<MenuItem>("overview");

    const menuItems = [
      { id: "overview" as MenuItem, label: "Tổng quan", icon: LayoutDashboard },
      { id: "staff" as MenuItem, label: "Quản lý nhân viên", icon: Users },
      { id: "rooms" as MenuItem, label: "Cấu hình phòng", icon: Bed },
      { id: "reports" as MenuItem, label: "Báo cáo & Thống kê", icon: BarChart3 },
      { id: "settings" as MenuItem, label: "Cài đặt hệ thống", icon: Settings },
      { id: "logs" as MenuItem, label: "Nhật ký hoạt động", icon: Activity },
    ];

    const stats = [
      {
        title: "Doanh thu tháng này",
        value: "₫152M",
        change: "+12.5%",
        trend: "up",
        icon: DollarSign,
        color: "text-green-600 bg-green-50"
      },
      {
        title: "Tổng nhân viên",
        value: "24",
        change: "+2",
        trend: "up",
        icon: Users,
        color: "text-blue-600 bg-blue-50"
      },
      {
        title: "Tổng phòng",
        value: "120",
        change: "0",
        trend: "neutral",
        icon: Bed,
        color: "text-purple-600 bg-purple-50"
      },
      {
        title: "Tỷ lệ lấp đầy",
        value: "87%",
        change: "+5.2%",
        trend: "up",
        icon: TrendingUp,
        color: "text-orange-600 bg-orange-50"
      }
    ];

    const recentActivities = [
      {
        id: 1,
        user: "Nguyễn Văn A (Staff)",
        action: "Đã duyệt đặt phòng",
        detail: "BK045",
        time: "5 phút trước",
        type: "success"
      },
      {
        id: 2,
        user: "Admin",
        action: "Đã thêm nhân viên mới",
        detail: "Trần Thị B",
        time: "15 phút trước",
        type: "info"
      },
      {
        id: 3,
        user: "Lê Văn C (Staff)",
        action: "Cập nhật giá phòng",
        detail: "Deluxe Suite",
        time: "1 giờ trước",
        type: "warning"
      },
      {
        id: 4,
        user: "System",
        action: "Sao lưu dữ liệu tự động",
        detail: "Thành công",
        time: "2 giờ trước",
        type: "success"
      },
      {
        id: 5,
        user: "Phạm Thị D (Staff)",
        action: "Xử lý khiếu nại",
        detail: "Ticket #124",
        time: "3 giờ trước",
        type: "info"
      }
    ];

    const systemAlerts = [
      {
        id: 1,
        message: "Có 3 nhân viên cần gia hạn hợp đồng trong tháng này",
        severity: "warning",
        time: "Hôm nay"
      },
      {
        id: 2,
        message: "Server backup đã hoàn thành thành công",
        severity: "success",
        time: "2 giờ trước"
      },
      {
        id: 3,
        message: "Phát hiện 2 lần đăng nhập thất bại từ IP lạ",
        severity: "error",
        time: "5 giờ trước"
      }
    ];

    const renderContent = () => {
      switch (activeMenu) {
        case "staff":
          return <AdminStaffManagement />;
        case "rooms":
          return <AdminRoomConfiguration />;
        case "reports":
          return <AdminReports />;
        case "settings":
          return <AdminSystemSettings />;
        case "logs":
          return <AdminActivityLogs />;
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
                            {stat.trend !== "neutral" && (
                              <span className={`text-sm flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                {stat.change}
                              </span>
                            )}
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
                {/* System Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Cảnh báo hệ thống
                    </CardTitle>
                    <CardDescription>Các thông báo quan trọng cần xử lý</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {systemAlerts.map((alert) => (
                        <div 
                          key={alert.id} 
                          className={`p-4 rounded-lg border ${
                            alert.severity === "error" ? "bg-red-50 border-red-200" :
                            alert.severity === "warning" ? "bg-yellow-50 border-yellow-200" :
                            "bg-green-50 border-green-200"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {alert.severity === "error" && <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />}
                            {alert.severity === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />}
                            {alert.severity === "success" && <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />}
                            <div className="flex-1">
                              <p className="text-sm font-medium">{alert.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Hoạt động gần đây
                    </CardTitle>
                    <CardDescription>Lịch sử hoạt động trong hệ thống</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                          <div className={`p-2 rounded-full ${
                            activity.type === "success" ? "bg-green-100 text-green-600" :
                            activity.type === "warning" ? "bg-yellow-100 text-yellow-600" :
                            "bg-blue-100 text-blue-600"
                          }`}>
                            <Activity className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{activity.user}</p>
                            <p className="text-sm text-muted-foreground">
                              {activity.action}: <span className="font-medium">{activity.detail}</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Thao tác nhanh</CardTitle>
                  <CardDescription>Các tác vụ quản trị thường dùng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveMenu("staff")}>
                      <UserPlus className="w-6 h-6" />
                      <span>Thêm nhân viên mới</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveMenu("rooms")}>
                      <Bed className="w-6 h-6" />
                      <span>Cấu hình phòng</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveMenu("reports")}>
                      <BarChart3 className="w-6 h-6" />
                      <span>Xem báo cáo</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-bold">Hotel Paradise</h1>
                  <p className="text-xs text-muted-foreground">Quản trị hệ thống</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
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
                  <p className="text-xs text-muted-foreground">Quản trị viên</p>
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

AdminDashboard.displayName = "AdminDashboard";
