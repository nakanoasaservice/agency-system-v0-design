"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Plus, ArrowUpDown, Check, Calendar, Users, FileText, Search } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Header } from "@/components/header"

type Invitation = {
  code: string
  url: string
  created: string
  status: "active" | "inactive"
  signups: number
  expiration: string | null
  maxSignups: number | null
  memo: string | null
}

export default function InvitationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState<string | null>(null)

  // コピー処理
  const copyToClipboard = (text: string, type: "code" | "link", code: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (type === "code") {
          setCopiedCode(code)
          setTimeout(() => setCopiedCode(null), 2000)
          toast({
            title: "招待コードをコピーしました",
            description: `${text} がクリップボードにコピーされました`,
          })
        } else {
          setCopiedLink(code)
          setTimeout(() => setCopiedLink(null), 2000)
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

  // サンプル招待データ
  const invitations: Invitation[] = [
    {
      code: "AGENCY123",
      url: "https://example.com/signup?code=AGENCY123",
      created: "2025-03-15",
      status: "active",
      signups: 12,
      expiration: "2025-12-31",
      maxSignups: 50,
      memo: "主要ショップ向けの特別招待コード",
    },
    {
      code: "SPECIAL50",
      url: "https://example.com/signup?code=SPECIAL50",
      created: "2025-03-10",
      status: "active",
      signups: 8,
      expiration: "2025-06-30",
      maxSignups: 20,
      memo: "夏季キャンペーン用の限定コード",
    },
    {
      code: "PROMO2025",
      url: "https://example.com/signup?code=PROMO2025",
      created: "2025-03-05",
      status: "inactive",
      signups: 3,
      expiration: "2025-04-30",
      maxSignups: null,
      memo: "2025年プロモーション用",
    },
    {
      code: "WELCOME25",
      url: "https://example.com/signup?code=WELCOME25",
      created: "2025-02-28",
      status: "active",
      signups: 15,
      expiration: null,
      maxSignups: 30,
      memo: "新規ショップ向けウェルカムコード",
    },
    {
      code: "SUMMER2025",
      url: "https://example.com/signup?code=SUMMER2025",
      created: "2025-02-20",
      status: "active",
      signups: 7,
      expiration: "2025-08-31",
      maxSignups: null,
      memo: "夏季限定キャンペーン",
    },
    {
      code: "WINTER2025",
      url: "https://example.com/signup?code=WINTER2025",
      created: "2025-02-15",
      status: "inactive",
      signups: 2,
      expiration: "2025-01-31",
      maxSignups: 10,
      memo: null,
    },
    {
      code: "SPRING2025",
      url: "https://example.com/signup?code=SPRING2025",
      created: "2025-02-10",
      status: "active",
      signups: 9,
      expiration: "2025-05-31",
      maxSignups: 25,
      memo: "春季キャンペーン用",
    },
    {
      code: "AUTUMN2025",
      url: "https://example.com/signup?code=AUTUMN2025",
      created: "2025-02-05",
      status: "active",
      signups: 6,
      expiration: null,
      maxSignups: null,
      memo: "秋季キャンペーン用",
    },
  ]

  // 検索フィルタリング
  const filteredInvitations = invitations.filter(
    (invitation) =>
      invitation.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (invitation.memo && invitation.memo.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // テーブル列の定義
  const columns: ColumnDef<Invitation>[] = [
    {
      accessorKey: "code",
      header: "招待コード",
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => copyToClipboard(row.original.code, "code", row.original.code)}
                className="font-medium hover:text-primary flex items-center"
              >
                {row.original.code}
                {copiedCode === row.original.code ? (
                  <Check className="ml-1 h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>クリックしてコピー</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      minSize: 120,
    },
    {
      accessorKey: "memo",
      header: ({ column }) => {
        return (
          <button className="flex items-center" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <FileText className="mr-1 h-4 w-4" />
            メモ
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </button>
        )
      },
      cell: ({ row }) => {
        const memo = row.original.memo
        if (!memo) return <span className="text-muted-foreground">-</span>

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="truncate block max-w-[200px]">{memo}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs whitespace-normal">{memo}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      },
      minSize: 200,
    },
    {
      accessorKey: "created",
      header: ({ column }) => {
        return (
          <button className="flex items-center" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            作成日
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </button>
        )
      },
      minSize: 150,
    },
    {
      accessorKey: "expiration",
      header: ({ column }) => {
        return (
          <button className="flex items-center" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <Calendar className="mr-1 h-4 w-4" />
            有効期限
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </button>
        )
      },
      cell: ({ row }) => {
        const expiration = row.original.expiration
        return <span>{expiration ? expiration : "無期限"}</span>
      },
      minSize: 150,
    },
    {
      accessorKey: "maxSignups",
      header: ({ column }) => {
        return (
          <button className="flex items-center" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <Users className="mr-1 h-4 w-4" />
            招待数の上限設定
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </button>
        )
      },
      cell: ({ row }) => {
        const maxSignups = row.original.maxSignups
        return <span>{maxSignups ? `${maxSignups}件` : "無制限"}</span>
      },
      minSize: 140,
    },
    {
      accessorKey: "status",
      header: "ステータス",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "active" ? "default" : "secondary"}>
          {row.original.status === "active" ? "有効" : "無効"}
        </Badge>
      ),
      minSize: 80,
    },
    {
      accessorKey: "signups",
      header: ({ column }) => {
        return (
          <button className="flex items-center" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            登録数
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </button>
        )
      },
      cell: ({ row }) => <span>{row.original.signups}件</span>,
      minSize: 80,
    },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => {
        const invitation = row.original
        return (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/invitations/${invitation.code}`}>詳細</Link>
            </Button>
          </div>
        )
      },
      minSize: 120,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6 px-4 sm:px-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">招待コード管理</h1>
            <Button asChild>
              <Link href="/create-invitation">
                <Plus className="mr-2 h-4 w-4" /> 招待コード発行
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>すべての招待コード</CardTitle>
              <CardDescription>
                招待コードやメモで検索できます。招待コードをクリックするとコピーできます。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="招待コードやメモで検索..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-[1100px]">
                  <DataTable columns={columns} data={filteredInvitations} pageSize={4} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
