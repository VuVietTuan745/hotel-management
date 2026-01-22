import React, { useState } from "react";
import { HotelWebsite } from "./components/hotel-website";
import { HotelHeader } from "./components/hotel-header";
import { HeroSection } from "./components/hero-section";
import { RoomCard } from "./components/room-card";
import { RoomFilters } from "./components/room-filters";
import { RoomDetailModal } from "./components/room-detail-modal";
import { BookingModal } from "./components/booking-modal";
import { AuthDialog } from "./components/auth-dialog";
import { StaffDashboard } from "./components/staff-dashboard";
import { AdminDashboard } from "./components/admin-dashboard";
import { CustomerDashboard } from "./components/customer-dashboard";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role?: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<
    "website" | "booking" | "staff" | "admin" | "customer"
  >("website");
  const [user, setUser] = useState<User | null>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] =
    useState(false);

  const handleBookingClick = () => {
    setCurrentView("booking");
  };

  const handleBackToWebsite = () => {
    setCurrentView("website");
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("website");
  };

  const handleStaffAccess = () => {
    // Giả lập staff login
    setUser({
      id: "staff-1",
      email: "staff@hotelparadise.com",
      name: "Nhân viên",
      role: "staff",
    });
    setCurrentView("staff");
  };

  const handleAdminAccess = () => {
    // Giả lập admin login
    setUser({
      id: "admin-1",
      email: "admin@hotelparadise.com",
      name: "Quản trị viên",
      role: "admin",
    });
    setCurrentView("admin");
  };

  const handleProfileClick = () => {
    setCurrentView("customer");
  };

  // Customer Dashboard View
  if (currentView === "customer") {
    return (
      <div className="min-h-screen bg-background">
        <CustomerDashboard
          user={
            user || {
              id: "customer-1",
              email: "customer@email.com",
              name: "Khách hàng",
            }
          }
          onLogout={handleLogout}
          onBackToWebsite={handleBackToWebsite}
        />
        <Toaster />
      </div>
    );
  }

  // Admin Dashboard View
  if (currentView === "admin") {
    return (
      <div className="min-h-screen bg-background">
        <AdminDashboard
          user={
            user || {
              id: "admin-1",
              email: "admin@hotelparadise.com",
              name: "Quản trị viên",
              role: "admin",
            }
          }
          onLogout={handleLogout}
          onBackToWebsite={handleBackToWebsite}
        />
        <Toaster />
      </div>
    );
  }

  // Staff Dashboard View
  if (currentView === "staff") {
    return (
      <div className="min-h-screen bg-background">
        <StaffDashboard
          user={
            user || {
              id: "staff-1",
              email: "staff@hotelparadise.com",
              name: "Nhân viên",
              role: "staff",
            }
          }
          onLogout={handleLogout}
          onBackToWebsite={handleBackToWebsite}
        />
        <Toaster />
      </div>
    );
  }

  // Website View
  if (currentView === "website") {
    return (
      <div className="min-h-screen bg-background">
        <HotelWebsite
          onBookingClick={handleBookingClick}
          onLoginClick={() => setIsAuthDialogOpen(true)}
          onProfileClick={handleProfileClick}
          user={user}
          onLogout={handleLogout}
        />
        <AuthDialog
          isOpen={isAuthDialogOpen}
          onClose={() => setIsAuthDialogOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />

        {/* Demo buttons for staff and admin access */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <Button
            onClick={handleAdminAccess}
            className="shadow-lg"
            size="lg"
          >
            👑 Demo: Truy cập Quản trị
          </Button>
          <Button
            onClick={handleStaffAccess}
            className="shadow-lg"
            size="lg"
            variant="secondary"
          >
            🔐 Demo: Truy cập Nhân viên
          </Button>
        </div>

        <Toaster />
      </div>
    );
  }

  // Booking system view (existing code)
  return (
    <BookingSystemView
      onBackToWebsite={handleBackToWebsite}
      user={user}
      onLoginClick={() => setIsAuthDialogOpen(true)}
      onLogout={handleLogout}
      isAuthDialogOpen={isAuthDialogOpen}
      setIsAuthDialogOpen={setIsAuthDialogOpen}
      onAuthSuccess={handleAuthSuccess}
    />
  );
}

// Booking System Component (refactored from original App.tsx)
interface BookingSystemViewProps {
  onBackToWebsite: () => void;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  isAuthDialogOpen: boolean;
  setIsAuthDialogOpen: (open: boolean) => void;
  onAuthSuccess: (user: User) => void;
}

function BookingSystemView({
  onBackToWebsite,
  user,
  onLoginClick,
  onLogout,
  isAuthDialogOpen,
  setIsAuthDialogOpen,
  onAuthSuccess,
}: BookingSystemViewProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(
    null,
  );
  const [isDetailModalOpen, setIsDetailModalOpen] =
    useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] =
    useState(false);
  const [bookingRoom, setBookingRoom] = useState<Room | null>(
    null,
  );

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priceRange: [0, 3000000],
    roomType: "all",
    amenities: [],
    rating: "all",
    sortBy: "popular",
  });

  interface Room {
    id: string;
    name: string;
    type: string;
    image: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    size: string;
    guests: number;
    amenities: string[];
    description: string;
    available: boolean;
    discount?: number;
  }

  interface FilterState {
    search: string;
    priceRange: [number, number];
    roomType: string;
    amenities: string[];
    rating: string;
    sortBy: string;
  }

  const mockRooms: Room[] = [
    {
      id: "1",
      name: "Phòng Standard Deluxe",
      type: "standard",
      image:
        "https://images.unsplash.com/photo-1648383228240-6ed939727ad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN0YW5kYXJkJTIwcm9vbXxlbnwxfHx8fDE3NTg0NjkzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 850000,
      originalPrice: 1000000,
      rating: 4.2,
      reviews: 128,
      size: "25m²",
      guests: 2,
      amenities: ["wifi", "tv", "ac", "bathroom"],
      description:
        "Phòng Standard rộng rãi với thiết kế hiện đại, đầy đủ tiện nghi cho kỳ nghỉ thoải mái. Tầm nhìn đẹp ra thành phố, nội thất sang trọng.",
      available: true,
      discount: 15,
    },
    {
      id: "2",
      name: "Phòng Deluxe Ocean View",
      type: "deluxe",
      image:
        "https://images.unsplash.com/photo-1560703652-7838c2525e2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlbHV4ZSUyMHN1aXRlfGVufDF8fHx8MTc1ODQ2NzI2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 1450000,
      rating: 4.6,
      reviews: 89,
      size: "35m²",
      guests: 3,
      amenities: ["wifi", "tv", "ac", "bathroom", "parking"],
      description:
        "Phòng Deluxe cao cấp với ban công riêng hướng biển. Thiết kế thanh lịch, trang bị đầy đủ tiện nghi hiện đại cho trải nghiệm tuyệt vời.",
      available: true,
    },
    {
      id: "3",
      name: "Suite Presidential",
      type: "suite",
      image:
        "https://images.unsplash.com/photo-1626868449668-fb47a048d9cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzU4NTI4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 2800000,
      rating: 4.9,
      reviews: 45,
      size: "65m²",
      guests: 4,
      amenities: [
        "wifi",
        "tv",
        "ac",
        "bathroom",
        "parking",
        "restaurant",
      ],
      description:
        "Suite sang trọng bậc nhất với phòng khách riêng biệt, phòng ngủ master và ban công panorama. Dịch vụ butler 24/7.",
      available: true,
    },
    {
      id: "4",
      name: "Phòng Standard Garden",
      type: "standard",
      image:
        "https://images.unsplash.com/photo-1648383228240-6ed939727ad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN0YW5kYXJkJTIwcm9vbXxlbnwxfHx8fDE3NTg0NjkzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 650000,
      rating: 4.0,
      reviews: 156,
      size: "22m²",
      guests: 2,
      amenities: ["wifi", "tv", "ac", "bathroom"],
      description:
        "Phòng Standard với view vườn xanh mát, không gian yên tĩnh lý tưởng cho nghỉ dưỡng. Giá tốt nhất cho chất lượng dịch vụ.",
      available: false,
    },
    {
      id: "5",
      name: "Deluxe Family Room",
      type: "deluxe",
      image:
        "https://images.unsplash.com/photo-1560703652-7838c2525e2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlbHV4ZSUyMHN1aXRlfGVufDF8fHx8MTc1ODQ2NzI2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 1680000,
      originalPrice: 1800000,
      rating: 4.4,
      reviews: 72,
      size: "42m²",
      guests: 4,
      amenities: ["wifi", "tv", "ac", "bathroom", "parking"],
      description:
        "Phòng gia đình spacious với 2 giường đôi và khu vực sinh hoạt riêng. Phù hợp cho gia đình có trẻ em.",
      available: true,
      discount: 7,
    },
    {
      id: "6",
      name: "Executive Suite",
      type: "suite",
      image:
        "https://images.unsplash.com/photo-1626868449668-fb47a048d9cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzU4NTI4NjcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 2200000,
      rating: 4.7,
      reviews: 63,
      size: "55m²",
      guests: 3,
      amenities: [
        "wifi",
        "tv",
        "ac",
        "bathroom",
        "parking",
        "restaurant",
      ],
      description:
        "Suite executive với không gian làm việc riêng và phòng họp nhỏ. Lý tưởng cho khách doanh nhân.",
      available: true,
    },
  ];

  const filteredAndSortedRooms = React.useMemo(() => {
    let filtered = mockRooms.filter((room) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !room.name.toLowerCase().includes(searchLower) &&
          !room.type.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Price filter
      if (
        room.price < filters.priceRange[0] ||
        room.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Room type filter
      if (
        filters.roomType !== "all" &&
        room.type !== filters.roomType
      ) {
        return false;
      }

      // Rating filter
      if (filters.rating !== "all") {
        const minRating = parseFloat(filters.rating);
        if (room.rating < minRating) {
          return false;
        }
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(
          (amenity) => room.amenities.includes(amenity),
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });

    // Sort rooms
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // popular
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    return filtered;
  }, [filters]);

  const handleViewDetails = (room: Room) => {
    setSelectedRoom(room);
    setIsDetailModalOpen(true);
  };

  const handleBookNow = (room: Room) => {
    setBookingRoom(room);
    setIsBookingModalOpen(true);
    setIsDetailModalOpen(false);
  };

  const handleSearch = (searchData: any) => {
    console.log("Search data:", searchData);
    // Scroll to rooms section
    document
      .getElementById("rooms-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      priceRange: [0, 3000000],
      roomType: "all",
      amenities: [],
      rating: "all",
      sortBy: "popular",
    });
  };

  const handleBookingSuccess = () => {
    console.log("Booking successful!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-white shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              Hệ thống đặt phòng
            </h1>
            <Button onClick={onBackToWebsite} variant="outline">
              ← Về trang chủ
            </Button>
          </div>
        </div>
      </div>

      <HotelHeader
        onSearchClick={() => {}}
        onProfileClick={() => {}}
        onBookingsClick={() => {}}
        user={user}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
      />

      <HeroSection onSearch={handleSearch} />

      <section id="rooms-section" className="py-12 bg-muted/20">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Phòng nghỉ của chúng tôi
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Khám phá bộ sưu tập phòng sang trọng với thiết kế
              tinh tế và tiện nghi đầy đủ cho kỳ nghỉ hoàn hảo
              của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <RoomFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
              />
            </div>

            <div className="lg:col-span-3">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-muted-foreground">
                  Tìm thấy {filteredAndSortedRooms.length} phòng
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedRooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onViewDetails={handleViewDetails}
                    onBookNow={handleBookNow}
                  />
                ))}
              </div>

              {filteredAndSortedRooms.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Không tìm thấy phòng nào phù hợp với tiêu
                    chí của bạn.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="text-primary hover:underline mt-2"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">
                Hotel Paradise
              </h3>
              <p className="text-primary-foreground/80 mb-4">
                Trải nghiệm kỳ nghỉ sang trọng với dịch vụ 5 sao
                tại trung tâm thành phố.
              </p>
              <div className="space-y-2 text-sm text-primary-foreground/80">
                <p>📍 123 Lê Lợi, Quận 1, TP.HCM</p>
                <p>📞 +84 28 1234 5678</p>
                <p>✉️ info@hotelparadise.com</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Phòng nghỉ</li>
                <li>Nhà hàng</li>
                <li>Spa & Wellness</li>
                <li>Hội nghị & Sự kiện</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Thông tin</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Về chúng tôi</li>
                <li>Chính sách</li>
                <li>Điều khoản</li>
                <li>Liên hệ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                Theo dõi chúng tôi
              </h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
            © 2024 Hotel Paradise. All rights reserved.
          </div>
        </div>
      </footer>

      <RoomDetailModal
        room={selectedRoom}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onBookNow={handleBookNow}
      />

      <BookingModal
        room={bookingRoom}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />

      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        onAuthSuccess={onAuthSuccess}
      />

      <Toaster />
    </div>
  );
}