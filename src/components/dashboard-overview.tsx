import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CalendarDays, Users, Bed, DollarSign } from "lucide-react@0.487.0";

export function DashboardOverview() {
  const stats = [
    {
      title: "Tổng phòng",
      value: "120",
      description: "15 phòng trống",
      icon: Bed,
      color: "text-blue-600"
    },
    {
      title: "Khách hiện tại",
      value: "89",
      description: "+5 so với hôm qua",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Đặt phòng hôm nay",
      value: "23",
      description: "12 check-in, 11 check-out",
      icon: CalendarDays,
      color: "text-orange-600"
    },
    {
      title: "Doanh thu tháng",
      value: "₫45.2M",
      description: "+12.5% so với tháng trước",
      icon: DollarSign,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Tổng quan</h2>
        <p className="text-muted-foreground">
          Thống kê tổng quan hoạt động khách sạn
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tình trạng phòng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Đã đặt</span>
                </div>
                <span>105 phòng</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Trống</span>
                </div>
                <span>15 phòng</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Bảo trì</span>
                </div>
                <span>0 phòng</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">Nguyễn Văn A check-in</p>
                <p className="text-muted-foreground">Phòng 201 - 2 phút trước</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Trần Thị B check-out</p>
                <p className="text-muted-foreground">Phòng 305 - 15 phút trước</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Đặt phòng mới</p>
                <p className="text-muted-foreground">Phòng 402 - 30 phút trước</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}