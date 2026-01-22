import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import {
  Search,
  Filter,
  FileText,
  Eye,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  Wallet,
  DollarSign,
  Calendar
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingCode: string;
  customerName: string;
  customerEmail: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomPrice: number;
  serviceCharges: number;
  tax: number;
  total: number;
  paymentMethod: "cash" | "card" | "transfer" | "online";
  paymentStatus: "pending" | "paid" | "partial" | "refunded" | "cancelled";
  createdAt: string;
  paidAt?: string;
}

export const StaffInvoiceManagement = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const mockInvoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV001",
      bookingCode: "BK001",
      customerName: "Nguyễn Văn A",
      customerEmail: "nguyenvana@email.com",
      roomType: "Deluxe Ocean View",
      checkIn: "2024-10-28",
      checkOut: "2024-10-30",
      nights: 2,
      roomPrice: 1450000,
      serviceCharges: 200000,
      tax: 330000,
      total: 3130000,
      paymentMethod: "card",
      paymentStatus: "paid",
      createdAt: "2024-10-26 14:30",
      paidAt: "2024-10-26 14:35"
    },
    {
      id: "2",
      invoiceNumber: "INV002",
      bookingCode: "BK002",
      customerName: "Trần Thị B",
      customerEmail: "tranthib@email.com",
      roomType: "Standard Room",
      checkIn: "2024-10-27",
      checkOut: "2024-10-29",
      nights: 2,
      roomPrice: 850000,
      serviceCharges: 150000,
      tax: 200000,
      total: 1900000,
      paymentMethod: "transfer",
      paymentStatus: "pending",
      createdAt: "2024-10-25 10:15"
    },
    {
      id: "3",
      invoiceNumber: "INV003",
      bookingCode: "BK003",
      customerName: "Lê Văn C",
      customerEmail: "levanc@email.com",
      roomType: "Presidential Suite",
      checkIn: "2024-10-29",
      checkOut: "2024-11-01",
      nights: 3,
      roomPrice: 2800000,
      serviceCharges: 500000,
      tax: 840000,
      total: 9240000,
      paymentMethod: "online",
      paymentStatus: "paid",
      createdAt: "2024-10-26 16:45",
      paidAt: "2024-10-26 16:50"
    },
    {
      id: "4",
      invoiceNumber: "INV004",
      bookingCode: "BK004",
      customerName: "Phạm Thị D",
      customerEmail: "phamthid@email.com",
      roomType: "Deluxe Family Room",
      checkIn: "2024-10-26",
      checkOut: "2024-10-28",
      nights: 2,
      roomPrice: 1680000,
      serviceCharges: 250000,
      tax: 386000,
      total: 3996000,
      paymentMethod: "cash",
      paymentStatus: "paid",
      createdAt: "2024-10-24 09:20",
      paidAt: "2024-10-26 12:00"
    },
    {
      id: "5",
      invoiceNumber: "INV005",
      bookingCode: "BK005",
      customerName: "Hoàng Văn E",
      customerEmail: "hoangvane@email.com",
      roomType: "Standard Room",
      checkIn: "2024-10-30",
      checkOut: "2024-11-02",
      nights: 3,
      roomPrice: 850000,
      serviceCharges: 200000,
      tax: 255000,
      total: 2805000,
      paymentMethod: "transfer",
      paymentStatus: "partial",
      createdAt: "2024-10-26 11:30"
    }
  ];

  const getStatusBadge = (status: Invoice["paymentStatus"]) => {
    const configs = {
      pending: { label: "Chờ thanh toán", className: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: Clock },
      paid: { label: "Đã thanh toán", className: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
      partial: { label: "Thanh toán 1 phần", className: "bg-blue-50 text-blue-700 border-blue-200", icon: DollarSign },
      refunded: { label: "Đã hoàn tiền", className: "bg-purple-50 text-purple-700 border-purple-200", icon: Wallet },
      cancelled: { label: "Đã hủy", className: "bg-red-50 text-red-700 border-red-200", icon: XCircle }
    };

    const config = configs[status];
    return (
      <Badge variant="outline" className={config.className}>
        <config.icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getPaymentMethodLabel = (method: Invoice["paymentMethod"]) => {
    const methods = {
      cash: "Tiền mặt",
      card: "Thẻ",
      transfer: "Chuyển khoản",
      online: "Thanh toán online"
    };
    return methods[method];
  };

  const handleConfirmPayment = (invoice: Invoice) => {
    toast.success(`Đã xác nhận thanh toán cho hóa đơn ${invoice.invoiceNumber}`);
    setIsDetailOpen(false);
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    toast.success(`Đang tải xuống hóa đơn ${invoice.invoiceNumber}`);
  };

  const filteredInvoices = mockInvoices.filter(invoice => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
      invoice.bookingCode.toLowerCase().includes(searchLower) ||
      invoice.customerName.toLowerCase().includes(searchLower) ||
      invoice.customerEmail.toLowerCase().includes(searchLower);
    
    const matchesStatus = filterStatus === "all" || invoice.paymentStatus === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockInvoices.reduce((sum, inv) => sum + inv.total, 0),
    paid: mockInvoices.filter(inv => inv.paymentStatus === "paid").length,
    pending: mockInvoices.filter(inv => inv.paymentStatus === "pending").length,
    thisMonth: mockInvoices.filter(inv => inv.createdAt.startsWith("2024-10")).length
  };

  return (
    <div ref={ref} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Quản lý hóa đơn & Thanh toán</h2>
        <p className="text-muted-foreground">Kiểm tra và xác nhận các giao dịch thanh toán</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tổng doanh thu</p>
                <p className="text-2xl font-bold">₫{(stats.total / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Đã thanh toán</p>
                <p className="text-2xl font-bold">{stats.paid}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Chờ thanh toán</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hóa đơn tháng này</p>
                <p className="text-2xl font-bold">{stats.thisMonth}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
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
                  placeholder="Tìm theo mã hóa đơn, mã đặt phòng, tên khách hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="pending">Chờ thanh toán</SelectItem>
                <SelectItem value="paid">Đã thanh toán</SelectItem>
                <SelectItem value="partial">Thanh toán 1 phần</SelectItem>
                <SelectItem value="refunded">Đã hoàn tiền</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách hóa đơn</CardTitle>
          <CardDescription>Hiển thị {filteredInvoices.length} hóa đơn</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã hóa đơn</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Phòng & Thời gian</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Phương thức</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Không tìm thấy hóa đơn nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{invoice.invoiceNumber}</p>
                        <p className="text-sm text-muted-foreground">{invoice.bookingCode}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{invoice.customerName}</p>
                        <p className="text-sm text-muted-foreground">{invoice.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{invoice.roomType}</p>
                        <p className="text-sm text-muted-foreground">
                          {invoice.checkIn} → {invoice.checkOut} ({invoice.nights} đêm)
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ₫{invoice.total.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{getPaymentMethodLabel(invoice.paymentMethod)}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(invoice.paymentStatus)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setIsDetailOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Chi tiết
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadInvoice(invoice)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Invoice Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Chi tiết hóa đơn
            </DialogTitle>
            <DialogDescription>Thông tin chi tiết về hóa đơn và thanh toán</DialogDescription>
          </DialogHeader>

          {selectedInvoice && (
            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">Hotel Paradise</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    123 Lê Lợi, Quận 1, TP.HCM
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tel: +84 28 1234 5678
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">HÓA ĐƠN</p>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.invoiceNumber}</p>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.createdAt}</p>
                </div>
              </div>

              <Separator />

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Khách hàng</Label>
                  <p className="font-medium mt-1">{selectedInvoice.customerName}</p>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.customerEmail}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Mã đặt phòng</Label>
                  <p className="font-medium mt-1">{selectedInvoice.bookingCode}</p>
                </div>
              </div>

              <Separator />

              {/* Invoice Details */}
              <div>
                <Label className="text-muted-foreground mb-3 block">Chi tiết</Label>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Loại phòng</span>
                    <span className="font-medium">{selectedInvoice.roomType}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Thời gian</span>
                    <span>{selectedInvoice.checkIn} → {selectedInvoice.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số đêm</span>
                    <span>{selectedInvoice.nights} đêm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giá phòng</span>
                    <span>₫{selectedInvoice.roomPrice.toLocaleString()} × {selectedInvoice.nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí dịch vụ</span>
                    <span>₫{selectedInvoice.serviceCharges.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thuế VAT (10%)</span>
                    <span>₫{selectedInvoice.tax.toLocaleString()}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng</span>
                    <span>₫{selectedInvoice.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Phương thức thanh toán</Label>
                  <p className="mt-1 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    {getPaymentMethodLabel(selectedInvoice.paymentMethod)}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Trạng thái</Label>
                  <div className="mt-1">{getStatusBadge(selectedInvoice.paymentStatus)}</div>
                </div>
                {selectedInvoice.paidAt && (
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Thời gian thanh toán</Label>
                    <p className="mt-1">{selectedInvoice.paidAt}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleDownloadInvoice(selectedInvoice)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống PDF
                </Button>
                {selectedInvoice.paymentStatus === "pending" && (
                  <Button
                    className="flex-1"
                    onClick={() => handleConfirmPayment(selectedInvoice)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Xác nhận thanh toán
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
});

StaffInvoiceManagement.displayName = "StaffInvoiceManagement";
