"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function useClipboard() {
  const { toast } = useToast()
  const [copiedState, setCopiedState] = useState<Record<string, boolean>>({})

  const copyToClipboard = (text: string, key: string, successMessage?: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedState((prev) => ({ ...prev, [key]: true }))

        setTimeout(() => {
          setCopiedState((prev) => ({ ...prev, [key]: false }))
        }, 2000)

        toast({
          title: successMessage || "コピーしました",
          description: `${text} がクリップボードにコピーされました`,
        })
      })
      .catch((err) => {
        toast({
          title: "コピーに失敗しました",
          description: "クリップボードへのアクセスが拒否されました",
          variant: "destructive",
        })
      })
  }

  const isCopied = (key: string) => !!copiedState[key]

  return { copyToClipboard, isCopied }
}
