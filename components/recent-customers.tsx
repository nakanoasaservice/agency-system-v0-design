import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentCustomers() {
  // サンプル顧客データ
  const customers = [
    {
      id: "CUST-001",
      name: "田中株式会社",
      email: "info@tanaka-corp.com",
      signupDate: "2025-03-15",
      status: "active",
      monthlyFee: 15000,
      invitationCode: "AGENCY123",
    },
    {
      id: "CUST-002",
      name: "鈴木工業",
      email: "contact@suzuki-ind.co.jp",
      signupDate: "2025-03-12",
      status: "active",
      monthlyFee: 25000,
      invitationCode: "SPECIAL50",
    },
    {
      id: "CUST-003",
      name: "山田テック",
      email: "support@yamada-tech.jp",
      signupDate: "2025-03-10",
      status: "pending",
      monthlyFee: 0,
      invitationCode: "AGENCY123",
    },
    {
      id: "CUST-004",
      name: "佐藤ソリューションズ",
      email: "hello@sato-solutions.com",
      signupDate: "2025-03-05",
      status: "active",
      monthlyFee: 18000,
      invitationCode: "WELCOME25",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>最近の顧客</CardTitle>
        <CardDescription>招待コードを通じて最近獲得した顧客です。</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {customers.map((customer) => (
            <div key={customer.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{customer.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{customer.name}</p>
                <p className="text-sm text-muted-foreground">{customer.email}</p>
              </div>
              <div className="ml-auto flex flex-col items-end">
                <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                  {customer.status === "active" ? "有効" : "保留中"}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {customer.status === "active" ? `¥${customer.monthlyFee.toLocaleString()}` : "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

