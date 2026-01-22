import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, MapPin, Users } from "lucide-react@0.487.0";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroSectionProps {
  onSearch: (searchData: any) => void;
}

export const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({ onSearch }, ref) => {
    const handleSearch = () => {
      onSearch({
        checkIn: '2024-02-01',
        checkOut: '2024-02-03',
        guests: 2,
        rooms: 1
      });
    };

    return (
      <section ref={ref} className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1695706807850-8c66b24b3413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGxvYmJ5JTIwbW9kZXJufGVufDF8fHx8MTc1ODQ4NjQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Hotel Lobby"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 container text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Trải nghiệm kỳ nghỉ tuyệt vời
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Khám phá những căn phòng sang trọng với dịch vụ 5 sao và vị trí đắc địa tại trung tâm thành phố
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ngày nhận phòng</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="date" className="pl-10" defaultValue="2024-02-01" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Ngày trả phòng</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="date" className="pl-10" defaultValue="2024-02-03" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Số khách</label>
                  <Select defaultValue="2">
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 khách</SelectItem>
                      <SelectItem value="2">2 khách</SelectItem>
                      <SelectItem value="3">3 khách</SelectItem>
                      <SelectItem value="4">4 khách</SelectItem>
                      <SelectItem value="5">5+ khách</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Số phòng</label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 phòng</SelectItem>
                      <SelectItem value="2">2 phòng</SelectItem>
                      <SelectItem value="3">3 phòng</SelectItem>
                      <SelectItem value="4">4+ phòng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button size="lg" onClick={handleSearch} className="w-full">
                  Tìm phòng
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";