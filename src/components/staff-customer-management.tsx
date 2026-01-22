import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { toast } from "sonner@2.0.3";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  User
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  nationality: string;
  idNumber: string;
  dateOfBirth: string;
  totalBookings: number;
  totalSpent: number;
  memberSince: string;
  vipStatus: "regular" | "silver" | "gold" | "platinum";
  lastVisit?: string;
}

export const StaffCustomerManagement = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const mockCustomers: Customer[] = [
    {
      id: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0901234567",
      address: "123 Lê Lợi, Q1, TP.HCM",
      nationality: "Việt Nam",
      idNumber: "001234567890",
      dateOfBirth: "1990-05-15",
      totalBookings: 12,
      totalSpent: 35000000,
      memberSince: "2023-01-15",
      vipStatus: "gold",
      lastVisit: "2024-10-20"
    },
    {
      id: "2",
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0912345678",
      address: "456 Nguyễn Huệ, Q1, TP.HCM",
      nationality: "Việt Nam",
      idNumber: "001234567891",
      dateOfBirth: "1985-08-20",
      totalBookings: 8,
      totalSpent: 22000000,
      memberSince: "2023-03-20",
      vipStatus: "silver",
      lastVisit: "2024-10-18"
    },
    {
      id: "3",
      name: "John Smith",
      email: "johnsmith@email.com",
      phone: "+1234567890",
      nationality: "USA",
      idNumber: "US123456789",
      dateOfBirth: "1988-12-10",
      totalBookings: 3,
      totalSpent: 15000000,
      memberSince: "2024-05-10",
      vipStatus: "regular",
      lastVisit: "2024-10-15"
    },
    {
      id: "4",
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0923456789",
      address: "789 Hai Bà Trưng, Q3, TP.HCM",
      nationality: "Việt Nam",
      idNumber: "001234567892",
      dateOfBirth: "1992-03-25",
      totalBookings: 25,
      totalSpent: 68000000,
      memberSince: "2022-08-05",
      vipStatus: "platinum",
      lastVisit: "2024-10-25"
    },
    {
      id: "5",
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0934567890",
      address: "321 Trần Hưng Đạo, Q5, TP.HCM",
      nationality: "Việt Nam",
      idNumber: "001234567893",
      dateOfBirth: "1995-07-18",
      totalBookings: 5,
      totalSpent: 12000000,
      memberSince: "2024-01-12",
      vipStatus: "regular",
      lastVisit: "2024-10-22"
    }
  ];

  const getVipBadge = (status: Customer["vipStatus"]) => {
    const configs = {
      regular: { label: "Thường", className: "bg-gray-100 text-gray-700" },
      silver: { label: "Bạc", className: "bg-gray-200 text-gray-800" },
      gold: { label: "Vàng", className: "bg-yellow-100 text-yellow-800" },
      platinum: { label: "Bạch kim", className: "bg-purple-100 text-purple-800" }
    };
    return (
      <Badge className={configs[status].className}>
        <Star className="w-3 h-3 mr-1" />
        {configs[status].label}
      </Badge>
    );
  };

  const filteredCustomers = mockCustomers.filter(customer => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.phone.includes(searchLower) ||
      customer.idNumber.includes(searchLower)
    );
  });

  const handleViewDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    if (confirm(`Bạn có chắc muốn xóa khách hàng ${customer.name}?`)) {
      toast.success(`Đã xóa khách hàng ${customer.name}`);
    }
  };

  const handleSaveEdit = () => {
    toast.success("Đã cập nhật thông tin khách hàng");
    setIsEditOpen(false);
  };

  return (
    <div ref={ref} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Quản lý khách hàng</h2>
          <p className="text-muted-foreground">Xem và quản lý thông tin khách hàng</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm khách hàng
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng khách hàng</p>
                <p className="text-2xl font-bold">{mockCustomers.length}</p>
              </div>
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Khách VIP</p>
                <p className="text-2xl font-bold">
                  {mockCustomers.filter(c => c.vipStatus !== "regular").length}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Khách mới tháng này</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Plus className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng doanh thu</p>
                <p className="text-2xl font-bold">152M</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên, email, số điện thoại, CCCD..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khách hàng</CardTitle>
          <CardDescription>
            Hiển thị {filteredCustomers.length} khách hàng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Hạng thành viên</TableHead>
                <TableHead>Số lượt đặt</TableHead>
                <TableHead>Tổng chi tiêu</TableHead>
                <TableHead>Lần ghé gần nhất</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.nationality}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        {customer.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getVipBadge(customer.vipStatus)}</TableCell>
                  <TableCell>{customer.totalBookings}</TableCell>
                  <TableCell className="font-medium">
                    ₫{(customer.totalSpent / 1000000).toFixed(1)}M
                  </TableCell>
                  <TableCell>
                    {customer.lastVisit ? (
                      <span className="text-sm">{customer.lastVisit}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewDetail(customer)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(customer)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(customer)}
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

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thông tin chi tiết khách hàng</DialogTitle>
            <DialogDescription>Xem chi tiết thông tin và lịch sử của khách hàng</DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">{selectedCustomer.name}</h3>
                  <p className="text-muted-foreground">{selectedCustomer.nationality}</p>
                </div>
                {getVipBadge(selectedCustomer.vipStatus)}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4" />
                    {selectedCustomer.email}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Số điện thoại</Label>
                  <p className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4" />
                    {selectedCustomer.phone}
                  </p>
                </div>
                {selectedCustomer.address && (
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Địa chỉ</Label>
                    <p className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4" />
                      {selectedCustomer.address}
                    </p>
                  </div>
                )}
                <div>
                  <Label className="text-muted-foreground">CCCD/Passport</Label>
                  <p className="mt-1">{selectedCustomer.idNumber}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Ngày sinh</Label>
                  <p className="mt-1">{selectedCustomer.dateOfBirth}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Thành viên từ</Label>
                  <p className="mt-1">{selectedCustomer.memberSince}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Lần ghé gần nhất</Label>
                  <p className="mt-1">{selectedCustomer.lastVisit || "-"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Tổng số lượt đặt</p>
                    <p className="text-2xl font-bold">{selectedCustomer.totalBookings}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Tổng chi tiêu</p>
                    <p className="text-2xl font-bold">
                      ₫{selectedCustomer.totalSpent.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin khách hàng</DialogTitle>
            <DialogDescription>Cập nhật thông tin chi tiết của khách hàng</DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Họ và tên</Label>
                  <Input defaultValue={selectedCustomer.name} className="mt-2" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" defaultValue={selectedCustomer.email} className="mt-2" />
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <Input defaultValue={selectedCustomer.phone} className="mt-2" />
                </div>
                <div>
                  <Label>Quốc tịch</Label>
                  <Input defaultValue={selectedCustomer.nationality} className="mt-2" />
                </div>
                <div className="col-span-2">
                  <Label>Địa chỉ</Label>
                  <Input defaultValue={selectedCustomer.address} className="mt-2" />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsEditOpen(false)}>
                  Hủy
                </Button>
                <Button className="flex-1" onClick={handleSaveEdit}>
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
});

StaffCustomerManagement.displayName = "StaffCustomerManagement";
