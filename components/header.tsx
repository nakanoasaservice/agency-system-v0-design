"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Building, ChevronDown, LogOut, User, LayoutDashboard, Ticket, Store, CreditCard } from "lucide-react"

export function Header() {
  // 現在選択されている代理店
  const [currentOrg, setCurrentOrg] = useState({
    name: "株式会社サンプル代理店",
    id: "org_123",
    image: "",
  })

  // サンプルの代理店リスト
  const organizations = [
    { name: "株式会社サンプル代理店", id: "org_123", image: "" },
    { name: "テスト代理店", id: "org_456", image: "" },
    { name: "パートナー企業A", id: "org_789", image: "" },
  ]

  // サンプルのユーザー情報
  const user = {
    name: "山田 太郎",
    email: "yamada@example.com",
    image: "",
  }

  // 代理店を切り替える処理
  const switchOrganization = (org: (typeof organizations)[0]) => {
    setCurrentOrg(org)
    // 実際の実装では、ここでClerkのswitchOrganizationを呼び出す
  }

  // 現在のパスを取得
  const [currentPath, setCurrentPath] = useState("/dashboard")

  return (
    <header className="bg-white border-b">
      <div className="w-full flex h-16 items-center px-4 sm:px-6">
        {/* 代理店切り替え (OrganizationSwitcher) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 px-3 py-2 border-primary/20 bg-primary/5 hover:bg-primary/10"
            >
              <span className="font-medium text-sm">{currentOrg.name}</span>
              <ChevronDown className="h-4 w-4 text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>代理店を切り替え</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {organizations.map((org) => (
              <DropdownMenuItem
                key={org.id}
                onClick={() => switchOrganization(org)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span>{org.name}</span>
                {org.id === currentOrg.id && <span className="ml-auto text-primary">✓</span>}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Building className="h-4 w-4" />
              <span>新しい代理店を作成</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 区切り線 */}
        <div className="h-8 border-l mx-4 opacity-20"></div>

        {/* ナビゲーションリンク */}
        <nav className="flex gap-4">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center justify-center px-3 py-1 rounded-md ${
              currentPath === "/dashboard" ? "text-primary bg-primary/10" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPath("/dashboard")}
          >
            <LayoutDashboard className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">ダッシュボード</span>
          </Link>
          <Link
            href="/invitations"
            className={`flex flex-col items-center justify-center px-3 py-1 rounded-md ${
              currentPath === "/invitations" ? "text-primary bg-primary/10" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPath("/invitations")}
          >
            <Ticket className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">招待コード</span>
          </Link>
          <Link
            href="/shops"
            className={`flex flex-col items-center justify-center px-3 py-1 rounded-md ${
              currentPath === "/shops" ? "text-primary bg-primary/10" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPath("/shops")}
          >
            <Store className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">ショップ管理</span>
          </Link>
          <Link
            href="/rewards"
            className={`flex flex-col items-center justify-center px-3 py-1 rounded-md ${
              currentPath === "/rewards" ? "text-primary bg-primary/10" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPath("/rewards")}
          >
            <CreditCard className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">報酬管理</span>
          </Link>
        </nav>

        {/* ユーザーメニュー (UserButton) */}
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 rounded-full hover:bg-gray-100">
                <Avatar className="h-8 w-8 border border-gray-200">
                  {user.image ? (
                    <AvatarImage src={user.image} alt={user.name} />
                  ) : (
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  )}
                </Avatar>
                <span className="font-medium text-sm hidden sm:inline-block">{user.name}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>アカウントの管理</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>サインアウト</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
