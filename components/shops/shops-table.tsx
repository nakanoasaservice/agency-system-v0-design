"use client"

import { DataTable } from "@/components/ui/data-table"
import { ShopColumns } from "@/components/shops/shop-columns"
import type { Shop } from "@/types/shop"

interface ShopsTableProps {
  shops: Shop[]
}

export function ShopsTable({ shops }: ShopsTableProps) {
  return <DataTable columns={ShopColumns} data={shops} pageSize={5} />
}
