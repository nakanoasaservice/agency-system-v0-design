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
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TaxInfoFormProps {
  initialSettings: AgencySettings
}

// 税務情報フォームのバリデーションスキーマ
const taxInfoSchema = z.object({
  invoiceRegistrationNumber: z
    .string()
    .regex(/^T\d{13}$/, "適格請求書発行事業者の登録番号はT+13桁の数字の形式で入力してください")
    .optional()
    .or(z.literal("")),
})

export function TaxInfoForm({ initialSettings }: TaxInfoFormProps) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  // 税務情報フォームの初期化
  const form = useForm<z.infer<typeof taxInfoSchema>>({
    resolver: zodResolver(taxInfoSchema),
    defaultValues: {
      invoiceRegistrationNumber: initialSettings.invoiceRegistrationNumber || "",
    },
  })

  // 税務情報フォーム送信処理
  async function onSubmit(values: z.infer<typeof taxInfoSchema>) {
    setIsSaving(true)

    try {
      // 実際の実装ではAPIを呼び出して設定を保存します
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "税務情報を保存しました",
        description: "適格請求書発行事業者の登録番号が正常に更新されました。",
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
        <CardTitle>税務情報</CardTitle>
        <CardDescription>適格請求書発行事業者（インボイス）制度に関する情報を設定します。</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="invoiceRegistrationNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>適格請求書発行事業者の登録番号</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>
                            適格請求書発行事業者として登録されている場合、国税庁から付与された登録番号を入力してください。
                            形式は「T」で始まる13桁の数字です。
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <Input placeholder="例: T1234567890123" {...field} />
                  </FormControl>
                  <FormDescription>
                    報酬の支払いに関する請求書に記載されます。登録されていない場合は空欄のままにしてください。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-6">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "保存中..." : "税務情報を保存"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
