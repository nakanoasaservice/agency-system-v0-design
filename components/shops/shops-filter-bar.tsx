"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import type { InvitationCode } from "@/types/shop"

interface ShopsFilterBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  invitationFilter: string
  onInvitationFilterChange: (value: string) => void
  invitationCodes: InvitationCode[]
}

export function ShopsFilterBar({
  searchQuery,
  onSearchChange,
  invitationFilter,
  onInvitationFilterChange,
  invitationCodes,
}: ShopsFilterBarProps) {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="ショップ名またはメールで検索..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select value={invitationFilter} onValueChange={onInvitationFilterChange}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="招待コードでフィルタ" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">すべての招待コード</SelectItem>
          {invitationCodes.map((invitation) => (
            <SelectItem key={invitation.code} value={invitation.code}>
              {invitation.code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
