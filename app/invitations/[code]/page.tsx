"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, ExternalLink, ArrowUpDown, Check, Save, X } from "lucide-react"
import { InvitationEmailForm } from "@/components/invitation-email-form"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Shop = {
  id: string
  name: string
  email: string
  signupDate: string
  status: "active" | "pending" | "inactive"
  monthlyFee: number
}

export default function InvitationDetailPage({ params }: { params: { code: string } }) {
  const { toast } = useToast()
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // 実際の実装ではデータベースから招待コードの情報を取得します
  const invitationCode = params.code
  const [invitationData, setInvitationData] = useState({
    code: invitationCode,
    url: `https://example.com/signup?code=${invitationCode}`,
    created: "2025-03-15",
    status: "active",
    signups: 12,
    memo: "主要ショップ向けの特別招待コード",
    expiration: "2025-12-31",
    maxSignups: "",
  })

  // フォーム値の変更を処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInvitationData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // フィールドをクリアする関数
  const clearField = (field: "expiration" | "maxSignups") => {
    setInvitationData((prev) => ({
      ...prev,
      [field]: "",
    }))
  }

  // 変更を保存
  const handleSave = () => {
    setIsSaving(true)

    // 実際の実装ではAPIを呼び出して保存します
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "変更を保存しました",
        description: "招待コードの設定が更新されました",
      })
    }, 1000)
  }

  // コピー処理
  const copyToClipboard = (text: string, type: "code" | "link") => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (type === "code") {
          setCopiedCode(true)
          setTimeout(() => setCopiedCode(false), 2000)
          toast({
            title: "招待コードをコピーしました",
            description: `${text} がクリップボードにコピーされました`,
          })
        } else {
          setCopiedLink(true)
          setTimeout(() => setCopiedLink(false), 2000)
          toast({
            title: "招待リンクをコピーしました",
            description: "招待リンクがクリップボードにコピーされました",
          })
        }
      })
      .catch((err) => {
        toast({
          title: "コピーに失敗しました",
          description: "クリップボードへのアクセスが拒否されました",
          variant: "destructive",
        })
      })
  }

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
            <Link href="/invitations" className="text-sm font-medium text-primary">
              招待コード
            </Link>
            <Link href="/shops" className="text-sm font-medium">
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
              <Link href="/invitations">
                <ArrowLeft className="h-4 w-4 mr-2" />
                招待コード一覧に戻る
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">
              招待コード:
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => copyToClipboard(invitationCode, "code")}
                      className="ml-2 inline-flex items-center hover:text-primary"
                    >
                      {invitationCode}
                      {copiedCode ? (
                        <Check className="ml-1 h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="ml-1 h-4 w-4 opacity-50 hover:opacity-100" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>クリックして招待コードをコピー</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h1>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>招待コード詳細</CardTitle>
                  <CardDescription>この招待コードの詳細情報</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 基本情報セクション - 統一されたグリッドレイアウト */}
                  <div className="grid grid-cols-3 gap-4 pb-4 border-b">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">ステータス</p>
                      <Badge variant={invitationData.status === "active" ? "default" : "secondary"}>
                        {invitationData.status === "active" ? "有効" : "無効"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">登録数</p>
                      <p className="font-medium">{invitationData.signups}件</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">作成日</p>
                      <p className="font-medium">{invitationData.created}</p>
                    </div>
                  </div>

                  {/* 招待リンクセクション - 上部に配置 */}
                  <div className="pb-4 border-b">
                    <Label htmlFor="invitation-url" className="text-sm font-medium text-gray-500 mb-2 block">
                      招待リンク
                    </Label>
                    <div className="flex">
                      <Input id="invitation-url" value={invitationData.url} readOnly className="flex-1" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="ml-2"
                              onClick={() => copyToClipboard(invitationData.url, "link")}
                            >
                              {copiedLink ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>招待リンクをコピー</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="ml-2" asChild>
                              <Link href={invitationData.url} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>招待リンクを開く</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="memo" className="text-sm font-medium text-gray-500">
                        メモ
                      </Label>
                      <Input
                        id="memo"
                        name="memo"
                        value={invitationData.memo}
                        onChange={handleChange}
                        placeholder="この招待コードに関するメモを入力"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiration" className="text-sm font-medium text-gray-500">
                        有効期限
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="expiration"
                          name="expiration"
                          type="date"
                          value={invitationData.expiration}
                          onChange={handleChange}
                          className="flex-1"
                        />
                        {invitationData.expiration && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => clearField("expiration")}
                                  className="h-10 w-10 shrink-0"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>クリア（無期限）</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">空欄の場合は無期限として扱われます</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxSignups" className="text-sm font-medium text-gray-500">
                        最大利用回数
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="maxSignups"
                          name="maxSignups"
                          type="number"
                          placeholder="無制限"
                          value={invitationData.maxSignups}
                          onChange={handleChange}
                          min="1"
                          className="flex-1"
                        />
                        {invitationData.maxSignups && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => clearField("maxSignups")}
                                  className="h-10 w-10 shrink-0"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>クリア（無制限）</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">空欄の場合は無制限として扱われます</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="destructive">無効化</Button>
                  <Button variant="default" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      "保存中..."
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        変更を保存
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <InvitationEmailForm invitationCode={invitationCode} invitationUrl={invitationData.url} />
            </div>

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
          </div>
        </div>
      </main>
    </div>
  )
}

