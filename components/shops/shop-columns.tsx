"use client"

import Link from "next/link"
import { ArrowUpDown } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { ShopStatusBadge } from "@/components/shops/shop-status-badge"
import type { Shop } from "@/types/shop"

export const ShopColumns: ColumnDef<Shop>[] = [
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
    cell: ({ row }) => <ShopStatusBadge status={row.original.status} />,
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
