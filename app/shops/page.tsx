"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowUpDown } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Header } from "@/components/header"

type Shop = {
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

export default function ShopsPage() {
  // 状態管理
  const [searchQuery, setSearchQuery] = useState("")
  const [invitationFilter, setInvitationFilter] = useState("all")

  // サンプル招待コードリスト
  const invitationCodes = [
    { code: "AGENCY123", description: "主要ショップ向け" },
    { code: "SPECIAL50", description: "特別キャンペーン" },
    { code: "PROMO2025", description: "2025年プロモーション" },
    { code: "WELCOME25", description: "新規ショップ向け" },
  ]

  // サンプルショップデータ
  const allShops: Shop[] = [
    {
      id: "SHOP-001",
      shopId: "SH38A92J7F05K61L4M9P2",
      externalId: "SP-2023-001",
      name: "田中雑貨店",
      email: "info@tanaka-zakka.com",
      signupDate: "2025-03-15",
      status: "利用継続中",
      monthlyFee: 15000,
      totalReward: 45000,
      invitationCode: "AGENCY123",
    },
    {
      id: "SHOP-002",
      shopId: "SH75B31E9G28H43I6J0K5",
      externalId: "FL-2023-045",
      name: "鈴木フラワー",
      email: "contact@suzuki-flower.co.jp",
      signupDate: "2025-03-12",
      status: "利用継続中",
      monthlyFee: 25000,
      totalReward: 75000,
      invitationCode: "SPECIAL50",
    },
    {
      id: "SHOP-003",
      shopId: "SH19C64D2E83F07G5H2I7",
      externalId: null,
      name: "山田ベーカリー",
      email: "support@yamada-bakery.jp",
      signupDate: "2025-03-10",
      status: "トライアル中",
      monthlyFee: 0,
      totalReward: 0,
      invitationCode: "AGENCY123",
    },
    {
      id: "SHOP-004",
      shopId: "SH46D05E1F92G38H7I4J3",
      externalId: "CR-2023-102",
      name: "佐藤クラフト",
      email: "hello@sato-craft.com",
      signupDate: "2025-03-05",
      status: "利用継続中",
      monthlyFee: 18000,
      totalReward: 54000,
      invitationCode: "WELCOME25",
    },
    {
      id: "SHOP-005",
      shopId: "SH82E37F4G01H59I2J6K8",
      externalId: "HM-2023-078",
      name: "伊藤ハンドメイド",
      email: "info@ito-handmade.co.jp",
      signupDate: "2025-03-01",
      status: "利用継続中",
      monthlyFee: 30000,
      totalReward: 90000,
      invitationCode: "AGENCY123",
    },
    {
      id: "SHOP-006",
      shopId: "SH27F91G5H36I80J4K2L9",
      externalId: "AN-2023-054",
      name: "渡辺アンティーク",
      email: "contact@watanabe-antique.jp",
      signupDate: "2025-02-28",
      status: "利用継続中",
      monthlyFee: 22000,
      totalReward: 66000,
      invitationCode: "SPECIAL50",
    },
    {
      id: "SHOP-007",
      shopId: "SH63G28H7I94J02K5L1M6",
      externalId: "GA-2023-039",
      name: "高橋ギャラリー",
      email: "gallery@takahashi.com",
      signupDate: "2025-02-25",
      status: "解約済",
      monthlyFee: 0,
      totalReward: 30000,
      invitationCode: "PROMO2025",
    },
    {
      id: "SHOP-008",
      shopId: "SH09H74I2J51K87L3M0N4",
      externalId: "CR-2023-087",
      name: "中村工芸品",
      email: "info@nakamura-craft.co.jp",
      signupDate: "2025-02-20",
      status: "利用継続中",
      monthlyFee: 28000,
      totalReward: 84000,
      invitationCode: "WELCOME25",
    },
    {
      id: "SHOP-009",
      shopId: "SH54I19J6K32L78M4N0P5",
      externalId: "PO-2023-029",
      name: "小林陶器店",
      email: "info@kobayashi-pottery.jp",
      signupDate: "2025-02-15",
      status: "利用継続中",
      monthlyFee: 20000,
      totalReward: 60000,
      invitationCode: "AGENCY123",
    },
    {
      id: "SHOP-010",
      shopId: "SH90J65K3L21M47N8P5Q2",
      externalId: "JW-2023-063",
      name: "加藤ジュエリー",
      email: "sales@kato-jewelry.co.jp",
      signupDate: "2025-02-10",
      status: "利用継続中",
      monthlyFee: 15000,
      totalReward: 45000,
      invitationCode: "SPECIAL50",
    },
    {
      id: "SHOP-011",
      shopId: "SH36K01L8M73N95P2Q4R7",
      externalId: "FA-2023-042",
      name: "吉田ファブリック",
      email: "info@yoshida-fabric.com",
      signupDate: "2025-02-05",
      status: "利用停止",
      monthlyFee: 0,
      totalReward: 30000,
      invitationCode: "PROMO2025",
    },
    {
      id: "SHOP-012",
      shopId: "SH72L47M9N05P61Q3R8S2",
      externalId: "CA-2023-093",
      name: "山本キャンドル",
      email: "contact@yamamoto-candle.jp",
      signupDate: "2025-02-01",
      status: "利用継続中",
      monthlyFee: 18000,
      totalReward: 54000,
      invitationCode: "WELCOME25",
    },
  ]

  // 検索フィルタリング
  const filteredShops = allShops.filter(
    (shop) =>
      (invitationFilter === "all" || shop.invitationCode === invitationFilter) &&
      (shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // テーブル列の定義
  const columns: ColumnDef<Shop>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <button className="flex items-center" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            ショップ名
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </button>
        )
      },
      cell: ({ row }) => (
        <Link href={`/shops/${row.original.id}`} className="font-medium hover:underline">
          {row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: "status",
      header: "ステータス",
      cell: ({ row }) => {
        const status = row.original.status
        let variant: "default" | "secondary" | "destructive" | "outline" = "default"

        switch (status) {
          case "トライアル中":
            variant = "secondary"
            break
          case "利用継続中":
            variant = "default"
            break
          case "利用停止":
            variant = "destructive"
            break
          case "解約済":
            variant = "outline"
            break
        }

        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      accessorKey: "shopId",
      header: "ショップID",
      cell: ({ row }) => <span className="font-mono text-xs">{row.original.shopId}</span>,
    },
    {
      accessorKey: "invitationCode",
      header: "招待コード",
      cell: ({ row }) => (
        <Link href={`/invitations/${row.original.invitationCode}`} className="hover:underline">
          {row.original.invitationCode}
        </Link>
      ),
    },
    {
      accessorKey: "externalId",
      header: "外部ID",
      cell: ({ row }) => {
        const externalId = row.original.externalId
        return externalId ? <span>{externalId}</span> : <span className="text-muted-foreground">-</span>
      },
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6 px-4 sm:px-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">ショップ管理</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>ショップ一覧</CardTitle>
              <CardDescription>招待コードから獲得したショップの一覧です。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="ショップ名またはメールで検索..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={invitationFilter} onValueChange={setInvitationFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="招待コードでフィルタ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべての招待コード</SelectItem>
                    {invitationCodes.map((invitation) => (
                      <SelectItem key={invitation.code} value={invitation.code}>
                        {invitation.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <DataTable columns={columns} data={filteredShops} pageSize={5} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
