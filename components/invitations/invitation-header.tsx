"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Copy } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useClipboard } from "@/hooks/use-clipboard"

interface InvitationHeaderProps {
  invitationCode: string
}

export function InvitationHeader({ invitationCode }: InvitationHeaderProps) {
  const { copyToClipboard, isCopied } = useClipboard()

  return (
    <div className="flex items-center mb-6">
      <Button variant="ghost" size="sm" asChild className="mr-2">
        <Link href="/invitations">
          <ArrowLeft className="h-4 w-4 mr-2" />
          招待コード一覧に戻る
        </Link>
      </Button>
      <h1 className="text-2xl font-bold tracking-tight">
        招待コード:
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => copyToClipboard(invitationCode, "header-code", "招待コードをコピーしました")}
                className="ml-2 inline-flex items-center hover:text-primary"
              >
                {invitationCode}
                {isCopied("header-code") ? (
                  <Check className="ml-1 h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="ml-1 h-4 w-4 opacity-50 hover:opacity-100" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>クリックして招待コードをコピー</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h1>
    </div>
  )
}
