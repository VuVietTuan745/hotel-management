import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Search, Filter, X } from "lucide-react@0.487.0";

interface FilterState {
  search: string;
  priceRange: [number, number];
  roomType: string;
  amenities: string[];
  rating: string;
  sortBy: string;
}

interface RoomFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export const RoomFilters = React.forwardRef<HTMLDivElement, RoomFiltersProps>(
  ({ filters, onFiltersChange, onClearFilters }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const updateFilter = (key: keyof FilterState, value: any) => {
      onFiltersChange({
        ...filters,
        [key]: value
      });
    };

    const toggleAmenity = (amenity: string) => {
      const newAmenities = filters.amenities.includes(amenity)
        ? filters.amenities.filter(a => a !== amenity)
        : [...filters.amenities, amenity];
      updateFilter('amenities', newAmenities);
    };

    const amenityOptions = [
      { id: 'wifi', label: 'WiFi miễn phí' },
      { id: 'parking', label: 'Chỗ đậu xe' },
      { id: 'restaurant', label: 'Nhà hàng' },
      { id: 'tv', label: 'TV màn hình phẳng' },
      { id: 'bathroom', label: 'Phòng tắm riêng' },
      { id: 'ac', label: 'Điều hòa không khí' },
    ];

    const activeFiltersCount = [
      filters.search && 1,
      filters.roomType !== 'all' && 1,
      filters.rating !== 'all' && 1,
      filters.amenities.length,
      (filters.priceRange[0] > 0 || filters.priceRange[1] < 3000000) && 1
    ].filter(Boolean).length;

    return (
      <Card ref={ref} className="sticky top-20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Bộ lọc
              {activeFiltersCount > 0 && (
                <Badge variant="secondary">{activeFiltersCount}</Badge>
              )}
            </CardTitle>
            <div className="flex gap-2">
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={onClearFilters}>
                  <X className="w-4 h-4" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Thu gọn' : 'Mở rộng'}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className={`space-y-6 ${!isExpanded ? 'hidden lg:block' : ''}`}>
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tìm kiếm</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tên phòng, loại phòng..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Khoảng giá (VNĐ/đêm)</label>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilter('priceRange', value)}
                max={3000000}
                min={0}
                step={50000}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₫{filters.priceRange[0].toLocaleString()}</span>
              <span>₫{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Room Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Loại phòng</label>
            <Select value={filters.roomType} onValueChange={(value) => updateFilter('roomType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại phòng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
                <SelectItem value="presidential">Presidential</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Đánh giá</label>
            <Select value={filters.rating} onValueChange={(value) => updateFilter('rating', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn đánh giá" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="4.5">4.5+ sao</SelectItem>
                <SelectItem value="4.0">4.0+ sao</SelectItem>
                <SelectItem value="3.5">3.5+ sao</SelectItem>
                <SelectItem value="3.0">3.0+ sao</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tiện ích</label>
            <div className="space-y-2">
              {amenityOptions.map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={filters.amenities.includes(amenity.id)}
                    onCheckedChange={() => toggleAmenity(amenity.id)}
                  />
                  <label htmlFor={amenity.id} className="text-sm cursor-pointer">
                    {amenity.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sắp xếp theo</label>
            <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
                <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                <SelectItem value="popular">Phổ biến nhất</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    );
  }
);

RoomFilters.displayName = "RoomFilters";