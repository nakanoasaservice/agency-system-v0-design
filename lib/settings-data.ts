import type { AgencySettings } from "@/types/settings"

// 実際の実装ではデータベースから設定を取得する関数
export async function getAgencySettings(): Promise<AgencySettings> {
  // サンプルの設定データ
  const settings: AgencySettings = {
    id: "settings_123",
    name: "株式会社サンプル代理店",
    email: "info@sample-agency.co.jp",
    address: "東京都千代田区丸の内1-1-1",
    phone: "03-1234-5678",
    invoiceRegistrationNumber: "T1234567890123",
    bankAccount: {
      bankName: "サンプル銀行",
      branchName: "本店",
      accountType: "普通",
      accountNumber: "1234567",
      accountName: "カ）サンプルダイリテン",
    },
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z",
  }

  // 実際の実装では非同期処理（データベースクエリなど）が入る
  await new Promise((resolve) => setTimeout(resolve, 100))

  return settings
}

// 実際の実装では設定を保存する関数
export async function saveAgencySettings(settings: Partial<AgencySettings>): Promise<AgencySettings> {
  // 実際の実装ではデータベースに保存する処理が入る
  await new Promise((resolve) => setTimeout(resolve, 500))

  // 更新された設定を返す（実際の実装ではデータベースから取得）
  return {
    id: "settings_123",
    name: settings.name || "株式会社サンプル代理店",
    email: settings.email || "info@sample-agency.co.jp",
    address: settings.address || "東京都千代田区丸の内1-1-1",
    phone: settings.phone || "03-1234-5678",
    invoiceRegistrationNumber: settings.invoiceRegistrationNumber || "T1234567890123",
    bankAccount: settings.bankAccount || {
      bankName: "サンプル銀行",
      branchName: "本店",
      accountType: "普通",
      accountNumber: "1234567",
      accountName: "カ）サンプルダイリテン",
    },
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
  }
}
