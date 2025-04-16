"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface InvitationEmailFormProps {
  invitationCode: string
  invitationUrl: string
}

export function InvitationEmailForm({ invitationCode, invitationUrl }: InvitationEmailFormProps) {
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState(`【招待】サービスへの招待コード: ${invitationCode}`)
  const [message, setMessage] = useState(
    `こんにちは、\n\n当サービスへの招待コードをお送りします。\n\n招待コード: ${invitationCode}\n\n以下のリンクからサインアップしてください：\n${invitationUrl}\n\nご質問があればお気軽にお問い合わせください。`,
  )
  const [isSending, setIsSending] = useState(false)
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setSendResult(null)

    // 実際の実装ではAPIを呼び出してメールを送信します
    // ここではモックの成功レスポンスを返します
    setTimeout(() => {
      setIsSending(false)
      setSendResult({
        success: true,
        message: `${email}に招待メールを送信しました。`,
      })
      // 成功したらフォームをリセット
      setEmail("")
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>招待メールを送信</CardTitle>
        <CardDescription>顧客に招待リンクをメールで送信します</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {sendResult && (
            <Alert variant={sendResult.success ? "default" : "destructive"}>
              {sendResult.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{sendResult.success ? "送信成功" : "送信エラー"}</AlertTitle>
              <AlertDescription>{sendResult.message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">宛先メールアドレス</Label>
            <Input
              id="email"
              type="email"
              placeholder="customer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">件名</Label>
            <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">メッセージ</Label>
            <Textarea id="message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSending}>
            <Mail className="mr-2 h-4 w-4" />
            {isSending ? "送信中..." : "招待メールを送信"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

