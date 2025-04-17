"use client"

import { useState } from "react"
import type { MonthlyReward } from "@/types/reward"

export function useRewardData() {
  // サンプルの報酬データ
  const [monthlyRewards] = useState<MonthlyReward[]>([
    {
      month: "2025-03",
      totalAmount: 7500, // 15ショップ × 500円 = 7,500円
      previousMonthAmount: 6000, // 12ショップ × 500円 = 6,000円
      changePercentage: 25, // 増加率を修正
      shopCount: 15,
      totalFees: 450000, // 総利用料はそのまま
      rewardRate: "1ショップ月500円", // 報酬レートを修正
      status: "未払い",
      paymentDate: "2025-04-15",
      shops: [
        {
          id: "SHOP-001",
          name: "田中雑貨店",
          status: "利用継続中",
          startDate: "2024-10-15",
          monthlyFee: 15000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-002",
          name: "鈴木フラワー",
          status: "利用継続中",
          startDate: "2024-11-20",
          monthlyFee: 25000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-004",
          name: "佐藤クラフト",
          status: "利用継続中",
          startDate: "2025-01-05",
          monthlyFee: 18000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-005",
          name: "伊藤ハンドメイド",
          status: "利用継続中",
          startDate: "2025-01-15",
          monthlyFee: 30000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-006",
          name: "渡辺アンティーク",
          status: "利用継続中",
          startDate: "2024-12-10",
          monthlyFee: 22000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-008",
          name: "中村工芸品",
          status: "利用継続中",
          startDate: "2024-09-25",
          monthlyFee: 28000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-009",
          name: "小林陶器店",
          status: "利用継続中",
          startDate: "2024-10-05",
          monthlyFee: 20000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-010",
          name: "加藤ジュエリー",
          status: "利用継続中",
          startDate: "2024-11-15",
          monthlyFee: 15000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-012",
          name: "山本キャンドル",
          status: "利用継続中",
          startDate: "2024-12-20",
          monthlyFee: 18000,
          rewardAmount: 500, // 500円に修正
        },
      ],
    },
    {
      month: "2025-02",
      totalAmount: 6000, // 12ショップ × 500円 = 6,000円
      previousMonthAmount: 5000, // 10ショップ × 500円 = 5,000円
      changePercentage: 20, // 増加率を修正
      shopCount: 12,
      totalFees: 400000, // 総利用料はそのまま
      rewardRate: "1ショップ月500円", // 報酬レートを修正
      status: "支払済",
      paymentDate: "2025-03-15",
      shops: [
        {
          id: "SHOP-001",
          name: "田中雑貨店",
          status: "利用継続中",
          startDate: "2024-10-15",
          monthlyFee: 15000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-002",
          name: "鈴木フラワー",
          status: "利用継続中",
          startDate: "2024-11-20",
          monthlyFee: 25000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-004",
          name: "佐藤クラフト",
          status: "利用継続中",
          startDate: "2025-01-05",
          monthlyFee: 18000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-005",
          name: "伊藤ハンドメイド",
          status: "利用継続中",
          startDate: "2025-01-15",
          monthlyFee: 30000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-006",
          name: "渡辺アンティーク",
          status: "利用継続中",
          startDate: "2024-12-10",
          monthlyFee: 22000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-008",
          name: "中村工芸品",
          status: "利用継続中",
          startDate: "2024-09-25",
          monthlyFee: 28000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-009",
          name: "小林陶器店",
          status: "利用継続中",
          startDate: "2024-10-05",
          monthlyFee: 20000,
          rewardAmount: 500, // 500円に修正
        },
      ],
    },
    {
      month: "2025-01",
      totalAmount: 5000, // 10ショップ × 500円 = 5,000円
      previousMonthAmount: 4000, // 8ショップ × 500円 = 4,000円
      changePercentage: 25, // 増加率を修正
      shopCount: 10,
      totalFees: 350000, // 総利用料はそのまま
      rewardRate: "1ショップ月500円", // 報酬レートを修正
      status: "支払済",
      paymentDate: "2025-02-15",
      shops: [
        {
          id: "SHOP-001",
          name: "田中雑貨店",
          status: "利用継続中",
          startDate: "2024-10-15",
          monthlyFee: 15000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-002",
          name: "鈴木フラワー",
          status: "利用継続中",
          startDate: "2024-11-20",
          monthlyFee: 25000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-006",
          name: "渡辺アンティーク",
          status: "利用継続中",
          startDate: "2024-12-10",
          monthlyFee: 22000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-008",
          name: "中村工芸品",
          status: "利用継続中",
          startDate: "2024-09-25",
          monthlyFee: 28000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-009",
          name: "小林陶器店",
          status: "利用継続中",
          startDate: "2024-10-05",
          monthlyFee: 20000,
          rewardAmount: 500, // 500円に修正
        },
      ],
    },
    {
      month: "2024-12",
      totalAmount: 4000, // 8ショップ × 500円 = 4,000円
      previousMonthAmount: 3000, // 6ショップ × 500円 = 3,000円
      changePercentage: 33.3, // 増加率を修正
      shopCount: 8,
      totalFees: 300000, // 総利用料はそのまま
      rewardRate: "1ショップ月500円", // 報酬レートを修正
      status: "支払済",
      paymentDate: "2025-01-15",
      shops: [
        {
          id: "SHOP-001",
          name: "田中雑貨店",
          status: "利用継続中",
          startDate: "2024-10-15",
          monthlyFee: 15000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-002",
          name: "鈴木フラワー",
          status: "利用継続中",
          startDate: "2024-11-20",
          monthlyFee: 25000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-008",
          name: "中村工芸品",
          status: "利用継続中",
          startDate: "2024-09-25",
          monthlyFee: 28000,
          rewardAmount: 500, // 500円に修正
        },
        {
          id: "SHOP-009",
          name: "小林陶器店",
          status: "利用継続中",
          startDate: "2024-10-05",
          monthlyFee: 20000,
          rewardAmount: 500, // 500円に修正
        },
      ],
    },
    {
      month: "2025-04",
      totalAmount: 0,
      previousMonthAmount: 7500, // 15ショップ × 500円 = 7,500円
      changePercentage: 0,
      shopCount: 0,
      totalFees: 0,
      rewardRate: "1ショップ月500円", // 報酬レートを修正
      status: "未確定",
      paymentDate: null,
      shops: [],
    },
  ])

  // 特定の月の報酬データを取得する関数
  const getRewardsByMonth = (month: string): MonthlyReward => {
    const reward = monthlyRewards.find((r) => r.month === month)
    if (!reward) {
      // 該当する月のデータがない場合は空のデータを返す
      return {
        month,
        totalAmount: 0,
        previousMonthAmount: 0,
        changePercentage: 0,
        shopCount: 0,
        totalFees: 0,
        rewardRate: "1ショップ月500円",
        status: "未確定",
        paymentDate: null,
        shops: [],
      }
    }
    return reward
  }

  return {
    monthlyRewards,
    getRewardsByMonth,
  }
}
