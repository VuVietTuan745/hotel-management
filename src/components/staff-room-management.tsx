import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { toast } from "sonner@2.0.3";
import {
  Search,
  Filter,
  Bed,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wrench,
  Home
} from "lucide-react";

interface Room {
  id: string;
  roomNumber: string;
  type: string;
  floor: number;
  status: "available" | "occupied" | "cleaning" | "maintenance" | "reserved";
  currentGuest?: string;
  checkOut?: string;
  price: number;
  lastCleaned?: string;
}

export const StaffRoomManagement = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterFloor, setFilterFloor] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<Room["status"]>("available");

  const mockRooms: Room[] = [
    {
      id: "1",
      roomNumber: "101",
      type: "Standard Room",
      floor: 1,
      status: "available",
      price: 850000,
      lastCleaned: "2024-10-26 14:00"
    },
    {
      id: "2",
      roomNumber: "102",
      type: "Standard Room",
      floor: 1,
      status: "cleaning",
      price: 850000,
      lastCleaned: "2024-10-26 10:00"
    },
    {
      id: "3",
      roomNumber: "201",
      type: "Deluxe Ocean View",
      floor: 2,
      status: "occupied",
      currentGuest: "Nguyễn Văn A",
      checkOut: "2024-10-30",
      price: 1450000
    },
    {
      id: "4",
      roomNumber: "202",
      type: "Deluxe Ocean View",
      floor: 2,
      status: "reserved",
      checkOut: "2024-10-28",
      price: 1450000
    },
    {
      id: "5",
      roomNumber: "301",
      type: "Deluxe Family Room",
      floor: 3,
      status: "maintenance",
      price: 1680000
    },
    {
      id: "6",
      roomNumber: "302",
      type: "Deluxe Family Room",
      floor: 3,
      status: "available",
      price: 1680000,
      lastCleaned: "2024-10-26 15:30"
    },
    {
      id: "7",
      roomNumber: "401",
      type: "Executive Suite",
      floor: 4,
      status: "occupied",
      currentGuest: "Trần Thị B",
      checkOut: "2024-10-29",
      price: 2200000
    },
    {
      id: "8",
      roomNumber: "501",
      type: "Presidential Suite",
      floor: 5,
      status: "available",
      price: 2800000,
      lastCleaned: "2024-10-26 16:00"
    }
  ];

  const getStatusConfig = (status: Room["status"]) => {
    const configs = {
      available: { 
        label: "Trống", 
        className: "bg-green-50 text-green-700 border-green-200",
        icon: CheckCircle
      },
      occupied: { 
        label: "Đã thuê", 
        className: "bg-blue-50 text-blue-700 border-blue-200",
        icon: Home
      },
      cleaning: { 
        label: "Đang dọn", 
        className: "bg-yellow-50 text-yellow-700 border-yellow-200",
        icon: AlertCircle
      },
      maintenance: { 
        label: "Bảo trì", 
        className: "bg-red-50 text-red-700 border-red-200",
        icon: Wrench
      },
      reserved: { 
        label: "Đã đặt", 
        className: "bg-purple-50 text-purple-700 border-purple-200",
        icon: Bed
      }
    };
    return configs[status];
  };

  const handleUpdateStatus = () => {
    if (selectedRoom) {
      toast.success(`Đã cập nhật trạng thái phòng ${selectedRoom.roomNumber}`);
      setIsUpdateOpen(false);
    }
  };

  const filteredRooms = mockRooms.filter(room => {
    const matchesSearch = 
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.currentGuest?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || room.status === filterStatus;
    const matchesFloor = filterFloor === "all" || room.floor.toString() === filterFloor;
    
    return matchesSearch && matchesStatus && matchesFloor;
  });

  const statusStats = {
    available: mockRooms.filter(r => r.status === "available").length,
    occupied: mockRooms.filter(r => r.status === "occupied").length,
    cleaning: mockRooms.filter(r => r.status === "cleaning").length,
    maintenance: mockRooms.filter(r => r.status === "maintenance").length,
    reserved: mockRooms.filter(r => r.status === "reserved").length,
  };

  return (
    <div ref={ref} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Quản lý phòng</h2>
        <p className="text-muted-foreground">Cập nhật và theo dõi tình trạng các phòng</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusStats).map(([status, count]) => {
          const config = getStatusConfig(status as Room["status"]);
          return (
            <Card key={status}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{config.label}</p>
                    <p className="text-2xl font-bold">{count}</p>
                  </div>
                  <config.icon className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo số phòng, loại phòng, tên khách..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="available">Trống</SelectItem>
                <SelectItem value="occupied">Đã thuê</SelectItem>
                <SelectItem value="cleaning">Đang dọn</SelectItem>
                <SelectItem value="maintenance">Bảo trì</SelectItem>
                <SelectItem value="reserved">Đã đặt</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterFloor} onValueChange={setFilterFloor}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Tầng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả tầng</SelectItem>
                <SelectItem value="1">Tầng 1</SelectItem>
                <SelectItem value="2">Tầng 2</SelectItem>
                <SelectItem value="3">Tầng 3</SelectItem>
                <SelectItem value="4">Tầng 4</SelectItem>
                <SelectItem value="5">Tầng 5</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRooms.map((room) => {
          const statusConfig = getStatusConfig(room.status);
          return (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">Phòng {room.roomNumber}</h3>
                      <p className="text-sm text-muted-foreground">Tầng {room.floor}</p>
                    </div>
                    <Badge variant="outline" className={statusConfig.className}>
                      {statusConfig.label}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">{room.type}</p>
                    <p className="font-semibold">₫{room.price.toLocaleString()}/đêm</p>
                  </div>

                  {room.currentGuest && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">Khách hiện tại</p>
                      <p className="text-sm font-medium">{room.currentGuest}</p>
                      {room.checkOut && (
                        <p className="text-xs text-muted-foreground">
                          Check-out: {room.checkOut}
                        </p>
                      )}
                    </div>
                  )}

                  {room.lastCleaned && room.status === "available" && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        Vệ sinh lần cuối: {room.lastCleaned}
                      </p>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedRoom(room);
                      setNewStatus(room.status);
                      setIsUpdateOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Cập nhật trạng thái
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRooms.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bed className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Không tìm thấy phòng nào</p>
          </CardContent>
        </Card>
      )}

      {/* Update Status Dialog */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật trạng thái phòng</DialogTitle>
            <DialogDescription>
              Thay đổi trạng thái cho phòng {selectedRoom?.roomNumber}
            </DialogDescription>
          </DialogHeader>

          {selectedRoom && (
            <div className="space-y-4">
              <div>
                <Label>Phòng</Label>
                <p className="text-lg font-semibold mt-1">
                  Phòng {selectedRoom.roomNumber} - {selectedRoom.type}
                </p>
              </div>

              <div>
                <Label>Trạng thái hiện tại</Label>
                <div className="mt-2">
                  <Badge variant="outline" className={getStatusConfig(selectedRoom.status).className}>
                    {getStatusConfig(selectedRoom.status).label}
                  </Badge>
                </div>
              </div>

              <div>
                <Label>Trạng thái mới</Label>
                <Select value={newStatus} onValueChange={(v) => setNewStatus(v as Room["status"])}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Trống</SelectItem>
                    <SelectItem value="occupied">Đã thuê</SelectItem>
                    <SelectItem value="cleaning">Đang dọn</SelectItem>
                    <SelectItem value="maintenance">Bảo trì</SelectItem>
                    <SelectItem value="reserved">Đã đặt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsUpdateOpen(false)}>
                  Hủy
                </Button>
                <Button className="flex-1" onClick={handleUpdateStatus}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Cập nhật
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
});

StaffRoomManagement.displayName = "StaffRoomManagement";
