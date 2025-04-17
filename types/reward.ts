export interface RewardShop {
  id: string
  name: string
  status: string
  startDate: string
  monthlyFee: number
  rewardAmount: number
}

export interface MonthlyReward {
  month: string
  totalAmount: number
  previousMonthAmount: number
  changePercentage: number
  shopCount: number
  totalFees: number
  rewardRate: string
  status: string
  paymentDate: string | null
  shops: RewardShop[]
}
