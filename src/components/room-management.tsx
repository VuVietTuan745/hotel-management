import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Plus, Search, Edit, Trash2 } from "lucide-react@0.487.0";

interface Room {
  id: string;
  number: string;
  type: string;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  price: number;
  guest?: string;
  checkIn?: string;
  checkOut?: string;
}

export function RoomManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const rooms: Room[] = [
    { id: "1", number: "101", type: "Standard", status: "available", price: 500000 },
    { id: "2", number: "102", type: "Standard", status: "occupied", price: 500000, guest: "Nguyễn Văn A", checkIn: "2024-01-15", checkOut: "2024-01-17" },
    { id: "3", number: "201", type: "Deluxe", status: "reserved", price: 800000, guest: "Trần Thị B", checkIn: "2024-01-16" },
    { id: "4", number: "202", type: "Deluxe", status: "available", price: 800000 },
    { id: "5", number: "301", type: "Suite", status: "occupied", price: 1200000, guest: "Lê Văn C", checkIn: "2024-01-14", checkOut: "2024-01-18" },
    { id: "6", number: "302", type: "Suite", status: "maintenance", price: 1200000 },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      available: { label: "Trống", variant: "outline" as const },
      occupied: { label: "Đã thuê", variant: "destructive" as const },
      reserved: { label: "Đã đặt", variant: "secondary" as const },
      maintenance: { label: "Bảo trì", variant: "outline" as const }
    };
    
    const config = variants[status as keyof typeof variants];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (room.guest && room.guest.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === "all" || room.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Quản lý phòng</h2>
          <p className="text-muted-foreground">
            Quản lý thông tin phòng và tình trạng
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm phòng
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm phòng mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin để tạo phòng mới trong hệ thống
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="room-number">Số phòng</Label>
                <Input id="room-number" placeholder="Nhập số phòng" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="room-type">Loại phòng</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại phòng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="room-price">Giá phòng (VNĐ)</Label>
                <Input id="room-price" type="number" placeholder="Nhập giá phòng" />
              </div>
              <Button onClick={() => setIsAddDialogOpen(false)}>Thêm phòng</Button>
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
                placeholder="Tìm kiếm theo số phòng, loại phòng hoặc tên khách..."
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
                <SelectItem value="available">Trống</SelectItem>
                <SelectItem value="occupied">Đã thuê</SelectItem>
                <SelectItem value="reserved">Đã đặt</SelectItem>
                <SelectItem value="maintenance">Bảo trì</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Số phòng</TableHead>
                <TableHead>Loại phòng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Giá/đêm</TableHead>
                <TableHead>Khách</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.number}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{getStatusBadge(room.status)}</TableCell>
                  <TableCell>₫{room.price.toLocaleString()}</TableCell>
                  <TableCell>{room.guest || "-"}</TableCell>
                  <TableCell>{room.checkIn || "-"}</TableCell>
                  <TableCell>{room.checkOut || "-"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
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