"use client"

import { useState } from "react"
import { ShopsFilterBar } from "@/components/shops/shops-filter-bar"
import { ShopsTable } from "@/components/shops/shops-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Shop, InvitationCode } from "@/types/shop"

interface ShopsPageContentProps {
  initialShops: Shop[]
  invitationCodes: InvitationCode[]
}

export function ShopsPageContent({ initialShops, invitationCodes }: ShopsPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [invitationFilter, setInvitationFilter] = useState("all")

  // 検索フィルタリング
  const filteredShops = initialShops.filter(
    (shop) =>
      (invitationFilter === "all" || shop.invitationCode === invitationFilter) &&
      (shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>ショップ一覧</CardTitle>
        <CardDescription>招待コードから獲得したショップの一覧です。</CardDescription>
      </CardHeader>
      <CardContent>
        <ShopsFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          invitationFilter={invitationFilter}
          onInvitationFilterChange={setInvitationFilter}
          invitationCodes={invitationCodes}
        />

        <div className="overflow-x-auto mt-6">
          <div className="min-w-[800px]">
            <ShopsTable shops={filteredShops} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
