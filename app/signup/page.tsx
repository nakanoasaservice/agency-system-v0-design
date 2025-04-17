import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  // 実際の実装ではURLクエリパラメータから抽出します
  const invitationCode = "AGENCY123"
  const agencyName = "サンプル代理店"

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">アカウント作成</CardTitle>
          <CardDescription className="text-center">{agencyName}からの招待コードを使用してサインアップ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invitation-code">招待コード</Label>
            <Input id="invitation-code" value={invitationCode} readOnly className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">氏名</Label>
            <Input id="name" placeholder="氏名を入力してください" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" placeholder="メールアドレスを入力してください" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input id="password" type="password" placeholder="パスワードを作成してください" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">会社名（任意）</Label>
            <Input id="company" placeholder="会社名を入力してください" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm">
              <Link href="#" className="text-primary hover:underline">
                利用規約
              </Link>{" "}
              と{" "}
              <Link href="#" className="text-primary hover:underline">
                プライバシーポリシー
              </Link>
              に同意します
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">アカウント作成</Button>
        </CardFooter>
      </Card>
      <p className="mt-4 text-center text-sm text-gray-500">
        すでにアカウントをお持ちですか？{" "}
        <Link href="/login" className="text-primary hover:underline">
          ログイン
        </Link>
      </p>
    </div>
  )
}
