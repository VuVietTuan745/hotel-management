import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Percent,
  Activity
} from "lucide-react";

export const AdminReports = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [timePeriod, setTimePeriod] = useState("thisMonth");

  // Revenue data
  const revenueData = [
    { month: "T1", revenue: 125, target: 150 },
    { month: "T2", revenue: 132, target: 150 },
    { month: "T3", revenue: 145, target: 150 },
    { month: "T4", revenue: 138, target: 150 },
    { month: "T5", revenue: 152, target: 150 },
    { month: "T6", revenue: 165, target: 160 },
    { month: "T7", revenue: 178, target: 160 },
    { month: "T8", revenue: 185, target: 170 },
    { month: "T9", revenue: 172, target: 170 },
    { month: "T10", revenue: 168, target: 170 }
  ];

  // Booking trend data
  const bookingTrendData = [
    { date: "01/10", bookings: 12 },
    { date: "05/10", bookings: 15 },
    { date: "10/10", bookings: 18 },
    { date: "15/10", bookings: 22 },
    { date: "20/10", bookings: 19 },
    { date: "25/10", bookings: 25 },
    { date: "26/10", bookings: 28 }
  ];

  // Room type distribution
  const roomTypeData = [
    { name: "Standard", value: 40, color: "#3b82f6" },
    { name: "Deluxe", value: 30, color: "#8b5cf6" },
    { name: "Family", value: 20, color: "#06b6d4" },
    { name: "Suite", value: 10, color: "#f59e0b" }
  ];

  // Staff performance
  const staffPerformanceData = [
    { name: "Nguyễn Văn A", bookings: 45, revenue: 125 },
    { name: "Trần Thị B", bookings: 38, revenue: 98 },
    { name: "Lê Văn C", bookings: 32, revenue: 85 },
    { name: "Phạm Thị D", bookings: 28, revenue: 72 },
    { name: "Hoàng Văn E", bookings: 25, revenue: 65 }
  ];

  const stats = [
    {
      title: "Tổng doanh thu",
      value: "₫152M",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600 bg-green-50"
    },
    {
      title: "Đặt phòng mới",
      value: "286",
      change: "+8.2%",
      trend: "up",
      icon: Calendar,
      color: "text-blue-600 bg-blue-50"
    },
    {
      title: "Khách hàng mới",
      value: "124",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-600 bg-purple-50"
    },
    {
      title: "Tỷ lệ lấp đầy",
      value: "87%",
      change: "+5.2%",
      trend: "up",
      icon: Percent,
      color: "text-orange-600 bg-orange-50"
    }
  ];

  return (
    <div ref={ref} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Báo cáo & Thống kê</h2>
          <p className="text-muted-foreground">Phân tích dữ liệu và hiệu suất kinh doanh</p>
        </div>
        <div className="flex gap-3">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="thisWeek">Tuần này</SelectItem>
              <SelectItem value="thisMonth">Tháng này</SelectItem>
              <SelectItem value="lastMonth">Tháng trước</SelectItem>
              <SelectItem value="thisYear">Năm nay</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                    <span className={`text-sm flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="bookings">Đặt phòng</TabsTrigger>
          <TabsTrigger value="rooms">Phòng</TabsTrigger>
          <TabsTrigger value="staff">Nhân viên</TabsTrigger>
        </TabsList>

        {/* Revenue Tab */}
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Biểu đồ doanh thu</CardTitle>
              <CardDescription>So sánh doanh thu thực tế với mục tiêu (Triệu VNĐ)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Doanh thu thực tế" />
                  <Bar dataKey="target" fill="#94a3b8" name="Mục tiêu" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Thống kê doanh thu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">Doanh thu trung bình/tháng</span>
                    <span className="font-bold">₫156M</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">Tháng cao nhất</span>
                    <span className="font-bold text-green-600">₫185M (T8)</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">Tháng thấp nhất</span>
                    <span className="font-bold text-red-600">₫125M (T1)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tăng trưởng YoY</span>
                    <span className="font-bold text-green-600">+18.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nguồn doanh thu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">Đặt phòng trực tiếp</span>
                    <span className="font-bold">65%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">Website</span>
                    <span className="font-bold">25%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">OTA (Booking, Agoda)</span>
                    <span className="font-bold">8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Khác</span>
                    <span className="font-bold">2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Xu hướng đặt phòng</CardTitle>
              <CardDescription>Số lượng đặt phòng theo thời gian</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={bookingTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Đặt phòng"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tổng đặt phòng</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">286</p>
                <p className="text-sm text-green-600 mt-2">+8.2% so với tháng trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tỷ lệ hủy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">5.2%</p>
                <p className="text-sm text-green-600 mt-2">-1.3% so với tháng trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Thời gian đặt TB</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">12 ngày</p>
                <p className="text-sm text-muted-foreground mt-2">Trước khi check-in</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Rooms Tab */}
        <TabsContent value="rooms">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân bổ loại phòng</CardTitle>
                <CardDescription>Số lượng phòng theo từng loại</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={roomTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {roomTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hiệu suất phòng</CardTitle>
                <CardDescription>Tỷ lệ sử dụng theo loại phòng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Standard Room</span>
                      <span className="font-bold">92%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "92%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Deluxe Ocean View</span>
                      <span className="font-bold">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "85%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Family Room</span>
                      <span className="font-bold">78%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-cyan-500 h-2 rounded-full" style={{ width: "78%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Suite</span>
                      <span className="font-bold">65%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "65%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Staff Tab */}
        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Hiệu suất nhân viên</CardTitle>
              <CardDescription>Top 5 nhân viên theo doanh thu và số lượng đặt phòng</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={staffPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="bookings" fill="#3b82f6" name="Số đặt phòng" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#8b5cf6" name="Doanh thu (M)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Nhân viên xuất sắc</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Activity className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="font-bold">Nguyễn Văn A</p>
                    <p className="text-sm text-muted-foreground">45 đặt phòng</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Doanh thu cao nhất</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="font-bold">Nguyễn Văn A</p>
                    <p className="text-sm text-muted-foreground">₫125M</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tổng nhân viên</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-3xl font-bold">24</p>
                    <p className="text-sm text-muted-foreground">Đang hoạt động</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
});

AdminReports.displayName = "AdminReports";
