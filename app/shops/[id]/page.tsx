import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, Building, Calendar, Tag, CreditCard, BarChart3 } from "lucide-react"
import { ShopActivityLog } from "@/components/shop-activity-log"

export default function ShopDetailPage({ params }: { params: { id: string } }) {
  // 実際の実装ではデータベースからショップ情報を取得します
  const shopId = params.id

  // サンプルショップデータ
  const shop = {
    id: shopId,
    name: "田中雑貨店",
    email: "info@tanaka-zakka.com",
    phone: "03-1234-5678",
    address: "東京都千代田区丸の内1-1-1",
    signupDate: "2025-03-15",
    status: "active",
    monthlyFee: 15000,
    totalReward: 45000,
    invitationCode: "AGENCY123",
    contactPerson: "田中 太郎",
    industry: "雑貨・インテリア",
    notes: "手作りの雑貨を中心に販売。ECサイトの運用経験あり。",
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
            <Link href="/shops" className="text-sm font-medium text-primary">
              ショップ管理
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
              <Link href="/shops">
                <ArrowLeft className="h-4 w-4 mr-2" />
                ショップ一覧に戻る
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">{shop.name}</h1>
            <Badge variant={shop.status === "active" ? "default" : "secondary"} className="ml-4">
              {shop.status === "active" ? "有効" : shop.status === "pending" ? "保留中" : "無効"}
            </Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>ショップ情報</CardTitle>
                <CardDescription>基本的なショップ情報と連絡先</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-[20px_1fr] items-start gap-x-2">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">メールアドレス</p>
                    <p>{shop.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-[20px_1fr] items-start gap-x-2">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">電話番号</p>
                    <p>{shop.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-[20px_1fr] items-start gap-x-2">
                  <Building className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">住所</p>
                    <p>{shop.address}</p>
                  </div>
                </div>

                <div className="grid grid-cols-[20px_1fr] items-start gap-x-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">登録日</p>
                    <p>{shop.signupDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-[20px_1fr] items-start gap-x-2">
                  <Tag className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">招待コード</p>
                    <Link href={`/invitations/${shop.invitationCode}`} className="hover:underline">
                      {shop.invitationCode}
                    </Link>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  ショップ情報を編集
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
                      <p className="text-xl font-bold">¥{shop.monthlyFee.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[20px_1fr] items-start gap-x-2">
                    <BarChart3 className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">累計報酬</p>
                      <p className="text-xl font-bold">¥{shop.totalReward.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium text-gray-500 mb-1">支払い方法</p>
                    <p>{shop.paymentMethod}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">請求サイクル</p>
                    <p>{shop.billingCycle}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">次回請求日</p>
                    <p>{shop.nextBillingDate}</p>
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
                    <p>{shop.contactPerson}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">業種</p>
                    <p>{shop.industry}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">メモ</p>
                    <p className="text-sm">{shop.notes}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6">
            <ShopActivityLog shopId={shopId} />
          </div>
        </div>
      </main>
    </div>
  )
}
