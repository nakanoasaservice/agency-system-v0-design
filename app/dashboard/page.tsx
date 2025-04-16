"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <Link href="/" className="font-bold text-xl">
            代理店ポータル
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-primary">
              ダッシュボード
            </Link>
            <Link href="/invitations" className="text-sm font-medium">
              招待コード
            </Link>
            <Link href="/shops" className="text-sm font-medium">
              ショップ管理
            </Link>
            <Link href="/rewards" className="text-sm font-medium">
              報酬管理
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">ダッシュボード</h1>
            <Button asChild>
              <Link href="/create-invitation">
                <Plus className="mr-2 h-4 w-4" /> 招待コード作成
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">来月の予定報酬</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥450,000</div>
                <p className="text-xs text-muted-foreground">前月比 +¥50,000 (12.5%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">現在の契約数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128件</div>
                <p className="text-xs text-muted-foreground">前月比 +8件 (6.7%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">今月の新規契約</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12件</div>
                <p className="text-xs text-muted-foreground">前月比 +2件 (20%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">今月の解約数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4件</div>
                <p className="text-xs text-muted-foreground">前月比 -2件 (33.3%減)</p>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="contracts">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="contracts">契約推移</TabsTrigger>
                <TabsTrigger value="rewards">報酬推移</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="contracts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardDescription>過去6ヶ月の新規・継続を含む総契約数の推移</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ContractsChart />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="rewards" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardDescription>過去6ヶ月の報酬額の推移</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <RewardsChart />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>最近契約されたショップ</CardTitle>
                <CardDescription>過去30日間に契約されたショップ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">ラーメン店 一番</p>
                    </div>
                    <div className="text-sm text-muted-foreground">契約日: 2023/03/15</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">ネイルサロン ビューティ</p>
                    </div>
                    <div className="text-sm text-muted-foreground">契約日: 2023/03/12</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">アパレルショップ モード</p>
                    </div>
                    <div className="text-sm text-muted-foreground">契約日: 2023/03/08</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">ペットショップ わんにゃん</p>
                    </div>
                    <div className="text-sm text-muted-foreground">契約日: 2023/03/05</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">八百屋 みどり</p>
                    </div>
                    <div className="text-sm text-muted-foreground">契約日: 2023/02/28</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">居酒屋 さくら</p>
                    </div>
                    <div className="text-sm text-muted-foreground">契約日: 2023/02/20</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>最近解約されたショップ</CardTitle>
                <CardDescription>過去30日間に解約されたショップ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">カフェ スマイル</p>
                      <p className="text-xs text-muted-foreground">解約日: 2023/03/10</p>
                    </div>
                    <div className="text-sm text-muted-foreground">契約期間: 8ヶ月</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">美容室 ハナ</p>
                      <p className="text-xs text-muted-foreground">解約日: 2023/03/05</p>
                    </div>
                    <div className="text-sm text-muted-foreground">契約期間: 12ヶ月</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">パン工房 ココロ</p>
                      <p className="text-xs text-muted-foreground">解約日: 2023/02/28</p>
                    </div>
                    <div className="text-sm text-muted-foreground">契約期間: 6ヶ月</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">雑貨店 ソラ</p>
                      <p className="text-xs text-muted-foreground">解約日: 2023/02/25</p>
                    </div>
                    <div className="text-sm text-muted-foreground">契約期間: 4ヶ月</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function ContractsChart() {
  const contractsData = [
    { month: "10月", value: 90 },
    { month: "11月", value: 98 },
    { month: "12月", value: 103 },
    { month: "1月", value: 110 },
    { month: "2月", value: 120 },
    { month: "3月", value: 128 },
  ]

  const chartConfig = {
    contracts: {
      label: "契約数",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <RechartsBarChart data={contractsData} margin={{ top: 30, right: 30, left: 30, bottom: 10 }} barSize={40}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `${value}件`} width={50} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
          {contractsData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill="#3b82f6" /> // Using blue-500 to match original
          ))}
          <LabelList dataKey="value" position="top" formatter={(value) => `${value}件`} style={{ fontSize: "12px" }} />
        </Bar>
      </RechartsBarChart>
    </ChartContainer>
  )
}

function RewardsChart() {
  const rewardsData = [
    { month: "10月", value: 30 },
    { month: "11月", value: 35 },
    { month: "12月", value: 38 },
    { month: "1月", value: 40 },
    { month: "2月", value: 42 },
    { month: "3月", value: 45 },
  ]

  const chartConfig = {
    rewards: {
      label: "報酬額",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <RechartsBarChart data={rewardsData} margin={{ top: 30, right: 30, left: 30, bottom: 10 }} barSize={32}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `${value}万円`} width={60} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={32}>
          {rewardsData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill="#3b82f6" /> // Using blue-500 to match original
          ))}
          <LabelList
            dataKey="value"
            position="top"
            formatter={(value) => `${value}万円`}
            style={{ fontSize: "12px" }}
          />
        </Bar>
      </RechartsBarChart>
    </ChartContainer>
  )
}

