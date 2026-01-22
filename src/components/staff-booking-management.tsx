import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner@2.0.3";
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Calendar,
  User,
  Bed,
  DollarSign,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

interface Booking {
  id: string;
  bookingCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  roomType: string;
  roomNumber?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: "pending" | "approved" | "rejected" | "completed" | "cancelled";
  createdAt: string;
  notes?: string;
}

export const StaffBookingManagement = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const mockBookings: Booking[] = [
    {
      id: "1",
      bookingCode: "BK001",
      customerName: "Nguyễn Văn A",
      customerEmail: "nguyenvana@email.com",
      customerPhone: "0901234567",
      roomType: "Deluxe Ocean View",
      roomNumber: "301",
      checkIn: "2024-10-28",
      checkOut: "2024-10-30",
      guests: 2,
      totalAmount: 2900000,
      status: "pending",
      createdAt: "2024-10-26 14:30",
      notes: "Muốn phòng tầng cao"
    },
    {
      id: "2",
      bookingCode: "BK002",
      customerName: "Trần Thị B",
      customerEmail: "tranthib@email.com",
      customerPhone: "0912345678",
      roomType: "Standard Room",
      roomNumber: "205",
      checkIn: "2024-10-27",
      checkOut: "2024-10-29",
      guests: 2,
      totalAmount: 1700000,
      status: "approved",
      createdAt: "2024-10-25 10:15"
    },
    {
      id: "3",
      bookingCode: "BK003",
      customerName: "Lê Văn C",
      customerEmail: "levanc@email.com",
      customerPhone: "0923456789",
      roomType: "Presidential Suite",
      checkIn: "2024-10-29",
      checkOut: "2024-11-01",
      guests: 4,
      totalAmount: 8400000,
      status: "pending",
      createdAt: "2024-10-26 16:45",
      notes: "Đặt phòng cho khách VIP"
    },
    {
      id: "4",
      bookingCode: "BK004",
      customerName: "Phạm Thị D",
      customerEmail: "phamthid@email.com",
      customerPhone: "0934567890",
      roomType: "Deluxe Family Room",
      roomNumber: "402",
      checkIn: "2024-10-26",
      checkOut: "2024-10-28",
      guests: 4,
      totalAmount: 3360000,
      status: "completed",
      createdAt: "2024-10-24 09:20"
    },
    {
      id: "5",
      bookingCode: "BK005",
      customerName: "Hoàng Văn E",
      customerEmail: "hoangvane@email.com",
      customerPhone: "0945678901",
      roomType: "Standard Room",
      checkIn: "2024-10-30",
      checkOut: "2024-11-02",
      guests: 2,
      totalAmount: 1950000,
      status: "rejected",
      createdAt: "2024-10-26 11:30",
      notes: "Không còn phòng trống"
    }
  ];

  const getStatusBadge = (status: Booking["status"]) => {
    const statusConfig = {
      pending: { label: "Chờ duyệt", className: "bg-yellow-50 text-yellow-700 border-yellow-200" },
      approved: { label: "Đã duyệt", className: "bg-green-50 text-green-700 border-green-200" },
      rejected: { label: "Đã từ chối", className: "bg-red-50 text-red-700 border-red-200" },
      completed: { label: "Hoàn thành", className: "bg-blue-50 text-blue-700 border-blue-200" },
      cancelled: { label: "Đã hủy", className: "bg-gray-50 text-gray-700 border-gray-200" }
    };

    return (
      <Badge variant="outline" className={statusConfig[status].className}>
        {statusConfig[status].label}
      </Badge>
    );
  };

  const handleApprove = (booking: Booking) => {
    toast.success(`Đã duyệt đặt phòng ${booking.bookingCode}`);
    setIsDetailOpen(false);
  };

  const handleReject = (booking: Booking) => {
    if (!rejectReason.trim()) {
      toast.error("Vui lòng nhập lý do từ chối");
      return;
    }
    toast.success(`Đã từ chối đặt phòng ${booking.bookingCode}`);
    setRejectReason("");
    setIsDetailOpen(false);
  };

  const handleViewDetail = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailOpen(true);
  };

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = 
      booking.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const pendingBookings = filteredBookings.filter(b => b.status === "pending");
  const approvedBookings = filteredBookings.filter(b => b.status === "approved");
  const allBookings = filteredBookings;

  const BookingTable = ({ bookings }: { bookings: Booking[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mã đặt phòng</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead>Phòng</TableHead>
          <TableHead>Check-in/out</TableHead>
          <TableHead>Số tiền</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
              Không có đặt phòng nào
            </TableCell>
          </TableRow>
        ) : (
          bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.bookingCode}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{booking.customerName}</p>
                  <p className="text-sm text-muted-foreground">{booking.customerPhone}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p>{booking.roomType}</p>
                  {booking.roomNumber && (
                    <p className="text-sm text-muted-foreground">Phòng {booking.roomNumber}</p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <p>{booking.checkIn}</p>
                  <p className="text-muted-foreground">{booking.checkOut}</p>
                </div>
              </TableCell>
              <TableCell className="font-medium">₫{booking.totalAmount.toLocaleString()}</TableCell>
              <TableCell>{getStatusBadge(booking.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewDetail(booking)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Chi tiết
                  </Button>
                  {booking.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(booking)}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(booking)}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <div ref={ref} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Quản lý đặt phòng</h2>
        <p className="text-muted-foreground">Xử lý và quản lý các yêu cầu đặt phòng</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo mã đặt phòng, tên khách hàng, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="approved">Đã duyệt</SelectItem>
                <SelectItem value="rejected">Đã từ chối</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Chờ duyệt
            <Badge variant="secondary" className="ml-2">{pendingBookings.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">
            Đã duyệt
            <Badge variant="secondary" className="ml-2">{approvedBookings.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="all">
            Tất cả
            <Badge variant="secondary" className="ml-2">{allBookings.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Đặt phòng chờ duyệt</CardTitle>
              <CardDescription>Các yêu cầu đặt phòng cần được xử lý</CardDescription>
            </CardHeader>
            <CardContent>
              <BookingTable bookings={pendingBookings} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Đặt phòng đã duyệt</CardTitle>
              <CardDescription>Các đặt phòng đã được xác nhận</CardDescription>
            </CardHeader>
            <CardContent>
              <BookingTable bookings={approvedBookings} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Tất cả đặt phòng</CardTitle>
              <CardDescription>Danh sách đầy đủ các đặt phòng</CardDescription>
            </CardHeader>
            <CardContent>
              <BookingTable bookings={allBookings} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết đặt phòng</DialogTitle>
            <DialogDescription>Thông tin chi tiết về đơn đặt phòng</DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Mã đặt phòng</Label>
                  <p className="font-semibold">{selectedBooking.bookingCode}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Trạng thái</Label>
                  <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Thông tin khách hàng
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Họ và tên</Label>
                    <p>{selectedBooking.customerName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Số điện thoại</Label>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      {selectedBooking.customerPhone}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      {selectedBooking.customerEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Bed className="w-4 h-4 mr-2" />
                  Thông tin phòng
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Loại phòng</Label>
                    <p>{selectedBooking.roomType}</p>
                  </div>
                  {selectedBooking.roomNumber && (
                    <div>
                      <Label className="text-muted-foreground">Số phòng</Label>
                      <p>Phòng {selectedBooking.roomNumber}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-muted-foreground">Check-in</Label>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {selectedBooking.checkIn}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Check-out</Label>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {selectedBooking.checkOut}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Số khách</Label>
                    <p>{selectedBooking.guests} người</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Tổng tiền</Label>
                    <p className="font-semibold text-lg">
                      ₫{selectedBooking.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="border-t pt-4">
                  <Label className="text-muted-foreground">Ghi chú</Label>
                  <p className="mt-1 text-sm">{selectedBooking.notes}</p>
                </div>
              )}

              {selectedBooking.status === "pending" && (
                <div className="border-t pt-4">
                  <Label>Lý do từ chối (nếu có)</Label>
                  <Textarea
                    placeholder="Nhập lý do từ chối đặt phòng..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>
              )}

              {selectedBooking.status === "pending" && (
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleReject(selectedBooking)}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Từ chối
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleApprove(selectedBooking)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Duyệt đặt phòng
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
});

StaffBookingManagement.displayName = "StaffBookingManagement";
