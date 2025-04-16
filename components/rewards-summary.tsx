import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function RewardsSummary() {
  // サンプル報酬データ
  const rewards = [
    {
      id: "REW-001",
      month: "2025年3月",
      customers: 12,
      totalFees: 180000,
      rewardRate: "10%",
      amount: 18000,
      status: "未払い",
    },
    {
      id: "REW-002",
      month: "2025年2月",
      customers: 10,
      totalFees: 150000,
      rewardRate: "10%",
      amount: 15000,
      status: "支払済",
    },
    {
      id: "REW-003",
      month: "2025年1月",
      customers: 8,
      totalFees: 120000,
      rewardRate: "10%",
      amount: 12000,
      status: "支払済",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>報酬サマリー</CardTitle>
        <CardDescription>顧客利用料から獲得した報酬の概要です。</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>月</TableHead>
              <TableHead>顧客数</TableHead>
              <TableHead>総利用料</TableHead>
              <TableHead>報酬率</TableHead>
              <TableHead>報酬額</TableHead>
              <TableHead>状態</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rewards.map((reward) => (
              <TableRow key={reward.id}>
                <TableCell>{reward.month}</TableCell>
                <TableCell>{reward.customers}名</TableCell>
                <TableCell>¥{reward.totalFees.toLocaleString()}</TableCell>
                <TableCell>{reward.rewardRate}</TableCell>
                <TableCell>¥{reward.amount.toLocaleString()}</TableCell>
                <TableCell>{reward.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

