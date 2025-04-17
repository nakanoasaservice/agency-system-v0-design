"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
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

  // 未確定状態かどうかを判定
  const isUndetermined = currentMonthData.status === "未確定"
  const isPaid = currentMonthData.status === "支払済"
  const isUnpaid = currentMonthData.status === "未払い"

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        {/* 月選択とステータス表示を同じ行に配置 */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
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
            {/* 支払済の場合のみバッジを表示 */}
            {isPaid && <Badge variant="default">支払済</Badge>}

            {/* 未確定の場合のみバッジを表示 */}
            {isUndetermined && <Badge variant="outline">未確定</Badge>}

            {/* 未払いの場合は支払予定日のみ表示 */}
            {isUnpaid && currentMonthData.paymentDate && (
              <span className="text-sm text-muted-foreground">支払予定日: {currentMonthData.paymentDate}</span>
            )}
          </div>
        </div>

        {/* ダウンロードボタンを別の行に配置 */}
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload("振込明細書")}
                  disabled={isUndetermined} // 未確定の場合のみ無効化
                >
                  <Download className="h-4 w-4 mr-1" />
                  振込明細
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isUndetermined
                  ? `${formattedMonth}の報酬はまだ確定していません`
                  : `${formattedMonth}の振込明細書をダウンロード`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload("報酬内訳書CSV")}
                  disabled={isUndetermined} // 未確定の場合のみ無効化
                >
                  <Download className="h-4 w-4 mr-1" />
                  報酬内訳CSV
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isUndetermined
                  ? `${formattedMonth}の報酬はまだ確定していません`
                  : `${formattedMonth}の報酬内訳CSVをダウンロード`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="overflow-hidden">
          <CardContent className="p-3">
            <div className="flex flex-col">
              <h3 className="text-xs font-medium text-muted-foreground">報酬合計</h3>
              <p className="text-2xl font-bold mt-1">¥{currentMonthData.totalAmount.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-3">
            <div className="flex flex-col">
              <h3 className="text-xs font-medium text-muted-foreground">対象ショップ数</h3>
              <p className="text-2xl font-bold mt-1">{currentMonthData.shopCount}件</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
