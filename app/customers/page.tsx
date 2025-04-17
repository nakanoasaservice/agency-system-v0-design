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

type Customer = {
  id: string
  name: string
  email: string
  signupDate: string
  status: "active" | "pending" | "inactive"
  monthlyFee: number
  totalReward: number
  invitationCode: string
}

export default function CustomersPage() {
  // 状態管理
  const [searchQuery, setSearchQuery] = useState("")
  const [invitationFilter, setInvitationFilter] = useState("all")

  // サンプル招待コードリスト
  const invitationCodes = [
    { code: "AGENCY123", description: "主要顧客向け" },
    { code: "SPECIAL50", description: "特別キャンペーン" },
    { code: "PROMO2025", description: "2025年プロモーション" },
    { code: "WELCOME25", description: "新規顧客向け" },
  ]

  // サンプル顧客データ
  const allCustomers: Customer[] = [
    {
      id: "CUST-001",
      name: "田中株式会社",
      email: "info@tanaka-corp.com",
      signupDate: "2025-03-15",
      status: "active",
      monthlyFee: 15000,
      totalReward: 45000,
      invitationCode: "AGENCY123",
    },
    {
      id: "CUST-002",
      name: "鈴木工業",
      email: "contact@suzuki-ind.co.jp",
      signupDate: "2025-03-12",
      status: "active",
      monthlyFee: 25000,
      totalReward: 75000,
      invitationCode: "SPECIAL50",
    },
    {
      id: "CUST-003",
      name: "山田テック",
      email: "support@yamada-tech.jp",
      signupDate: "2025-03-10",
      status: "pending",
      monthlyFee: 0,
      totalReward: 0,
      invitationCode: "AGENCY123",
    },
    {
      id: "CUST-004",
      name: "佐藤ソリューションズ",
      email: "hello@sato-solutions.com",
      signupDate: "2025-03-05",
      status: "active",
      monthlyFee: 18000,
      totalReward: 54000,
      invitationCode: "WELCOME25",
    },
    {
      id: "CUST-005",
      name: "伊藤商事",
      email: "info@ito-trading.co.jp",
      signupDate: "2025-03-01",
      status: "active",
      monthlyFee: 30000,
      totalReward: 90000,
      invitationCode: "AGENCY123",
    },
    {
      id: "CUST-006",
      name: "渡辺コンサルティング",
      email: "contact@watanabe-consulting.jp",
      signupDate: "2025-02-28",
      status: "active",
      monthlyFee: 22000,
      totalReward: 66000,
      invitationCode: "SPECIAL50",
    },
    {
      id: "CUST-007",
      name: "高橋デザイン",
      email: "design@takahashi.com",
      signupDate: "2025-02-25",
      status: "inactive",
      monthlyFee: 0,
      totalReward: 30000,
      invitationCode: "PROMO2025",
    },
    {
      id: "CUST-008",
      name: "中村エンジニアリング",
      email: "info@nakamura-eng.co.jp",
      signupDate: "2025-02-20",
      status: "active",
      monthlyFee: 28000,
      totalReward: 84000,
      invitationCode: "WELCOME25",
    },
    {
      id: "CUST-009",
      name: "小林システムズ",
      email: "info@kobayashi-systems.jp",
      signupDate: "2025-02-15",
      status: "active",
      monthlyFee: 20000,
      totalReward: 60000,
      invitationCode: "AGENCY123",
    },
    {
      id: "CUST-010",
      name: "加藤電機",
      email: "sales@kato-denki.co.jp",
      signupDate: "2025-02-10",
      status: "active",
      monthlyFee: 15000,
      totalReward: 45000,
      invitationCode: "SPECIAL50",
    },
    {
      id: "CUST-011",
      name: "吉田物産",
      email: "info@yoshida-bussan.com",
      signupDate: "2025-02-05",
      status: "inactive",
      monthlyFee: 0,
      totalReward: 30000,
      invitationCode: "PROMO2025",
    },
    {
      id: "CUST-012",
      name: "山本商会",
      email: "contact@yamamoto-shokai.jp",
      signupDate: "2025-02-01",
      status: "active",
      monthlyFee: 18000,
      totalReward: 54000,
      invitationCode: "WELCOME25",
    },
  ]

  // 検索フィルタリング
  const filteredCustomers = allCustomers.filter(
    (customer) =>
      (invitationFilter === "all" || customer.invitationCode === invitationFilter) &&
      (customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // テーブル列の定義
  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <button className="flex items-center" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            顧客名
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </button>
        )
      },
      cell: ({ row }) => (
        <Link href={`/customers/${row.original.id}`} className="font-medium hover:underline">
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
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">顧客管理</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>顧客検索とフィルタリング</CardTitle>
              <CardDescription>名前やメールアドレスで検索、または招待コードでフィルタリ���グできます。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="顧客名またはメールで検索..."
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
              <CardTitle>顧客一覧</CardTitle>
              <CardDescription>招待コードから獲得した顧客の一覧です。</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={filteredCustomers} pageSize={5} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
