import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Activity,
  User,
  Settings,
  Database,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle
} from "lucide-react";

interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  userId: string;
  role: string;
  action: string;
  category: "auth" | "booking" | "room" | "user" | "system" | "security" | "payment";
  severity: "info" | "warning" | "error" | "success";
  ipAddress: string;
  userAgent: string;
  details?: string;
}

export const AdminActivityLogs = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");

  const mockLogs: ActivityLog[] = [
    {
      id: "1",
      timestamp: "2024-10-26 14:30:25",
      user: "Nguyễn Văn A",
      userId: "staff-1",
      role: "Staff",
      action: "Đã duyệt đặt phòng",
      category: "booking",
      severity: "success",
      ipAddress: "192.168.1.10",
      userAgent: "Chrome 119.0",
      details: "Mã đặt phòng: BK045"
    },
    {
      id: "2",
      timestamp: "2024-10-26 14:15:12",
      user: "Admin",
      userId: "admin-1",
      role: "Admin",
      action: "Đã thêm nhân viên mới",
      category: "user",
      severity: "info",
      ipAddress: "192.168.1.5",
      userAgent: "Chrome 119.0",
      details: "Email: tranthib@hotelparadise.com"
    },
    {
      id: "3",
      timestamp: "2024-10-26 13:45:33",
      user: "Lê Văn C",
      userId: "staff-3",
      role: "Staff",
      action: "Cập nhật giá phòng",
      category: "room",
      severity: "warning",
      ipAddress: "192.168.1.12",
      userAgent: "Firefox 118.0",
      details: "Deluxe Suite: 2200000 -> 2400000"
    },
    {
      id: "4",
      timestamp: "2024-10-26 13:30:45",
      user: "System",
      userId: "system",
      role: "System",
      action: "Sao lưu dữ liệu tự động",
      category: "system",
      severity: "success",
      ipAddress: "127.0.0.1",
      userAgent: "System",
      details: "Kích thước: 2.4 GB"
    },
    {
      id: "5",
      timestamp: "2024-10-26 12:20:18",
      user: "Unknown",
      userId: "unknown",
      role: "Guest",
      action: "Đăng nhập thất bại",
      category: "security",
      severity: "error",
      ipAddress: "45.123.45.67",
      userAgent: "Unknown",
      details: "Sai mật khẩu 3 lần liên tiếp"
    },
    {
      id: "6",
      timestamp: "2024-10-26 11:50:22",
      user: "Phạm Thị D",
      userId: "staff-4",
      role: "Staff",
      action: "Xác nhận thanh toán",
      category: "payment",
      severity: "success",
      ipAddress: "192.168.1.15",
      userAgent: "Safari 17.0",
      details: "INV089: 3,200,000 VNĐ"
    },
    {
      id: "7",
      timestamp: "2024-10-26 11:30:55",
      user: "Admin",
      userId: "admin-1",
      role: "Admin",
      action: "Thay đổi cài đặt hệ thống",
      category: "system",
      severity: "warning",
      ipAddress: "192.168.1.5",
      userAgent: "Chrome 119.0",
      details: "Cập nhật giờ check-in: 14:00 -> 15:00"
    },
    {
      id: "8",
      timestamp: "2024-10-26 10:45:12",
      user: "Hoàng Văn E",
      userId: "staff-5",
      role: "Staff",
      action: "Cập nhật trạng thái phòng",
      category: "room",
      severity: "info",
      ipAddress: "192.168.1.18",
      userAgent: "Chrome 119.0",
      details: "Phòng 301: Đang dọn -> Trống"
    },
    {
      id: "9",
      timestamp: "2024-10-26 10:20:33",
      user: "Admin",
      userId: "admin-1",
      role: "Admin",
      action: "Phân quyền nhân viên",
      category: "user",
      severity: "info",
      ipAddress: "192.168.1.5",
      userAgent: "Chrome 119.0",
      details: "Cấp quyền 'booking.approve' cho Nguyễn Văn A"
    },
    {
      id: "10",
      timestamp: "2024-10-26 09:15:44",
      user: "System",
      userId: "system",
      role: "System",
      action: "Phát hiện hoạt động bất thường",
      category: "security",
      severity: "error",
      ipAddress: "103.45.67.89",
      userAgent: "Unknown",
      details: "Nhiều lần truy cập API trong thời gian ngắn"
    }
  ];

  const getCategoryIcon = (category: ActivityLog["category"]) => {
    const icons = {
      auth: Shield,
      booking: Activity,
      room: Settings,
      user: User,
      system: Database,
      security: AlertTriangle,
      payment: Activity
    };
    return icons[category] || Activity;
  };

  const getCategoryBadge = (category: ActivityLog["category"]) => {
    const configs = {
      auth: { label: "Xác thực", className: "bg-blue-100 text-blue-800" },
      booking: { label: "Đặt phòng", className: "bg-green-100 text-green-800" },
      room: { label: "Phòng", className: "bg-purple-100 text-purple-800" },
      user: { label: "Người dùng", className: "bg-cyan-100 text-cyan-800" },
      system: { label: "Hệ thống", className: "bg-gray-100 text-gray-800" },
      security: { label: "Bảo mật", className: "bg-red-100 text-red-800" },
      payment: { label: "Thanh toán", className: "bg-yellow-100 text-yellow-800" }
    };
    return (
      <Badge className={configs[category].className}>
        {configs[category].label}
      </Badge>
    );
  };

  const getSeverityBadge = (severity: ActivityLog["severity"]) => {
    const configs = {
      info: { icon: Info, className: "text-blue-600" },
      warning: { icon: AlertTriangle, className: "text-yellow-600" },
      error: { icon: XCircle, className: "text-red-600" },
      success: { icon: CheckCircle, className: "text-green-600" }
    };
    const config = configs[severity];
    return <config.icon className={`w-4 h-4 ${config.className}`} />;
  };

  const filteredLogs = mockLogs.filter(log => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      log.user.toLowerCase().includes(searchLower) ||
      log.action.toLowerCase().includes(searchLower) ||
      log.details?.toLowerCase().includes(searchLower) ||
      log.ipAddress.includes(searchLower);
    
    const matchesCategory = filterCategory === "all" || log.category === filterCategory;
    const matchesSeverity = filterSeverity === "all" || log.severity === filterSeverity;
    
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const stats = {
    total: mockLogs.length,
    errors: mockLogs.filter(l => l.severity === "error").length,
    warnings: mockLogs.filter(l => l.severity === "warning").length,
    security: mockLogs.filter(l => l.category === "security").length
  };

  return (
    <div ref={ref} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Nhật ký hoạt động</h2>
          <p className="text-muted-foreground">Theo dõi và kiểm tra các hoạt động trong hệ thống</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Làm mới
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất log
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tổng hoạt động</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Lỗi</p>
                <p className="text-3xl font-bold text-red-600">{stats.errors}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Cảnh báo</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.warnings}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Bảo mật</p>
                <p className="text-3xl font-bold text-purple-600">{stats.security}</p>
              </div>
              <Shield className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo người dùng, hành động, IP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                <SelectItem value="auth">Xác thực</SelectItem>
                <SelectItem value="booking">Đặt phòng</SelectItem>
                <SelectItem value="room">Phòng</SelectItem>
                <SelectItem value="user">Người dùng</SelectItem>
                <SelectItem value="system">Hệ thống</SelectItem>
                <SelectItem value="security">Bảo mật</SelectItem>
                <SelectItem value="payment">Thanh toán</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Mức độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả mức độ</SelectItem>
                <SelectItem value="success">Thành công</SelectItem>
                <SelectItem value="info">Thông tin</SelectItem>
                <SelectItem value="warning">Cảnh báo</SelectItem>
                <SelectItem value="error">Lỗi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách hoạt động</CardTitle>
          <CardDescription>Hiển thị {filteredLogs.length} hoạt động</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thời gian</TableHead>
                <TableHead>Người dùng</TableHead>
                <TableHead>Hành động</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Mức độ</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Chi tiết</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const CategoryIcon = getCategoryIcon(log.category);
                return (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{log.user}</p>
                        <p className="text-sm text-muted-foreground">{log.role}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                        <span>{log.action}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getCategoryBadge(log.category)}
                    </TableCell>
                    <TableCell>
                      {getSeverityBadge(log.severity)}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {log.ipAddress}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {log.details || "-"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Không tìm thấy hoạt động nào</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
});

AdminActivityLogs.displayName = "AdminActivityLogs";
