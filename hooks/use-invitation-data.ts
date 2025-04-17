"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function useInvitationData(invitationCode: string) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  // 実際の実装ではデータベースから招待コードの情報を取得します
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

  return {
    invitationData,
    setInvitationData,
    handleChange,
    clearField,
    handleSave,
    isSaving,
  }
}
