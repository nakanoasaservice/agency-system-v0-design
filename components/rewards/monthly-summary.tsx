"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Calendar, CreditCard, Download } from "lucide-react"
import type { MonthlyReward } from "@/types/reward"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MonthlySummaryProps {
  monthlyRewards: MonthlyReward[]
  selectedMonth: string
  onMonthChange: (month: string) => void
}

export function MonthlySummary({ monthlyRewards, selectedMonth, onMonthChange }: MonthlySummaryProps) {
  const currentMonthData = monthlyRewards.find((reward) => reward.month === selectedMonth) || monthlyRewards[0]
  const formattedMonth = selectedMonth.replace("-", "年") + "月"

  const handleDownload = (documentType: string) => {
    // 実際の実装ではPDFのダウンロード処理を行います
    console.log(`Downloading ${documentType} for ${selectedMonth}`)
    // モックのダウンロード処理
    alert(`${formattedMonth}の${documentType}をダウンロードします`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Select value={selectedMonth} onValueChange={onMonthChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="月を選択" />
          </SelectTrigger>
          <SelectContent>
            {monthlyRewards.map((reward) => (
              <SelectItem key={reward.month} value={reward.month}>
                {reward.month.replace("-", "年")}月
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Badge
            variant={
              currentMonthData.status === "支払済"
                ? "default"
                : currentMonthData.status === "未払い"
                  ? "secondary"
                  : "outline"
            }
          >
            {currentMonthData.status}
          </Badge>

          {currentMonthData.status === "支払済" && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => handleDownload("振込明細書")}>
                      <Download className="h-4 w-4 mr-1" />
                      振込明細
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{formattedMonth}の振込明細書をダウンロード</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => handleDownload("報酬内訳書CSV")}>
                      <Download className="h-4 w-4 mr-1" />
                      報酬内訳CSV
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{formattedMonth}の報酬内訳CSVをダウンロード</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}

          {currentMonthData.status === "未払い" && currentMonthData.paymentDate && (
            <span className="text-sm text-muted-foreground">支払予定日: {currentMonthData.paymentDate}</span>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-sm font-medium">報酬合計</h3>
              </div>
              {currentMonthData.changePercentage > 0 && (
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>{currentMonthData.changePercentage}%</span>
                </div>
              )}
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold">¥{currentMonthData.totalAmount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">
                前月比{" "}
                {currentMonthData.previousMonthAmount > 0
                  ? `¥${currentMonthData.previousMonthAmount.toLocaleString()}`
                  : "---"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-sm font-medium">対象ショップ数</h3>
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold">{currentMonthData.shopCount}件</p>
              <p className="text-xs text-muted-foreground">合計利用料 ¥{currentMonthData.totalFees.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-sm font-medium">報酬体系</h3>
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold">{currentMonthData.rewardRate}</p>
              <p className="text-xs text-muted-foreground">固定報酬レート</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
