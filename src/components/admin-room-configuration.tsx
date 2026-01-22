import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Bed,
  DollarSign,
  Users,
  Layers,
  Copy,
  TrendingUp
} from "lucide-react";

interface RoomType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  weekendPrice: number;
  capacity: number;
  beds: string;
  size: number;
  amenities: string[];
  totalRooms: number;
  availableRooms: number;
  images: string[];
  status: "active" | "inactive";
}

export const AdminRoomConfiguration = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const mockRoomTypes: RoomType[] = [
    {
      id: "1",
      name: "Standard Room",
      description: "Phòng tiêu chuẩn với đầy đủ tiện nghi cơ bản",
      basePrice: 850000,
      weekendPrice: 950000,
      capacity: 2,
      beds: "1 giường đôi",
      size: 25,
      amenities: ["WiFi", "TV", "Điều hòa", "Tủ lạnh mini"],
      totalRooms: 40,
      availableRooms: 15,
      images: [],
      status: "active"
    },
    {
      id: "2",
      name: "Deluxe Ocean View",
      description: "Phòng cao cấp với view biển tuyệt đẹp",
      basePrice: 1450000,
      weekendPrice: 1650000,
      capacity: 2,
      beds: "1 giường king",
      size: 35,
      amenities: ["WiFi", "TV", "Điều hòa", "Tủ lạnh", "Ban công", "View biển"],
      totalRooms: 30,
      availableRooms: 12,
      images: [],
      status: "active"
    },
    {
      id: "3",
      name: "Deluxe Family Room",
      description: "Phòng gia đình rộng rãi, phù hợp cho 4 người",
      basePrice: 1680000,
      weekendPrice: 1880000,
      capacity: 4,
      beds: "1 giường king + 1 giường đôi",
      size: 45,
      amenities: ["WiFi", "TV", "Điều hòa", "Tủ lạnh", "Bếp nhỏ", "Phòng khách"],
      totalRooms: 20,
      availableRooms: 8,
      images: [],
      status: "active"
    },
    {
      id: "4",
      name: "Executive Suite",
      description: "Suite cao cấp với không gian làm việc",
      basePrice: 2200000,
      weekendPrice: 2500000,
      capacity: 2,
      beds: "1 giường king",
      size: 55,
      amenities: ["WiFi", "TV", "Điều hòa", "Tủ lạnh", "Ban công", "Phòng làm việc", "Bồn tắm"],
      totalRooms: 15,
      availableRooms: 5,
      images: [],
      status: "active"
    },
    {
      id: "5",
      name: "Presidential Suite",
      description: "Phòng tổng thống sang trọng bậc nhất",
      basePrice: 2800000,
      weekendPrice: 3200000,
      capacity: 4,
      beds: "1 giường king + phòng khách",
      size: 80,
      amenities: ["WiFi", "TV", "Điều hòa", "Tủ lạnh", "Ban công lớn", "Phòng làm việc", "Bồn tắm Jacuzzi", "Minibar"],
      totalRooms: 5,
      availableRooms: 2,
      images: [],
      status: "active"
    }
  ];

  const handleAddRoomType = () => {
    toast.success("Đã thêm loại phòng mới");
    setIsAddOpen(false);
  };

  const handleEditRoomType = () => {
    toast.success("Đã cập nhật thông tin loại phòng");
    setIsEditOpen(false);
  };

  const handleUpdatePricing = () => {
    toast.success("Đã cập nhật bảng giá");
    setIsPricingOpen(false);
  };

  const handleDuplicate = (roomType: RoomType) => {
    toast.success(`Đã sao chép cấu hình ${roomType.name}`);
  };

  const handleDelete = (roomType: RoomType) => {
    if (confirm(`Bạn có chắc muốn xóa loại phòng ${roomType.name}?`)) {
      toast.success(`Đã xóa loại phòng ${roomType.name}`);
    }
  };

  const filteredRoomTypes = mockRoomTypes.filter(rt =>
    rt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rt.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalTypes: mockRoomTypes.length,
    totalRooms: mockRoomTypes.reduce((sum, rt) => sum + rt.totalRooms, 0),
    avgPrice: Math.round(mockRoomTypes.reduce((sum, rt) => sum + rt.basePrice, 0) / mockRoomTypes.length),
    avgOccupancy: 65
  };

  return (
    <div ref={ref} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Cấu hình phòng</h2>
          <p className="text-muted-foreground">Quản lý loại phòng, giá cả và tiện nghi</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm loại phòng
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Loại phòng</p>
                <p className="text-3xl font-bold">{stats.totalTypes}</p>
              </div>
              <Layers className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tổng số phòng</p>
                <p className="text-3xl font-bold">{stats.totalRooms}</p>
              </div>
              <Bed className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Giá TB</p>
                <p className="text-3xl font-bold">₫{(stats.avgPrice / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Lấp đầy TB</p>
                <p className="text-3xl font-bold">{stats.avgOccupancy}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
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
              placeholder="Tìm kiếm loại phòng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Room Types Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách loại phòng</CardTitle>
          <CardDescription>Hiển thị {filteredRoomTypes.length} loại phòng</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loại phòng</TableHead>
                <TableHead>Giá cơ bản</TableHead>
                <TableHead>Giá cuối tuần</TableHead>
                <TableHead>Sức chứa</TableHead>
                <TableHead>Diện tích</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoomTypes.map((roomType) => (
                <TableRow key={roomType.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{roomType.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{roomType.description}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ₫{roomType.basePrice.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-medium text-orange-600">
                    ₫{roomType.weekendPrice.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {roomType.capacity}
                    </div>
                  </TableCell>
                  <TableCell>{roomType.size}m²</TableCell>
                  <TableCell>
                    <div>
                      <p>{roomType.availableRooms}/{roomType.totalRooms}</p>
                      <p className="text-xs text-muted-foreground">Còn trống</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roomType.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {roomType.status === "active" ? "Hoạt động" : "Tạm ngưng"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedRoomType(roomType);
                          setIsPricingOpen(true);
                        }}
                      >
                        <DollarSign className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedRoomType(roomType);
                          setIsEditOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDuplicate(roomType)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(roomType)}
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

      {/* Add Room Type Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Thêm loại phòng mới</DialogTitle>
            <DialogDescription>Cấu hình thông tin chi tiết cho loại phòng mới</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Tên loại phòng</Label>
                <Input placeholder="VD: Deluxe Ocean View" className="mt-2" />
              </div>
              <div>
                <Label>Mô tả</Label>
                <Textarea placeholder="Mô tả chi tiết về loại phòng..." className="mt-2" rows={3} />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Giá cơ bản (VNĐ/đêm)</Label>
                <Input type="number" placeholder="1450000" className="mt-2" />
              </div>
              <div>
                <Label>Giá cuối tuần (VNĐ/đêm)</Label>
                <Input type="number" placeholder="1650000" className="mt-2" />
              </div>
              <div>
                <Label>Sức chứa</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Số người" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 người</SelectItem>
                    <SelectItem value="2">2 người</SelectItem>
                    <SelectItem value="3">3 người</SelectItem>
                    <SelectItem value="4">4 người</SelectItem>
                    <SelectItem value="5">5 người</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Loại giường</Label>
                <Input placeholder="1 giường king" className="mt-2" />
              </div>
              <div>
                <Label>Diện tích (m²)</Label>
                <Input type="number" placeholder="35" className="mt-2" />
              </div>
              <div>
                <Label>Số lượng phòng</Label>
                <Input type="number" placeholder="30" className="mt-2" />
              </div>
            </div>

            <Separator />

            <div>
              <Label>Tiện nghi</Label>
              <Textarea 
                placeholder="Nhập các tiện nghi, cách nhau bởi dấu phẩy. VD: WiFi, TV, Điều hòa, Tủ lạnh" 
                className="mt-2" 
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setIsAddOpen(false)}>
                Hủy
              </Button>
              <Button className="flex-1" onClick={handleAddRoomType}>
                Thêm loại phòng
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Room Type Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa loại phòng</DialogTitle>
            <DialogDescription>Cập nhật thông tin chi tiết của loại phòng</DialogDescription>
          </DialogHeader>

          {selectedRoomType && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Tên loại phòng</Label>
                  <Input defaultValue={selectedRoomType.name} className="mt-2" />
                </div>
                <div>
                  <Label>Mô tả</Label>
                  <Textarea defaultValue={selectedRoomType.description} className="mt-2" rows={3} />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Giá cơ bản (VNĐ/đêm)</Label>
                  <Input type="number" defaultValue={selectedRoomType.basePrice} className="mt-2" />
                </div>
                <div>
                  <Label>Giá cuối tuần (VNĐ/đêm)</Label>
                  <Input type="number" defaultValue={selectedRoomType.weekendPrice} className="mt-2" />
                </div>
                <div>
                  <Label>Sức chứa</Label>
                  <Select defaultValue={selectedRoomType.capacity.toString()}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 người</SelectItem>
                      <SelectItem value="2">2 người</SelectItem>
                      <SelectItem value="3">3 người</SelectItem>
                      <SelectItem value="4">4 người</SelectItem>
                      <SelectItem value="5">5 người</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Loại giường</Label>
                  <Input defaultValue={selectedRoomType.beds} className="mt-2" />
                </div>
                <div>
                  <Label>Diện tích (m²)</Label>
                  <Input type="number" defaultValue={selectedRoomType.size} className="mt-2" />
                </div>
                <div>
                  <Label>Số lượng phòng</Label>
                  <Input type="number" defaultValue={selectedRoomType.totalRooms} className="mt-2" />
                </div>
              </div>

              <Separator />

              <div>
                <Label>Tiện nghi</Label>
                <Textarea 
                  defaultValue={selectedRoomType.amenities.join(", ")}
                  className="mt-2" 
                  rows={3}
                />
              </div>

              <div>
                <Label>Trạng thái</Label>
                <Select defaultValue={selectedRoomType.status}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Tạm ngưng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsEditOpen(false)}>
                  Hủy
                </Button>
                <Button className="flex-1" onClick={handleEditRoomType}>
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Pricing Dialog */}
      <Dialog open={isPricingOpen} onOpenChange={setIsPricingOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Cập nhật bảng giá</DialogTitle>
            <DialogDescription>
              Điều chỉnh giá cho {selectedRoomType?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedRoomType && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Giá cơ bản</CardTitle>
                    <CardDescription>Thứ 2 - Thứ 5</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label>Giá hiện tại</Label>
                      <p className="text-2xl font-bold">
                        ₫{selectedRoomType.basePrice.toLocaleString()}
                      </p>
                      <Label>Giá mới</Label>
                      <Input type="number" defaultValue={selectedRoomType.basePrice} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Giá cuối tuần</CardTitle>
                    <CardDescription>Thứ 6 - Chủ nhật</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label>Giá hiện tại</Label>
                      <p className="text-2xl font-bold text-orange-600">
                        ₫{selectedRoomType.weekendPrice.toLocaleString()}
                      </p>
                      <Label>Giá mới</Label>
                      <Input type="number" defaultValue={selectedRoomType.weekendPrice} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Label>Ghi chú</Label>
                <Textarea 
                  placeholder="Lý do thay đổi giá..."
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsPricingOpen(false)}>
                  Hủy
                </Button>
                <Button className="flex-1" onClick={handleUpdatePricing}>
                  Cập nhật giá
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
});

AdminRoomConfiguration.displayName = "AdminRoomConfiguration";
