import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { toast } from "sonner@2.0.3";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Eye,
  Mail,
  Phone,
  Calendar,
  Shield,
  UserCheck,
  UserX
} from "lucide-react";

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "staff" | "manager" | "admin";
  department: string;
  status: "active" | "inactive" | "suspended";
  joinDate: string;
  lastLogin?: string;
  permissions: string[];
}

export const AdminStaffManagement = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);

  const mockStaff: Staff[] = [
    {
      id: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@hotelparadise.com",
      phone: "0901234567",
      role: "staff",
      department: "Lễ tân",
      status: "active",
      joinDate: "2023-01-15",
      lastLogin: "2024-10-26 14:30",
      permissions: ["booking.view", "booking.approve", "room.update"]
    },
    {
      id: "2",
      name: "Trần Thị B",
      email: "tranthib@hotelparadise.com",
      phone: "0912345678",
      role: "manager",
      department: "Quản lý buồng",
      status: "active",
      joinDate: "2023-03-20",
      lastLogin: "2024-10-26 15:20",
      permissions: ["booking.view", "booking.approve", "room.view", "room.update", "staff.view"]
    },
    {
      id: "3",
      name: "Lê Văn C",
      email: "levanc@hotelparadise.com",
      phone: "0923456789",
      role: "staff",
      department: "Hỗ trợ khách hàng",
      status: "active",
      joinDate: "2023-06-10",
      lastLogin: "2024-10-26 13:15",
      permissions: ["booking.view", "support.manage", "customer.view"]
    },
    {
      id: "4",
      name: "Phạm Thị D",
      email: "phamthid@hotelparadise.com",
      phone: "0934567890",
      role: "staff",
      department: "Kế toán",
      status: "active",
      joinDate: "2023-08-05",
      lastLogin: "2024-10-26 10:45",
      permissions: ["invoice.view", "invoice.approve", "payment.manage"]
    },
    {
      id: "5",
      name: "Hoàng Văn E",
      email: "hoangvane@hotelparadise.com",
      phone: "0945678901",
      role: "staff",
      department: "Lễ tân",
      status: "inactive",
      joinDate: "2024-02-12",
      lastLogin: "2024-10-20 16:30",
      permissions: ["booking.view", "room.view"]
    }
  ];

  const getRoleBadge = (role: Staff["role"]) => {
    const configs = {
      admin: { label: "Quản trị", className: "bg-purple-100 text-purple-800" },
      manager: { label: "Quản lý", className: "bg-blue-100 text-blue-800" },
      staff: { label: "Nhân viên", className: "bg-gray-100 text-gray-800" }
    };
    return (
      <Badge className={configs[role].className}>
        <Shield className="w-3 h-3 mr-1" />
        {configs[role].label}
      </Badge>
    );
  };

  const getStatusBadge = (status: Staff["status"]) => {
    const configs = {
      active: { label: "Hoạt động", className: "bg-green-100 text-green-800", icon: UserCheck },
      inactive: { label: "Ngừng hoạt động", className: "bg-gray-100 text-gray-800", icon: UserX },
      suspended: { label: "Tạm khóa", className: "bg-red-100 text-red-800", icon: Lock }
    };
    const config = configs[status];
    return (
      <Badge className={config.className}>
        <config.icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const handleToggleStatus = (staff: Staff) => {
    const newStatus = staff.status === "active" ? "suspended" : "active";
    toast.success(`Đã ${newStatus === "active" ? "kích hoạt" : "khóa"} tài khoản ${staff.name}`);
  };

  const handleDelete = (staff: Staff) => {
    if (confirm(`Bạn có chắc muốn xóa nhân viên ${staff.name}?`)) {
      toast.success(`Đã xóa nhân viên ${staff.name}`);
    }
  };

  const handleAddStaff = () => {
    toast.success("Đã thêm nhân viên mới");
    setIsAddOpen(false);
  };

  const handleEditStaff = () => {
    toast.success("Đã cập nhật thông tin nhân viên");
    setIsEditOpen(false);
  };

  const filteredStaff = mockStaff.filter(staff => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchLower) ||
      staff.email.toLowerCase().includes(searchLower) ||
      staff.phone.includes(searchLower);
    
    const matchesRole = filterRole === "all" || staff.role === filterRole;
    const matchesStatus = filterStatus === "all" || staff.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: mockStaff.length,
    active: mockStaff.filter(s => s.status === "active").length,
    managers: mockStaff.filter(s => s.role === "manager").length,
    newThisMonth: 2
  };

  const availablePermissions = [
    { id: "booking.view", label: "Xem đặt phòng", category: "Đặt phòng" },
    { id: "booking.approve", label: "Duyệt đặt phòng", category: "Đặt phòng" },
    { id: "booking.cancel", label: "Hủy đặt phòng", category: "Đặt phòng" },
    { id: "room.view", label: "Xem phòng", category: "Phòng" },
    { id: "room.update", label: "Cập nhật phòng", category: "Phòng" },
    { id: "customer.view", label: "Xem khách hàng", category: "Khách hàng" },
    { id: "customer.edit", label: "Sửa khách hàng", category: "Khách hàng" },
    { id: "invoice.view", label: "Xem hóa đơn", category: "Hóa đơn" },
    { id: "invoice.approve", label: "Duyệt hóa đơn", category: "Hóa đơn" },
    { id: "payment.manage", label: "Quản lý thanh toán", category: "Thanh toán" },
    { id: "support.manage", label: "Quản lý hỗ trợ", category: "Hỗ trợ" },
    { id: "staff.view", label: "Xem nhân viên", category: "Nhân viên" }
  ];

  return (
    <div ref={ref} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Quản lý nhân viên</h2>
          <p className="text-muted-foreground">Thêm, phân quyền và quản lý tài khoản nhân viên</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm nhân viên
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Tổng nhân viên</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Đang hoạt động</p>
            <p className="text-3xl font-bold text-green-600">{stats.active}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Quản lý</p>
            <p className="text-3xl font-bold text-blue-600">{stats.managers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Mới tháng này</p>
            <p className="text-3xl font-bold text-purple-600">{stats.newThisMonth}</p>
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
                  placeholder="Tìm theo tên, email, số điện thoại..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                <SelectItem value="admin">Quản trị</SelectItem>
                <SelectItem value="manager">Quản lý</SelectItem>
                <SelectItem value="staff">Nhân viên</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
                <SelectItem value="suspended">Tạm khóa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách nhân viên</CardTitle>
          <CardDescription>Hiển thị {filteredStaff.length} nhân viên</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nhân viên</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Bộ phận</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Đăng nhập gần nhất</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{staff.name}</p>
                      <p className="text-sm text-muted-foreground">ID: {staff.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        {staff.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        {staff.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(staff.role)}</TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>{getStatusBadge(staff.status)}</TableCell>
                  <TableCell>
                    {staff.lastLogin ? (
                      <span className="text-sm">{staff.lastLogin}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">Chưa đăng nhập</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedStaff(staff);
                          setIsPermissionsOpen(true);
                        }}
                      >
                        <Shield className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedStaff(staff);
                          setIsEditOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleStatus(staff)}
                      >
                        {staff.status === "active" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(staff)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Staff Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thêm nhân viên mới</DialogTitle>
            <DialogDescription>Nhập thông tin nhân viên mới vào hệ thống</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Họ và tên</Label>
                <Input placeholder="Nguyễn Văn A" className="mt-2" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="email@hotelparadise.com" className="mt-2" />
              </div>
              <div>
                <Label>Số điện thoại</Label>
                <Input placeholder="0901234567" className="mt-2" />
              </div>
              <div>
                <Label>Vai trò</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">Nhân viên</SelectItem>
                    <SelectItem value="manager">Quản lý</SelectItem>
                    <SelectItem value="admin">Quản trị</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Bộ phận</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Chọn bộ phận" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reception">Lễ tân</SelectItem>
                    <SelectItem value="housekeeping">Quản lý buồng</SelectItem>
                    <SelectItem value="support">Hỗ trợ khách hàng</SelectItem>
                    <SelectItem value="accounting">Kế toán</SelectItem>
                    <SelectItem value="maintenance">Bảo trì</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Mật khẩu</Label>
                <Input type="password" placeholder="••••••••" className="mt-2" />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setIsAddOpen(false)}>
                Hủy
              </Button>
              <Button className="flex-1" onClick={handleAddStaff}>
                Thêm nhân viên
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Staff Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin nhân viên</DialogTitle>
            <DialogDescription>Cập nhật thông tin chi tiết của nhân viên</DialogDescription>
          </DialogHeader>

          {selectedStaff && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Họ và tên</Label>
                  <Input defaultValue={selectedStaff.name} className="mt-2" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" defaultValue={selectedStaff.email} className="mt-2" />
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <Input defaultValue={selectedStaff.phone} className="mt-2" />
                </div>
                <div>
                  <Label>Vai trò</Label>
                  <Select defaultValue={selectedStaff.role}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="staff">Nhân viên</SelectItem>
                      <SelectItem value="manager">Quản lý</SelectItem>
                      <SelectItem value="admin">Quản trị</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Bộ phận</Label>
                  <Input defaultValue={selectedStaff.department} className="mt-2" />
                </div>
                <div>
                  <Label>Trạng thái</Label>
                  <Select defaultValue={selectedStaff.status}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
                      <SelectItem value="suspended">Tạm khóa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsEditOpen(false)}>
                  Hủy
                </Button>
                <Button className="flex-1" onClick={handleEditStaff}>
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Permissions Dialog */}
      <Dialog open={isPermissionsOpen} onOpenChange={setIsPermissionsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Phân quyền</DialogTitle>
            <DialogDescription>
              Quản lý quyền truy cập cho {selectedStaff?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedStaff && (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Vai trò hiện tại: {getRoleBadge(selectedStaff.role)}
                </p>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {Object.entries(
                  availablePermissions.reduce((acc, perm) => {
                    if (!acc[perm.category]) acc[perm.category] = [];
                    acc[perm.category].push(perm);
                    return acc;
                  }, {} as Record<string, typeof availablePermissions>)
                ).map(([category, perms]) => (
                  <div key={category} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{category}</h4>
                    <div className="space-y-3">
                      {perms.map((perm) => (
                        <div key={perm.id} className="flex items-center justify-between">
                          <Label className="cursor-pointer">{perm.label}</Label>
                          <Switch defaultChecked={selectedStaff.permissions.includes(perm.id)} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsPermissionsOpen(false)}>
                  Hủy
                </Button>
                <Button className="flex-1" onClick={() => {
                  toast.success("Đã cập nhật phân quyền");
                  setIsPermissionsOpen(false);
                }}>
                  Lưu phân quyền
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
});

AdminStaffManagement.displayName = "AdminStaffManagement";
