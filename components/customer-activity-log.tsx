import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CustomerActivityLogProps {
  customerId: string
}

export function CustomerActivityLog({ customerId }: CustomerActivityLogProps) {
  // サンプルアクティビティデータ
  const activities = [
    {
      id: "ACT-001",
      date: "2025-03-15 10:30",
      type: "signup",
      description: "アカウント登録完了",
      details: "招待コード AGENCY123 を使用",
    },
    {
      id: "ACT-002",
      date: "2025-03-15 11:15",
      type: "payment",
      description: "初回支払い処理",
      details: "¥15,000 (クレジットカード)",
    },
    {
      id: "ACT-003",
      date: "2025-03-20 14:45",
      type: "upgrade",
      description: "プラン変更",
      details: "スタンダードプランからプロフェッショナルプランへアップグレード",
    },
    {
      id: "ACT-004",
      date: "2025-04-15 09:00",
      type: "payment",
      description: "定期支払い処理",
      details: "¥15,000 (クレジットカード)",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>アクティビティログ</CardTitle>
        <CardDescription>顧客のアクティビティ履歴</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary">
                  <Badge
                    variant={
                      activity.type === "signup" ? "default" : activity.type === "payment" ? "secondary" : "outline"
                    }
                  >
                    {activity.type === "signup" ? "登録" : activity.type === "payment" ? "支払" : "変更"}
                  </Badge>
                </div>
                <div className="h-full w-px bg-border" />
              </div>
              <div className="space-y-1.5">
                <p className="text-sm text-muted-foreground">{activity.date}</p>
                <p className="font-medium leading-none">{activity.description}</p>
                <p className="text-sm text-muted-foreground">{activity.details}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
