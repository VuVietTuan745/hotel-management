import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Plus, Search, Calendar, Phone, Mail } from "lucide-react@0.487.0";

interface Reservation {
  id: string;
  guestName: string;
  phone: string;
  email: string;
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  specialRequests?: string;
}

export function ReservationManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const reservations: Reservation[] = [
    {
      id: "R001",
      guestName: "Nguyễn Văn A",
      phone: "0901234567",
      email: "nguyenvana@email.com",
      roomNumber: "102",
      roomType: "Standard",
      checkIn: "2024-01-15",
      checkOut: "2024-01-17",
      nights: 2,
      totalAmount: 1000000,
      status: "checked-in"
    },
    {
      id: "R002",
      guestName: "Trần Thị B",
      phone: "0907654321",
      email: "tranthib@email.com",
      roomNumber: "201",
      roomType: "Deluxe",
      checkIn: "2024-01-16",
      checkOut: "2024-01-18",
      nights: 2,
      totalAmount: 1600000,
      status: "confirmed"
    },
    {
      id: "R003",
      guestName: "Lê Văn C",
      phone: "0912345678",
      email: "levanc@email.com",
      roomNumber: "301",
      roomType: "Suite",
      checkIn: "2024-01-14",
      checkOut: "2024-01-18",
      nights: 4,
      totalAmount: 4800000,
      status: "checked-in"
    },
    {
      id: "R004",
      guestName: "Phạm Thị D",
      phone: "0923456789",
      email: "phamthid@email.com",
      roomNumber: "205",
      roomType: "Deluxe",
      checkIn: "2024-01-18",
      checkOut: "2024-01-20",
      nights: 2,
      totalAmount: 1600000,
      status: "pending"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { label: "Chờ xác nhận", variant: "outline" as const },
      confirmed: { label: "Đã xác nhận", variant: "secondary" as const },
      "checked-in": { label: "Đã check-in", variant: "default" as const },
      "checked-out": { label: "Đã check-out", variant: "outline" as const },
      cancelled: { label: "Đã hủy", variant: "destructive" as const }
    };
    
    const config = variants[status as keyof typeof variants];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.phone.includes(searchTerm) ||
                         reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || reservation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Quản lý đặt phòng</h2>
          <p className="text-muted-foreground">
            Quản lý thông tin đặt phòng và khách hàng
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Đặt phòng mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo đặt phòng mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin để tạo đặt phòng mới cho khách hàng
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="guest-name">Tên khách hàng</Label>
                  <Input id="guest-name" placeholder="Nhập tên khách hàng" />
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
                  <Label htmlFor="check-in">Ngày check-in</Label>
                  <Input id="check-in" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="check-out">Ngày check-out</Label>
                  <Input id="check-out" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="room-type">Loại phòng</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại phòng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard - ₫500,000/đêm</SelectItem>
                      <SelectItem value="deluxe">Deluxe - ₫800,000/đêm</SelectItem>
                      <SelectItem value="suite">Suite - ₫1,200,000/đêm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="room-number">Số phòng (tùy chọn)</Label>
                  <Input id="room-number" placeholder="Để trống để tự động chọn" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="special-requests">Yêu cầu đặc biệt</Label>
                <Input id="special-requests" placeholder="Nhập yêu cầu đặc biệt (nếu có)" />
              </div>
              <Button onClick={() => setIsAddDialogOpen(false)}>Tạo đặt phòng</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên khách, số điện thoại, email hoặc số phòng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="pending">Chờ xác nhận</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="checked-in">Đã check-in</SelectItem>
                <SelectItem value="checked-out">Đã check-out</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đặt phòng</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Phòng</TableHead>
                <TableHead>Check-in/out</TableHead>
                <TableHead>Số đêm</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">{reservation.id}</TableCell>
                  <TableCell>{reservation.guestName}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3" />
                        {reservation.phone}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {reservation.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{reservation.roomNumber}</div>
                      <div className="text-sm text-muted-foreground">{reservation.roomType}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        {reservation.checkIn}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {reservation.checkOut}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{reservation.nights}</TableCell>
                  <TableCell>₫{reservation.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {reservation.status === 'pending' && (
                        <Button variant="outline" size="sm">
                          Xác nhận
                        </Button>
                      )}
                      {reservation.status === 'confirmed' && (
                        <Button variant="outline" size="sm">
                          Check-in
                        </Button>
                      )}
                      {reservation.status === 'checked-in' && (
                        <Button variant="outline" size="sm">
                          Check-out
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}