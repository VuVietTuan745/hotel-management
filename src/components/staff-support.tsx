import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { toast } from "sonner@2.0.3";
import {
  Search,
  Filter,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Phone,
  Mail,
  User
} from "lucide-react";

interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingCode?: string;
  subject: string;
  category: "booking" | "payment" | "room" | "service" | "complaint" | "other";
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "inProgress" | "resolved" | "closed";
  description: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

interface TicketMessage {
  id: string;
  sender: "customer" | "staff";
  senderName: string;
  content: string;
  timestamp: string;
}

export const StaffSupport = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const mockTickets: SupportTicket[] = [
    {
      id: "1",
      ticketNumber: "TK001",
      customerName: "Nguyễn Văn A",
      customerEmail: "nguyenvana@email.com",
      customerPhone: "0901234567",
      bookingCode: "BK001",
      subject: "Yêu cầu đổi phòng",
      category: "room",
      priority: "high",
      status: "open",
      description: "Tôi muốn đổi sang phòng tầng cao hơn vì phòng hiện tại ồn ào.",
      createdAt: "2024-10-26 10:30",
      updatedAt: "2024-10-26 10:30",
      messages: [
        {
          id: "1",
          sender: "customer",
          senderName: "Nguyễn Văn A",
          content: "Tôi muốn đổi sang phòng tầng cao hơn vì phòng hiện tại ồn ào.",
          timestamp: "2024-10-26 10:30"
        }
      ]
    },
    {
      id: "2",
      ticketNumber: "TK002",
      customerName: "Trần Thị B",
      customerEmail: "tranthib@email.com",
      customerPhone: "0912345678",
      bookingCode: "BK002",
      subject: "Hỏi về thanh toán",
      category: "payment",
      priority: "medium",
      status: "inProgress",
      description: "Tôi chưa nhận được hóa đơn thanh toán qua email.",
      createdAt: "2024-10-25 14:20",
      updatedAt: "2024-10-26 09:15",
      messages: [
        {
          id: "1",
          sender: "customer",
          senderName: "Trần Thị B",
          content: "Tôi chưa nhận được hóa đơn thanh toán qua email.",
          timestamp: "2024-10-25 14:20"
        },
        {
          id: "2",
          sender: "staff",
          senderName: "Nhân viên hỗ trợ",
          content: "Chúng tôi đã gửi lại hóa đơn vào email của bạn. Vui lòng kiểm tra hộp thư spam.",
          timestamp: "2024-10-26 09:15"
        }
      ]
    },
    {
      id: "3",
      ticketNumber: "TK003",
      customerName: "Lê Văn C",
      customerEmail: "levanc@email.com",
      customerPhone: "0923456789",
      subject: "Yêu cầu dịch vụ spa",
      category: "service",
      priority: "low",
      status: "resolved",
      description: "Tôi muốn đặt lịch spa vào ngày mai lúc 10h sáng.",
      createdAt: "2024-10-24 16:45",
      updatedAt: "2024-10-25 08:30",
      messages: [
        {
          id: "1",
          sender: "customer",
          senderName: "Lê Văn C",
          content: "Tôi muốn đặt lịch spa vào ngày mai lúc 10h sáng.",
          timestamp: "2024-10-24 16:45"
        },
        {
          id: "2",
          sender: "staff",
          senderName: "Nhân viên hỗ trợ",
          content: "Chúng tôi đã đặt lịch spa cho bạn vào 10h sáng ngày mai. Cảm ơn bạn!",
          timestamp: "2024-10-25 08:30"
        }
      ]
    },
    {
      id: "4",
      ticketNumber: "TK004",
      customerName: "Phạm Thị D",
      customerEmail: "phamthid@email.com",
      customerPhone: "0934567890",
      bookingCode: "BK004",
      subject: "Khiếu nại về vệ sinh phòng",
      category: "complaint",
      priority: "urgent",
      status: "inProgress",
      description: "Phòng chưa được vệ sinh sạch sẽ khi tôi check-in.",
      createdAt: "2024-10-26 08:15",
      updatedAt: "2024-10-26 08:45",
      messages: [
        {
          id: "1",
          sender: "customer",
          senderName: "Phạm Thị D",
          content: "Phòng chưa được vệ sinh sạch sẽ khi tôi check-in.",
          timestamp: "2024-10-26 08:15"
        },
        {
          id: "2",
          sender: "staff",
          senderName: "Nhân viên hỗ trợ",
          content: "Chúng tôi rất xin lỗi về sự bất tiện này. Chúng tôi sẽ cử nhân viên vệ sinh ngay lập tức.",
          timestamp: "2024-10-26 08:45"
        }
      ]
    },
    {
      id: "5",
      ticketNumber: "TK005",
      customerName: "Hoàng Văn E",
      customerEmail: "hoangvane@email.com",
      customerPhone: "0945678901",
      subject: "Hỏi về chính sách hủy phòng",
      category: "booking",
      priority: "low",
      status: "closed",
      description: "Tôi muốn biết chính sách hủy phòng nếu tôi hủy trước 2 ngày.",
      createdAt: "2024-10-23 11:30",
      updatedAt: "2024-10-23 14:20",
      messages: [
        {
          id: "1",
          sender: "customer",
          senderName: "Hoàng Văn E",
          content: "Tôi muốn biết chính sách hủy phòng nếu tôi hủy trước 2 ngày.",
          timestamp: "2024-10-23 11:30"
        },
        {
          id: "2",
          sender: "staff",
          senderName: "Nhân viên hỗ trợ",
          content: "Nếu bạn hủy trước 2 ngày, chúng tôi sẽ hoàn lại 80% số tiền. Cảm ơn bạn!",
          timestamp: "2024-10-23 14:20"
        }
      ]
    }
  ];

  const getCategoryLabel = (category: SupportTicket["category"]) => {
    const categories = {
      booking: "Đặt phòng",
      payment: "Thanh toán",
      room: "Phòng",
      service: "Dịch vụ",
      complaint: "Khiếu nại",
      other: "Khác"
    };
    return categories[category];
  };

  const getPriorityBadge = (priority: SupportTicket["priority"]) => {
    const configs = {
      low: { label: "Thấp", className: "bg-blue-50 text-blue-700" },
      medium: { label: "Trung bình", className: "bg-yellow-50 text-yellow-700" },
      high: { label: "Cao", className: "bg-orange-50 text-orange-700" },
      urgent: { label: "Khẩn cấp", className: "bg-red-50 text-red-700" }
    };
    return (
      <Badge className={configs[priority].className}>
        {configs[priority].label}
      </Badge>
    );
  };

  const getStatusBadge = (status: SupportTicket["status"]) => {
    const configs = {
      open: { label: "Mới", className: "bg-blue-50 text-blue-700", icon: AlertCircle },
      inProgress: { label: "Đang xử lý", className: "bg-yellow-50 text-yellow-700", icon: Clock },
      resolved: { label: "Đã giải quyết", className: "bg-green-50 text-green-700", icon: CheckCircle },
      closed: { label: "Đã đóng", className: "bg-gray-100 text-gray-700", icon: CheckCircle }
    };
    const config = configs[status];
    return (
      <Badge className={config.className}>
        <config.icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      toast.error("Vui lòng nhập nội dung phản hồi");
      return;
    }
    toast.success("Đã gửi phản hồi");
    setReplyMessage("");
  };

  const handleStatusChange = (ticketNumber: string, newStatus: SupportTicket["status"]) => {
    toast.success(`Đã cập nhật trạng thái ticket ${ticketNumber}`);
  };

  const filteredTickets = mockTickets.filter(ticket => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      ticket.ticketNumber.toLowerCase().includes(searchLower) ||
      ticket.customerName.toLowerCase().includes(searchLower) ||
      ticket.subject.toLowerCase().includes(searchLower);
    
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
    const matchesPriority = filterPriority === "all" || ticket.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    open: mockTickets.filter(t => t.status === "open").length,
    inProgress: mockTickets.filter(t => t.status === "inProgress").length,
    resolved: mockTickets.filter(t => t.status === "resolved").length,
    urgent: mockTickets.filter(t => t.priority === "urgent").length
  };

  return (
    <div ref={ref} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Hỗ trợ khách hàng</h2>
        <p className="text-muted-foreground">Quản lý và phản hồi các yêu cầu hỗ trợ</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Yêu cầu mới</p>
                <p className="text-2xl font-bold">{stats.open}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Đang xử lý</p>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Đã giải quyết</p>
                <p className="text-2xl font-bold">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Khẩn cấp</p>
                <p className="text-2xl font-bold">{stats.urgent}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
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
                  placeholder="Tìm theo mã ticket, tên khách hàng, chủ đề..."
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
                <SelectItem value="open">Mới</SelectItem>
                <SelectItem value="inProgress">Đang xử lý</SelectItem>
                <SelectItem value="resolved">Đã giải quyết</SelectItem>
                <SelectItem value="closed">Đã đóng</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Độ ưu tiên" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả mức độ</SelectItem>
                <SelectItem value="urgent">Khẩn cấp</SelectItem>
                <SelectItem value="high">Cao</SelectItem>
                <SelectItem value="medium">Trung bình</SelectItem>
                <SelectItem value="low">Thấp</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold">{ticket.ticketNumber}</span>
                    {getStatusBadge(ticket.status)}
                    {getPriorityBadge(ticket.priority)}
                    <Badge variant="outline">{getCategoryLabel(ticket.category)}</Badge>
                  </div>
                  <h4 className="font-semibold mb-2">{ticket.subject}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{ticket.description}</p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      {ticket.customerName}
                    </span>
                    {ticket.bookingCode && (
                      <span>Đặt phòng: {ticket.bookingCode}</span>
                    )}
                    <span className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {ticket.createdAt}
                    </span>
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-3 h-3" />
                      {ticket.messages.length} tin nhắn
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setIsDetailOpen(true);
                  }}
                >
                  Xem chi tiết
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Không tìm thấy yêu cầu hỗ trợ nào</p>
          </CardContent>
        </Card>
      )}

      {/* Ticket Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Chi tiết yêu cầu hỗ trợ
            </DialogTitle>
            <DialogDescription>Xem và phản hồi yêu cầu hỗ trợ từ khách hàng</DialogDescription>
          </DialogHeader>

          {selectedTicket && (
            <div className="space-y-6">
              {/* Ticket Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-semibold">{selectedTicket.ticketNumber}</span>
                  {getStatusBadge(selectedTicket.status)}
                  {getPriorityBadge(selectedTicket.priority)}
                  <Badge variant="outline">{getCategoryLabel(selectedTicket.category)}</Badge>
                </div>
                <h3 className="text-xl font-bold mb-4">{selectedTicket.subject}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-muted-foreground">Khách hàng</Label>
                    <p className="font-medium mt-1">{selectedTicket.customerName}</p>
                  </div>
                  {selectedTicket.bookingCode && (
                    <div>
                      <Label className="text-muted-foreground">Mã đặt phòng</Label>
                      <p className="font-medium mt-1">{selectedTicket.bookingCode}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="text-sm mt-1 flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      {selectedTicket.customerEmail}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Số điện thoại</Label>
                    <p className="text-sm mt-1 flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      {selectedTicket.customerPhone}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">Trạng thái</Label>
                  <Select 
                    value={selectedTicket.status}
                    onValueChange={(v) => handleStatusChange(selectedTicket.ticketNumber, v as SupportTicket["status"])}
                  >
                    <SelectTrigger className="mt-2 w-full md:w-[250px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Mới</SelectItem>
                      <SelectItem value="inProgress">Đang xử lý</SelectItem>
                      <SelectItem value="resolved">Đã giải quyết</SelectItem>
                      <SelectItem value="closed">Đã đóng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              {/* Messages */}
              <div>
                <Label className="mb-4 block">Lịch sử trò chuyện</Label>
                <div className="space-y-4 max-h-[400px] overflow-y-auto border rounded-lg p-4 bg-muted/20">
                  {selectedTicket.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === "staff" ? "flex-row-reverse" : ""}`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={message.sender === "staff" ? "bg-primary text-primary-foreground" : ""}>
                          {message.senderName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`flex-1 ${message.sender === "staff" ? "text-right" : ""}`}>
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender === "customer" && (
                            <>
                              <span className="text-sm font-medium">{message.senderName}</span>
                              <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                            </>
                          )}
                          {message.sender === "staff" && (
                            <>
                              <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                              <span className="text-sm font-medium">{message.senderName}</span>
                            </>
                          )}
                        </div>
                        <div className={`inline-block p-3 rounded-lg ${
                          message.sender === "staff" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-background border"
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply */}
              <div>
                <Label>Phản hồi</Label>
                <Textarea
                  placeholder="Nhập nội dung phản hồi..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
                <Button className="mt-3" onClick={handleSendReply}>
                  <Send className="w-4 h-4 mr-2" />
                  Gửi phản hồi
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
});

StaffSupport.displayName = "StaffSupport";
