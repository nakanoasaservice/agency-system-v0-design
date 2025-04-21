import { Header } from "@/components/header"
import { ShopsPageContent } from "@/components/shops/shops-page-content"
import { getShopsData } from "@/lib/shops-data"

export default async function ShopsPage() {
  // サーバーサイドでショップデータを取得
  const shopsData = await getShopsData()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6 px-4 sm:px-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">ショップ管理</h1>
          </div>

          <ShopsPageContent initialShops={shopsData.shops} invitationCodes={shopsData.invitationCodes} />
        </div>
      </main>
    </div>
  )
}
