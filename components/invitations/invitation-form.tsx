"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface InvitationFormProps {
  memo: string
  expiration: string
  maxSignups: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  clearField: (field: "expiration" | "maxSignups") => void
}

export function InvitationForm({ memo, expiration, maxSignups, handleChange, clearField }: InvitationFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="memo" className="text-sm font-medium text-gray-500">
          メモ
        </Label>
        <Input
          id="memo"
          name="memo"
          value={memo}
          onChange={handleChange}
          placeholder="この招待コードに関するメモを入力"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="expiration" className="text-sm font-medium text-gray-500">
          有効期限
        </Label>
        <div className="flex gap-2">
          <Input
            id="expiration"
            name="expiration"
            type="date"
            value={expiration}
            onChange={handleChange}
            className="flex-1"
          />
          {expiration && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => clearField("expiration")}
                    className="h-10 w-10 shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>クリア（無期限）</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="text-xs text-muted-foreground">空欄の場合は無期限として扱われます</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxSignups" className="text-sm font-medium text-gray-500">
          招待数の上限設定
        </Label>
        <div className="flex gap-2">
          <Input
            id="maxSignups"
            name="maxSignups"
            type="number"
            placeholder="上限数を入力"
            value={maxSignups}
            onChange={handleChange}
            min="1"
            className="flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ MozAppearance: "textfield" }}
          />
          {maxSignups && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => clearField("maxSignups")}
                    className="h-10 w-10 shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>クリア</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="text-xs text-muted-foreground">空欄の場合は上限なしとして扱われます</p>
      </div>
    </div>
  )
}
