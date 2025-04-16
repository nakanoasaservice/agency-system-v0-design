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

type Shop = {
  id: string
  name: string
  email: string
  signupDate: string
  status: "active" | "pending" | "inactive"
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
      name: "田中雑貨店",
      email: "info@tanaka-zakka.com",
      signupDate: "2025-03-15",
      status: "active",
      monthlyFee: 15000,
      totalReward: 45000,
      invitationCode: "AGENCY123",
    },
    {
      id: "SHOP-002",
      name: "鈴木フラワー",
      email: "contact@suzuki-flower.co.jp",
      signupDate: "2025-03-12",
      status: "active",
      monthlyFee: 25000,
      totalReward: 75000,
      invitationCode: "SPECIAL50",
    },
    {
      id: "SHOP-003",
      name: "山田ベーカリー",
      email: "support@yamada-bakery.jp",
      signupDate: "2025-03-10",
      status: "pending",
      monthlyFee: 0,
      totalReward: 0,
      invitationCode: "AGENCY123",
    },
    {
      id: "SHOP-004",
      name: "佐藤クラフト",
      email: "hello@sato-craft.com",
      signupDate: "2025-03-05",
      status: "active",
      monthlyFee: 18000,
      totalReward: 54000,
      invitationCode: "WELCOME25",
    },
    {
      id: "SHOP-005",
      name: "伊藤ハンドメイド",
      email: "info@ito-handmade.co.jp",
      signupDate: "2025-03-01",
      status: "active",
      monthlyFee: 30000,
      totalReward: 90000,
      invitationCode: "AGENCY123",
    },
    {
      id: "SHOP-006",
      name: "渡辺アンティーク",
      email: "contact@watanabe-antique.jp",
      signupDate: "2025-02-28",
      status: "active",
      monthlyFee: 22000,
      totalReward: 66000,
      invitationCode: "SPECIAL50",
    },
    {
      id: "SHOP-007",
      name: "高橋ギャラリー",
      email: "gallery@takahashi.com",
      signupDate: "2025-02-25",
      status: "inactive",
      monthlyFee: 0,
      totalReward: 30000,
      invitationCode: "PROMO2025",
    },
    {
      id: "SHOP-008",
      name: "中村工芸品",
      email: "info@nakamura-craft.co.jp",
      signupDate: "2025-02-20",
      status: "active",
      monthlyFee: 28000,
      totalReward: 84000,
      invitationCode: "WELCOME25",
    },
    {
      id: "SHOP-009",
      name: "小林陶器店",
      email: "info@kobayashi-pottery.jp",
      signupDate: "2025-02-15",
      status: "active",
      monthlyFee: 20000,
      totalReward: 60000,
      invitationCode: "AGENCY123",
    },
    {
      id: "SHOP-010",
      name: "加藤ジュエリー",
      email: "sales@kato-jewelry.co.jp",
      signupDate: "2025-02-10",
      status: "active",
      monthlyFee: 15000,
      totalReward: 45000,
      invitationCode: "SPECIAL50",
    },
    {
      id: "SHOP-011",
      name: "吉田ファブリック",
      email: "info@yoshida-fabric.com",
      signupDate: "2025-02-05",
      status: "inactive",
      monthlyFee: 0,
      totalReward: 30000,
      invitationCode: "PROMO2025",
    },
    {
      id: "SHOP-012",
      name: "山本キャンドル",
      email: "contact@yamamoto-candle.jp",
      signupDate: "2025-02-01",
      status: "active",
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
      accessorKey: "email",
      header: "メールアドレス",
    },
    {
      accessorKey: "signupDate",
      header: ({ column }) => {
        return (
          <button className="flex items-center" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            登録日
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </button>
        )
      },
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
      accessorKey: "status",
      header: "ステータス",
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <Badge variant={status === "active" ? "default" : "secondary"}>
            {status === "active" ? "有効" : status === "pending" ? "保留中" : "無効"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "monthlyFee",
      header: ({ column }) => {
        return (
          <div className="text-right">
            <button
              className="flex items-center justify-end"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              月額利用料
              <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        )
      },
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <div className="text-right">{status === "active" ? `¥${row.original.monthlyFee.toLocaleString()}` : "—"}</div>
        )
      },
    },
    {
      accessorKey: "totalReward",
      header: ({ column }) => {
        return (
          <div className="text-right">
            <button
              className="flex items-center justify-end"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              累計報酬
              <ArrowUpDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        )
      },
      cell: ({ row }) => <div className="text-right">¥{row.original.totalReward.toLocaleString()}</div>,
    },
  ]

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
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">ショップ管理</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>ショップ検索とフィルタリング</CardTitle>
              <CardDescription>名前やメールアドレスで検索、または招待コードでフィルタリングできます。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ショップ一覧</CardTitle>
              <CardDescription>招待コードから獲得したショップの一覧です。</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={filteredShops} pageSize={5} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

