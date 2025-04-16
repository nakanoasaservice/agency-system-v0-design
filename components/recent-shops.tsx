import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentShops() {
  // サンプルショップデータ
  const shops = [
    {
      id: "SHOP-001",
      name: "田中雑貨店",
      email: "info@tanaka-zakka.com",
      signupDate: "2025-03-15",
      status: "active",
      monthlyFee: 15000,
      invitationCode: "AGENCY123",
    },
    {
      id: "SHOP-002",
      name: "鈴木フラワー",
      email: "contact@suzuki-flower.co.jp",
      signupDate: "2025-03-12",
      status: "active",
      monthlyFee: 25000,
      invitationCode: "SPECIAL50",
    },
    {
      id: "SHOP-003",
      name: "山田ベーカリー",
      email: "support@yamada-bakery.jp",
      signupDate: "2025-03-10",
      status: "pending",
      monthlyFee: 0,
      invitationCode: "AGENCY123",
    },
    {
      id: "SHOP-004",
      name: "佐藤クラフト",
      email: "hello@sato-craft.com",
      signupDate: "2025-03-05",
      status: "active",
      monthlyFee: 18000,
      invitationCode: "WELCOME25",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>最近のショップ</CardTitle>
        <CardDescription>招待コードを通じて最近獲得したショップです。</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {shops.map((shop) => (
            <div key={shop.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{shop.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{shop.name}</p>
                <p className="text-sm text-muted-foreground">{shop.email}</p>
              </div>
              <div className="ml-auto flex flex-col items-end">
                <Badge variant={shop.status === "active" ? "default" : "secondary"}>
                  {shop.status === "active" ? "有効" : "保留中"}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {shop.status === "active" ? `¥${shop.monthlyFee.toLocaleString()}` : "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

