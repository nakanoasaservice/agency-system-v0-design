"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import type { AgencySettings } from "@/types/settings"

interface BasicInfoFormProps {
  initialSettings: AgencySettings
}

// 基本情報フォームのバリデーションスキーマ
const basicInfoSchema = z.object({
  name: z.string().min(1, "代理店名は必須です"),
})

export function BasicInfoForm({ initialSettings }: BasicInfoFormProps) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  // 基本情報フォームの初期化
  const form = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: initialSettings.name,
    },
  })

  // 基本情報フォーム送信処理
  async function onSubmit(values: z.infer<typeof basicInfoSchema>) {
    setIsSaving(true)

    try {
      // 実際の実装ではAPIを呼び出して設定を保存します
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "基本情報を保存しました",
        description: "代理店の基本情報が正常に更新されました。",
      })
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "設定の保存中にエラーが発生しました。もう一度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>基本情報</CardTitle>
        <CardDescription>代理店の基本的な情報を設定します。</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>代理店名</FormLabel>
                  <FormControl>
                    <Input placeholder="代理店名を入力" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-6">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "保存中..." : "基本情報を保存"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
