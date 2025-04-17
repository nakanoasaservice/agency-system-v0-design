"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { RewardShop } from "@/types/reward"
import Link from "next/link"

interface RewardShopsTableProps {
  shops: RewardShop[]
}

export function RewardShopsTable({ shops }: RewardShopsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ショップ名</TableHead>
            <TableHead>ステータス</TableHead>
            <TableHead>利用開始日</TableHead>
            <TableHead className="text-right">報酬額</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shops.length > 0 ? (
            shops.map((shop) => (
              <TableRow key={shop.id}>
                <TableCell className="font-medium">
                  <Link href={`/shops/${shop.id}`} className="hover:underline">
                    {shop.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant={shop.status === "利用継続中" ? "default" : "secondary"}>{shop.status}</Badge>
                </TableCell>
                <TableCell>{shop.startDate}</TableCell>
                <TableCell className="text-right">¥{shop.rewardAmount.toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                対象ショップがありません
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
