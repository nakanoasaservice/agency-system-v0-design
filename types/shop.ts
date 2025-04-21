export interface Shop {
  id: string
  shopId: string
  externalId: string | null
  name: string
  email: string
  signupDate: string
  status: "トライアル中" | "利用継続中" | "利用停止" | "解約済"
  monthlyFee: number
  totalReward: number
  invitationCode: string
}

export interface InvitationCode {
  code: string
  description: string
}
