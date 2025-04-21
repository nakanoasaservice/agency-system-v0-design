import { Header } from "@/components/header"
import { SettingsForm } from "@/components/settings/settings-form"
import { getAgencySettings } from "@/lib/settings-data"

export default async function SettingsPage() {
  // サーバーサイドで設定データを取得
  const settings = await getAgencySettings()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">設定</h1>
              <p className="text-muted-foreground mt-1">
                代理店に関する基本設定を行います。これらの情報は報酬の支払いや請求書の発行に使用されます。
              </p>
            </div>

            <SettingsForm initialSettings={settings} />
          </div>
        </div>
      </main>
    </div>
  )
}
