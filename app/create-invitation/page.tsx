"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, ArrowLeft } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Header } from "@/components/header"

export default function CreateInvitationPage() {
  const router = useRouter()

  // 基本的なフォームの状態を管理
  const [code, setCode] = useState("")
  const [memo, setMemo] = useState("")
  const [expiration, setExpiration] = useState("")
  const [maxSignups, setMaxSignups] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!code.trim()) {
      return // コードが空の場合は何もしない
    }

    setIsSubmitting(true)

    // 実際の実装ではAPIを呼び出して招待コードを作成します
    // ここではモックの成功レスポンスを返します
    setTimeout(() => {
      setIsSubmitting(false)
      // 作成後は招待コードの詳細ページにリダイレクト
      router.push(`/invitations/${code}`)
    }, 1000)
  }

  // フィールドをクリアする関数
  const clearField = (field: "expiration" | "maxSignups") => {
    if (field === "expiration") {
      setExpiration("")
    } else if (field === "maxSignups") {
      setMaxSignups("")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6 px-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link href="/invitations">
                <ArrowLeft className="h-4 w-4 mr-2" />
                招待コード一覧に戻る
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">招待コード発行</h1>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardDescription>招待コードは以下の設定で発行完了します。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">
                    招待コード <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="code"
                    placeholder="招待コードを入力（例：AGENCY123）"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="memo">メモ（任意）</Label>
                  <Input
                    id="memo"
                    placeholder="この招待コードに関するメモを追加"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiration">有効期限</Label>
                  <div className="flex gap-2">
                    <Input
                      id="expiration"
                      type="date"
                      value={expiration}
                      onChange={(e) => setExpiration(e.target.value)}
                      className="flex-1"
                    />
                    {expiration && (
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
                  <Label htmlFor="max-signups">招待数の上限設定</Label>
                  <div className="flex gap-2">
                    <Input
                      id="max-signups"
                      type="number"
                      placeholder=""
                      value={maxSignups}
                      onChange={(e) => setMaxSignups(e.target.value)}
                      min="1"
                      className="flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      style={{ MozAppearance: "textfield" }}
                    />
                    {maxSignups && (
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
                            <p>クリア</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">空欄の場合は上限なしとして扱われます</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "発行中..." : "発行する"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
