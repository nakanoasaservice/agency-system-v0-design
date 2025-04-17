"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MonthlySummary } from "@/components/rewards/monthly-summary"
import { RewardShopsTable } from "@/components/rewards/reward-shops-table"
import { useRewardData } from "@/hooks/use-reward-data"

export default function RewardsPage() {
  const [selectedMonth, setSelectedMonth] = useState("2025-03")
  const { monthlyRewards, getRewardsByMonth } = useRewardData()

  const currentMonthData = getRewardsByMonth(selectedMonth)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6 px-4 sm:px-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">報酬管理</h1>
          </div>

          <MonthlySummary
            monthlyRewards={monthlyRewards}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />

          <Card>
            <CardHeader>
              <CardTitle>報酬対象ショップ一覧</CardTitle>
              <CardDescription>{selectedMonth.replace("-", "年")}月の報酬対象となるショップの一覧です</CardDescription>
            </CardHeader>
            <CardContent>
              <RewardShopsTable shops={currentMonthData.shops} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
