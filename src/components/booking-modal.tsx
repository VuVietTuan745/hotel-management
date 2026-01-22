import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent } from "./ui/card";
import { Calendar, User, Mail, Phone, CreditCard, Check } from "lucide-react@0.487.0";
import { toast } from "sonner@2.0.3";

interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
}

interface BookingModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: () => void;
}

export const BookingModal = React.forwardRef<HTMLDivElement, BookingModalProps>(
  ({ room, isOpen, onClose, onBookingSuccess }, ref) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      checkIn: '2024-02-01',
      checkOut: '2024-02-03',
      guests: '2',
      specialRequests: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: 'Vietnam',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
      agreeTerms: false,
      newsletter: false
    });

    const updateFormData = (field: string, value: string | boolean) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const calculateTotal = () => {
      if (!room) return 0;
      const nights = 2; // Simplified calculation
      const roomTotal = room.price * nights;
      const serviceFee = 50000;
      const tax = roomTotal * 0.1;
      return roomTotal + serviceFee + tax;
    };

    const handleNext = () => {
      if (step < 3) {
        setStep(step + 1);
      }
    };

    const handleBack = () => {
      if (step > 1) {
        setStep(step - 1);
      }
    };

    const handleSubmit = () => {
      if (!formData.agreeTerms) {
        toast.error("Vui lòng đồng ý với điều khoản sử dụng");
        return;
      }
      
      // Simulate booking process
      setTimeout(() => {
        toast.success("Đặt phòng thành công! Thông tin đặt phòng đã được gửi đến email của bạn.");
        onBookingSuccess();
        onClose();
        setStep(1);
      }, 1000);
    };

    if (!room) return null;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent ref={ref} className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Đặt phòng - {room.name}</DialogTitle>
            <DialogDescription>
              Hoàn tất thông tin để đặt phòng của bạn
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Progress indicator */}
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step > stepNum ? <Check className="w-4 h-4" /> : stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-16 h-0.5 ${step > stepNum ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Booking Details */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Chi tiết đặt phòng</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkin">Ngày nhận phòng</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="checkin"
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => updateFormData('checkIn', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkout">Ngày trả phòng</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="checkout"
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) => updateFormData('checkOut', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests">Số khách</Label>
                  <Select value={formData.guests} onValueChange={(value) => updateFormData('guests', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 khách</SelectItem>
                      <SelectItem value="2">2 khách</SelectItem>
                      <SelectItem value="3">3 khách</SelectItem>
                      <SelectItem value="4">4 khách</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requests">Yêu cầu đặc biệt (tùy chọn)</Label>
                  <textarea
                    id="requests"
                    className="w-full p-2 border rounded-md min-h-[80px]"
                    placeholder="Ví dụ: Phòng tầng cao, giường đôi, check-in sớm..."
                    value={formData.specialRequests}
                    onChange={(e) => updateFormData('specialRequests', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Thông tin cá nhân</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Họ</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      placeholder="Nhập họ"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Tên</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      placeholder="Nhập tên"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        placeholder="your@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        placeholder="+84 123 456 789"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    placeholder="Nhập địa chỉ"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Thành phố</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                      placeholder="Thành phố"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Quốc gia</Label>
                    <Select value={formData.country} onValueChange={(value) => updateFormData('country', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vietnam">Việt Nam</SelectItem>
                        <SelectItem value="USA">Hoa Kỳ</SelectItem>
                        <SelectItem value="Japan">Nhật Bản</SelectItem>
                        <SelectItem value="Korea">Hàn Quốc</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Thông tin thanh toán</h3>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>{room.name} x 2 đêm</span>
                        <span>₫{(room.price * 2).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phí dịch vụ</span>
                        <span>₫50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Thuế (10%)</span>
                        <span>₫{(room.price * 2 * 0.1).toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Tổng cộng</span>
                        <span>₫{calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Số thẻ</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => updateFormData('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Ngày hết hạn</Label>
                      <Input
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => updateFormData('expiryDate', e.target.value)}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={formData.cvv}
                        onChange={(e) => updateFormData('cvv', e.target.value)}
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Tên trên thẻ</Label>
                    <Input
                      id="cardName"
                      value={formData.cardName}
                      onChange={(e) => updateFormData('cardName', e.target.value)}
                      placeholder="NGUYEN VAN A"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => updateFormData('agreeTerms', checked)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Tôi đồng ý với <span className="text-primary cursor-pointer">điều khoản sử dụng</span> và <span className="text-primary cursor-pointer">chính sách bảo mật</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => updateFormData('newsletter', checked)}
                    />
                    <Label htmlFor="newsletter" className="text-sm">
                      Nhận thông tin khuyến mãi qua email
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={step === 1 ? onClose : handleBack}
              >
                {step === 1 ? 'Hủy' : 'Quay lại'}
              </Button>
              <Button
                onClick={step === 3 ? handleSubmit : handleNext}
                disabled={step === 3 && !formData.agreeTerms}
              >
                {step === 3 ? 'Hoàn tất đặt phòng' : 'Tiếp tục'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

BookingModal.displayName = "BookingModal";