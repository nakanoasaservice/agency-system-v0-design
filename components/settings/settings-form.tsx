"use client"

import type { AgencySettings } from "@/types/settings"
import { BasicInfoForm } from "@/components/settings/basic-info-form"
import { TaxInfoForm } from "@/components/settings/tax-info-form"

interface SettingsFormProps {
  initialSettings: AgencySettings
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  return (
    <div className="space-y-6">
      {/* 基本情報セクション */}
      <BasicInfoForm initialSettings={initialSettings} />

      {/* 税務情報セクション */}
      <TaxInfoForm initialSettings={initialSettings} />
    </div>
  )
}
