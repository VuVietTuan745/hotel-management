import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Plus, Search, Phone, Mail, Calendar, User } from "lucide-react@0.487.0";

interface Guest {
  id: string;
  name: string;
  phone: string;
  email: string;
  idNumber: string;
  nationality: string;
  address: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  totalVisits: number;
  lastVisit: string;
  totalSpent: number;
  vipLevel: 'standard' | 'silver' | 'gold' | 'platinum';
}

export function GuestManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterVipLevel, setFilterVipLevel] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const guests: Guest[] = [
    {
      id: "G001",
      name: "Nguyễn Văn A",
      phone: "0901234567",
      email: "nguyenvana@email.com",
      idNumber: "123456789",
      nationality: "Việt Nam",
      address: "123 Lê Lợi, Q1, TP.HCM",
      dateOfBirth: "1985-05-15",
      gender: "male",
      totalVisits: 5,
      lastVisit: "2024-01-15",
      totalSpent: 8500000,
      vipLevel: "gold"
    },
    {
      id: "G002",
      name: "Trần Thị B",
      phone: "0907654321",
      email: "tranthib@email.com",
      idNumber: "987654321",
      nationality: "Việt Nam",
      address: "456 Nguyễn Huệ, Q1, TP.HCM",
      dateOfBirth: "1990-08-22",
      gender: "female",
      totalVisits: 2,
      lastVisit: "2024-01-16",
      totalSpent: 3200000,
      vipLevel: "silver"
    },
    {
      id: "G003",
      name: "Lê Văn C",
      phone: "0912345678",
      email: "levanc@email.com",
      idNumber: "456789123",
      nationality: "Việt Nam",
      address: "789 Đồng Khởi, Q1, TP.HCM",
      dateOfBirth: "1982-12-10",
      gender: "male",
      totalVisits: 12,
      lastVisit: "2024-01-14",
      totalSpent: 25000000,
      vipLevel: "platinum"
    },
    {
      id: "G004",
      name: "Phạm Thị D",
      phone: "0923456789",
      email: "phamthid@email.com",
      idNumber: "789123456",
      nationality: "Việt Nam",
      address: "321 Pasteur, Q3, TP.HCM",
      dateOfBirth: "1995-03-18",
      gender: "female",
      totalVisits: 1,
      lastVisit: "2024-01-18",
      totalSpent: 1600000,
      vipLevel: "standard"
    }
  ];

  const getVipBadge = (level: string) => {
    const variants = {
      standard: { label: "Thành viên", variant: "outline" as const },
      silver: { label: "Bạc", variant: "secondary" as const },
      gold: { label: "Vàng", variant: "default" as const },
      platinum: { label: "Bạch kim", variant: "destructive" as const }
    };
    
    const config = variants[level as keyof typeof variants];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.phone.includes(searchTerm) ||
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.idNumber.includes(searchTerm);
    const matchesVip = filterVipLevel === "all" || guest.vipLevel === filterVipLevel;
    return matchesSearch && matchesVip;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Quản lý khách hàng</h2>
          <p className="text-muted-foreground">
            Quản lý thông tin khách hàng và lịch sử giao dịch
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm khách hàng
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Thêm khách hàng mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin cá nhân để thêm khách hàng vào hệ thống
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="guest-name">Họ và tên</Label>
                  <Input id="guest-name" placeholder="Nhập họ và tên" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="guest-phone">Số điện thoại</Label>
                  <Input id="guest-phone" placeholder="Nhập số điện thoại" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="guest-email">Email</Label>
                <Input id="guest-email" type="email" placeholder="Nhập email" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="id-number">CMND/CCCD</Label>
                  <Input id="id-number" placeholder="Nhập số CMND/CCCD" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nationality">Quốc tịch</Label>
                  <Input id="nationality" placeholder="Nhập quốc tịch" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input id="address" placeholder="Nhập địa chỉ" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date-of-birth">Ngày sinh</Label>
                  <Input id="date-of-birth" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender">Giới tính</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => setIsAddDialogOpen(false)}>Thêm khách hàng</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng khách hàng</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{guests.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 khách mới tuần này
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách VIP</CardTitle>
            <Badge className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {guests.filter(g => g.vipLevel !== 'standard').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {((guests.filter(g => g.vipLevel !== 'standard').length / guests.length) * 100).toFixed(1)}% tổng khách hàng
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu từ khách</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₫{guests.reduce((sum, guest) => sum + guest.totalSpent, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Tổng từ tất cả khách hàng
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượt ghé thăm</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {guests.reduce((sum, guest) => sum + guest.totalVisits, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Tổng lượt ghé thăm
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên, số điện thoại, email hoặc CMND..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterVipLevel} onValueChange={setFilterVipLevel}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Lọc theo VIP" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="standard">Thành viên</SelectItem>
                <SelectItem value="silver">Bạc</SelectItem>
                <SelectItem value="gold">Vàng</SelectItem>
                <SelectItem value="platinum">Bạch kim</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>CMND/CCCD</TableHead>
                <TableHead>Quốc tịch</TableHead>
                <TableHead>Số lần ghé</TableHead>
                <TableHead>Lần cuối</TableHead>
                <TableHead>Tổng chi tiêu</TableHead>
                <TableHead>Hạng VIP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{guest.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {guest.gender === 'male' ? 'Nam' : guest.gender === 'female' ? 'Nữ' : 'Khác'} • {guest.dateOfBirth}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3" />
                        {guest.phone}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {guest.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{guest.idNumber}</TableCell>
                  <TableCell>{guest.nationality}</TableCell>
                  <TableCell>{guest.totalVisits}</TableCell>
                  <TableCell>{guest.lastVisit}</TableCell>
                  <TableCell>₫{guest.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>{getVipBadge(guest.vipLevel)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}