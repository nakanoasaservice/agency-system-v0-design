"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

type Shop = {
  id: string
  name: string
  email: string
  signupDate: string
  status: "active" | "pending" | "inactive"
  monthlyFee: number
}

export function useShopData() {
  // サンプルショップデータ
  const shops: Shop[] = [
    {
      id: "SHOP-001",
      name: "田中雑貨店",
      email: "info@tanaka-zakka.com",
      signupDate: "2025-03-15",
      status: "active",
      monthlyFee: 15000,
    },
    {
      id: "SHOP-002",
      name: "鈴木フラワー",
      email: "contact@suzuki-flower.co.jp",
      signupDate: "2025-03-12",
      status: "active",
      monthlyFee: 25000,
    },
    {
      id: "SHOP-003",
      name: "山田ベーカリー",
      email: "support@yamada-bakery.jp",
      signupDate: "2025-03-10",
      status: "pending",
      monthlyFee: 0,
    },
    {
      id: "SHOP-004",
      name: "佐藤クラフト",
      email: "hello@sato-craft.com",
      signupDate: "2025-03-05",
      status: "active",
      monthlyFee: 18000,
    },
    {
      id: "SHOP-005",
      name: "伊藤ハンドメイド",
      email: "info@ito-handmade.co.jp",
      signupDate: "2025-03-01",
      status: "active",
      monthlyFee: 30000,
    },
  ]

  // テーブル列の定義
  const columns: ColumnDef<Shop>[] = [
    {
      accessorKey: "name",
      header: "ショップ名",
      cell: ({ row }) => (
        <Link href={`/shops/${row.original.id}`} className="font-medium hover:underline">
          {row.original.name}
        </Link>
      ),
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
      accessorKey: "status",
      header: "ステータス",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "active" ? "default" : "secondary"}>
          {row.original.status === "active" ? "有効" : "保留中"}
        </Badge>
      ),
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
              月額
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
  ]

  return { shops, columns }
}
