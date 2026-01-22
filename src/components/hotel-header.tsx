import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Search, Menu, User, Calendar, Heart, Bell, LogOut, Settings } from "lucide-react@0.487.0";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface HotelHeaderProps {
  onSearchClick: () => void;
  onProfileClick: () => void;
  onBookingsClick: () => void;
  onFavoritesClick?: () => void;
  onNotificationsClick?: () => void;
  onSettingsClick?: () => void;
  user?: User | null;
  onLoginClick?: () => void;
  onLogout?: () => void;
}

export const HotelHeader = React.forwardRef<HTMLElement, HotelHeaderProps>(
  ({ onSearchClick, onProfileClick, onBookingsClick, onFavoritesClick, onNotificationsClick, onSettingsClick, user, onLoginClick, onLogout }, ref) => {
    return (
      <header ref={ref} className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">H</span>
              </div>
              <h1 className="font-bold text-xl">Hotel Paradise</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost">Phòng</Button>
              <Button variant="ghost">Dịch vụ</Button>
              <Button variant="ghost">Về chúng tôi</Button>
              <Button variant="ghost">Liên hệ</Button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm phòng..."
                  className="pl-10 w-80"
                  onClick={onSearchClick}
                />
              </div>
            </div>

            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Calendar className="w-4 h-4 mr-2" />
              Đặt phòng
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onProfileClick}>
                    <User className="w-4 h-4 mr-2" />
                    Hồ sơ cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onBookingsClick}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Đặt phòng của tôi
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onFavoritesClick}>
                    <Heart className="w-4 h-4 mr-2" />
                    Yêu thích
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onNotificationsClick}>
                    <Bell className="w-4 h-4 mr-2" />
                    Thông báo
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onSettingsClick}>
                    <Settings className="w-4 h-4 mr-2" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" size="sm" onClick={onLoginClick}>
                Đăng nhập
              </Button>
            )}

            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
    );
  }
);

HotelHeader.displayName = "HotelHeader";