import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, Building, Calendar, Tag, CreditCard, BarChart3 } from "lucide-react"
import { CustomerActivityLog } from "@/components/customer-activity-log"

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  // 実際の実����ではデータベースから顧客情報を取得します
  const customerId = params.id

  // サンプル顧客データ
  const customer = {
    id: customerId,
    name: "田中株式会社",
    email: "info@tanaka-corp.com",
    phone: "03-1234-5678",
    address: "東京都千代田区丸の内1-1-1",
    signupDate: "2025-03-15",
    status: "active",
    monthlyFee: 15000,
    totalReward: 45000,
    invitationCode: "AGENCY123",
    contactPerson: "田中 太郎",
    industry: "IT・通信",
    notes: "大手企業のIT部門。クラウドサービスの導入を検討中。",
    paymentMethod: "クレジットカード",
    billingCycle: "月次",
    nextBillingDate: "2025-04-15",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <Link href="/" className="font-bold text-xl">
            代理店ポータル
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/dashboard" className="text-sm font-medium">
              ダッシュボード
            </Link>
            <Link href="/invitations" className="text-sm font-medium">
              招待コード
            </Link>
            <Link href="/customers" className="text-sm font-medium text-primary">
              顧客管理
            </Link>
            <Link href="/rewards" className="text-sm font-medium">
              報酬管理
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-6 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link href="/customers">
                <ArrowLeft className="h-4 w-4 mr-2" />
                顧客一覧に戻る
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">{customer.name}</h1>
            <Badge variant={customer.status === "active" ? "default" : "secondary"} className="ml-4">
              {customer.status === "active" ? "有効" : customer.status === "pending" ? "保留中" : "無効"}
            </Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>顧客情報</CardTitle>
                <CardDescription>基本的な顧客情報と連絡先</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-[20px_1fr] items-start gap-x-2">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">メールアドレス</p>
                    <p>{customer.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-[20px_1fr] items-start gap-x-2">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">電話番号</p>
                    <p>{customer.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-[20px_1fr] items-start gap-x-2">
                  <Building className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">住所</p>
                    <p>{customer.address}</p>
                  </div>
                </div>

                <div className="grid grid-cols-[20px_1fr] items-start gap-x-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">登録日</p>
                    <p>{customer.signupDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-[20px_1fr] items-start gap-x-2">
                  <Tag className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">招待コード</p>
                    <Link href={`/invitations/${customer.invitationCode}`} className="hover:underline">
                      {customer.invitationCode}
                    </Link>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  顧客情報を編集
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>利用情報</CardTitle>
                  <CardDescription>利用料と報酬の情報</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-[20px_1fr] items-start gap-x-2">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">月額利用料</p>
                      <p className="text-xl font-bold">¥{customer.monthlyFee.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[20px_1fr] items-start gap-x-2">
                    <BarChart3 className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">累計報酬</p>
                      <p className="text-xl font-bold">¥{customer.totalReward.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium text-gray-500 mb-1">支払い方法</p>
                    <p>{customer.paymentMethod}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">請求サイクル</p>
                    <p>{customer.billingCycle}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">次回請求日</p>
                    <p>{customer.nextBillingDate}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>追加情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">担当者</p>
                    <p>{customer.contactPerson}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">業種</p>
                    <p>{customer.industry}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">メモ</p>
                    <p className="text-sm">{customer.notes}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6">
            <CustomerActivityLog customerId={customerId} />
          </div>
        </div>
      </main>
    </div>
  )
}
