"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { useShopData } from "@/hooks/use-shop-data"

interface RegisteredShopsCardProps {
  invitationCode: string
}

export function RegisteredShopsCard({ invitationCode }: RegisteredShopsCardProps) {
  const { shops, columns } = useShopData()

  return (
    <Card>
      <CardHeader>
        <CardTitle>この招待コードで登録したショップ</CardTitle>
        <CardDescription>この招待コードを使用して登録したショップのリスト</CardDescription>
      </CardHeader>
      <CardContent>
        {shops.length > 0 ? (
          <DataTable columns={columns} data={shops} pageSize={3} />
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500">まだショップの登録はありません</p>
          </div>
        )}
      </CardContent>
      {shops.length > 0 && (
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href={`/invitations/${invitationCode}/shops`}>すべてのショップを表示</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
