import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner@2.0.3";
import {
  Save,
  Database,
  Mail,
  Bell,
  Shield,
  Globe,
  CreditCard,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

export const AdminSystemSettings = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleSaveGeneral = () => {
    toast.success("Đã lưu cài đặt chung");
  };

  const handleBackupNow = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      toast.success("Sao lưu dữ liệu thành công!");
    }, 2000);
  };

  const handleRestore = () => {
    if (confirm("Bạn có chắc muốn khôi phục dữ liệu? Dữ liệu hiện tại sẽ bị ghi đè.")) {
      toast.success("Đã khôi phục dữ liệu thành công");
    }
  };

  return (
    <div ref={ref} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Cài đặt hệ thống</h2>
        <p className="text-muted-foreground">Quản lý cấu hình và tùy chọn hệ thống</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Cài đặt chung</TabsTrigger>
          <TabsTrigger value="backup">Sao lưu & Khôi phục</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="payment">Thanh toán</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách sạn</CardTitle>
              <CardDescription>Cấu hình thông tin cơ bản về khách sạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tên khách sạn</Label>
                  <Input defaultValue="Hotel Paradise" className="mt-2" />
                </div>
                <div>
                  <Label>Email liên hệ</Label>
                  <Input type="email" defaultValue="contact@hotelparadise.com" className="mt-2" />
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <Input defaultValue="+84 28 1234 5678" className="mt-2" />
                </div>
                <div>
                  <Label>Website</Label>
                  <Input defaultValue="https://hotelparadise.com" className="mt-2" />
                </div>
                <div className="col-span-2">
                  <Label>Địa chỉ</Label>
                  <Input defaultValue="123 Lê Lợi, Quận 1, TP.HCM" className="mt-2" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Giờ làm việc</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Giờ check-in</Label>
                    <Input type="time" defaultValue="14:00" className="mt-2" />
                  </div>
                  <div>
                    <Label>Giờ check-out</Label>
                    <Input type="time" defaultValue="12:00" className="mt-2" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Chính sách hủy phòng</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Hoàn tiền 100% nếu hủy trước</Label>
                      <p className="text-sm text-muted-foreground">Số ngày trước check-in</p>
                    </div>
                    <Input type="number" defaultValue="7" className="w-24" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Hoàn tiền 50% nếu hủy trước</Label>
                      <p className="text-sm text-muted-foreground">Số ngày trước check-in</p>
                    </div>
                    <Input type="number" defaultValue="3" className="w-24" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Tiện ích</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Cho phép đặt phòng online</Label>
                      <p className="text-sm text-muted-foreground">Khách hàng có thể đặt phòng qua website</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Yêu cầu xác nhận email</Label>
                      <p className="text-sm text-muted-foreground">Gửi email xác nhận sau khi đặt phòng</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Hiển thị giá công khai</Label>
                      <p className="text-sm text-muted-foreground">Khách hàng xem giá phòng mà không cần đăng nhập</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveGeneral}>
                  <Save className="w-4 h-4 mr-2" />
                  Lưu cài đặt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup & Restore */}
        <TabsContent value="backup">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Sao lưu dữ liệu
                </CardTitle>
                <CardDescription>Tạo bản sao lưu của toàn bộ dữ liệu hệ thống</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Sao lưu tự động</p>
                      <p className="text-sm text-muted-foreground">Tự động sao lưu mỗi ngày lúc 2:00 AM</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-start gap-3 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">Sao lưu gần nhất</p>
                        <p className="text-sm text-muted-foreground">26/10/2024 lúc 02:00 AM</p>
                        <p className="text-sm text-muted-foreground">Kích thước: 2.4 GB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Tải xuống
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-4">Tạo bản sao lưu mới</h4>
                  <Button onClick={handleBackupNow} disabled={isBackingUp}>
                    {isBackingUp ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Đang sao lưu...
                      </>
                    ) : (
                      <>
                        <Database className="w-4 h-4 mr-2" />
                        Sao lưu ngay
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Khôi phục dữ liệu
                </CardTitle>
                <CardDescription>Khôi phục hệ thống từ bản sao lưu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-yellow-900">Cảnh báo</p>
                      <p className="text-sm text-yellow-800">
                        Việc khôi phục dữ liệu sẽ ghi đè toàn bộ dữ liệu hiện tại. 
                        Vui lòng sao lưu trước khi thực hiện.
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label>Chọn file sao lưu</Label>
                    <Input type="file" className="mt-2" />
                  </div>

                  <Button variant="destructive" onClick={handleRestore}>
                    <Upload className="w-4 h-4 mr-2" />
                    Khôi phục dữ liệu
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Cấu hình thông báo
              </CardTitle>
              <CardDescription>Quản lý thông báo email và trong hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Email thông báo</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Đặt phòng mới</Label>
                      <p className="text-sm text-muted-foreground">Gửi email khi có đặt phòng mới</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Thanh toán thành công</Label>
                      <p className="text-sm text-muted-foreground">Gửi email xác nhận thanh toán</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Check-in sắp tới</Label>
                      <p className="text-sm text-muted-foreground">Nhắc nhở khách trước 24h check-in</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Hủy đặt phòng</Label>
                      <p className="text-sm text-muted-foreground">Gửi email khi đặt phòng bị hủy</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Thông báo cho Admin</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Doanh thu hàng ngày</Label>
                      <p className="text-sm text-muted-foreground">Báo cáo doanh thu cuối ngày</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Cảnh báo bảo mật</Label>
                      <p className="text-sm text-muted-foreground">Thông báo về hoạt động đáng ngờ</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Lỗi hệ thống</Label>
                      <p className="text-sm text-muted-foreground">Thông báo khi có lỗi xảy ra</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Cấu hình SMTP</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>SMTP Host</Label>
                    <Input defaultValue="smtp.gmail.com" className="mt-2" />
                  </div>
                  <div>
                    <Label>SMTP Port</Label>
                    <Input defaultValue="587" className="mt-2" />
                  </div>
                  <div>
                    <Label>Email gửi đi</Label>
                    <Input type="email" defaultValue="noreply@hotelparadise.com" className="mt-2" />
                  </div>
                  <div>
                    <Label>Mật khẩu</Label>
                    <Input type="password" defaultValue="••••••••" className="mt-2" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => toast.success("Đã lưu cài đặt thông báo")}>
                  <Save className="w-4 h-4 mr-2" />
                  Lưu cài đặt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Cấu hình thanh toán
              </CardTitle>
              <CardDescription>Quản lý phương thức và cổng thanh toán</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Phương thức thanh toán</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Tiền mặt</p>
                      <p className="text-sm text-muted-foreground">Thanh toán trực tiếp tại khách sạn</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Chuyển khoản ngân hàng</p>
                      <p className="text-sm text-muted-foreground">Chuyển khoản qua STK ngân hàng</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Thẻ tín dụng/Ghi nợ</p>
                      <p className="text-sm text-muted-foreground">Thanh toán bằng thẻ</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Ví điện tử</p>
                      <p className="text-sm text-muted-foreground">MoMo, ZaloPay, VNPay</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Thông tin ngân hàng</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Tên ngân hàng</Label>
                    <Input defaultValue="Vietcombank" className="mt-2" />
                  </div>
                  <div>
                    <Label>Số tài khoản</Label>
                    <Input defaultValue="0123456789" className="mt-2" />
                  </div>
                  <div className="col-span-2">
                    <Label>Chủ tài khoản</Label>
                    <Input defaultValue="CONG TY HOTEL PARADISE" className="mt-2" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Chính sách thanh toán</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Yêu cầu đặt cọc</Label>
                      <p className="text-sm text-muted-foreground">% giá trị đặt phòng</p>
                    </div>
                    <Input type="number" defaultValue="30" className="w-24" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Thuế VAT</Label>
                      <p className="text-sm text-muted-foreground">% thuế giá trị gia tăng</p>
                    </div>
                    <Input type="number" defaultValue="10" className="w-24" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Phí dịch vụ</Label>
                      <p className="text-sm text-muted-foreground">% phí dịch vụ</p>
                    </div>
                    <Input type="number" defaultValue="5" className="w-24" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => toast.success("Đã lưu cài đặt thanh toán")}>
                  <Save className="w-4 h-4 mr-2" />
                  Lưu cài đặt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Bảo mật
              </CardTitle>
              <CardDescription>Cấu hình các tùy chọn bảo mật hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Chính sách mật khẩu</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Độ dài tối thiểu</Label>
                      <p className="text-sm text-muted-foreground">Số ký tự tối thiểu</p>
                    </div>
                    <Input type="number" defaultValue="8" className="w-24" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Yêu cầu chữ hoa</Label>
                      <p className="text-sm text-muted-foreground">Ít nhất 1 ký tự viết hoa</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Yêu cầu số</Label>
                      <p className="text-sm text-muted-foreground">Ít nhất 1 chữ số</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Yêu cầu ký tự đặc biệt</Label>
                      <p className="text-sm text-muted-foreground">Ít nhất 1 ký tự đặc biệt</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Xác thực 2 lớp (2FA)</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Bắt buộc 2FA cho Admin</Label>
                      <p className="text-sm text-muted-foreground">Yêu cầu xác thực 2 lớp khi đăng nhập</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Tùy chọn 2FA cho nhân viên</Label>
                      <p className="text-sm text-muted-foreground">Cho phép nhân viên bật 2FA</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Phiên làm việc</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Thời gian timeout</Label>
                      <p className="text-sm text-muted-foreground">Phút không hoạt động trước khi đăng xuất</p>
                    </div>
                    <Input type="number" defaultValue="30" className="w-24" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Giới hạn thiết bị đăng nhập</Label>
                      <p className="text-sm text-muted-foreground">Số thiết bị tối đa cùng lúc</p>
                    </div>
                    <Input type="number" defaultValue="3" className="w-24" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">IP Whitelist</h4>
                <div>
                  <Label>Danh sách IP được phép</Label>
                  <p className="text-sm text-muted-foreground mb-2">Chỉ cho phép truy cập từ các IP này (để trống = tất cả)</p>
                  <Input placeholder="192.168.1.1, 192.168.1.2" className="mt-2" />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => toast.success("Đã lưu cài đặt bảo mật")}>
                  <Save className="w-4 h-4 mr-2" />
                  Lưu cài đặt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
});

AdminSystemSettings.displayName = "AdminSystemSettings";
