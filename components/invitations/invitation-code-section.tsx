"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useClipboard } from "@/hooks/use-clipboard"

interface InvitationCodeSectionProps {
  code: string
}

export function InvitationCodeSection({ code }: InvitationCodeSectionProps) {
  const { copyToClipboard, isCopied } = useClipboard()

  return (
    <div className="space-y-2">
      <Label htmlFor="invitation-code" className="text-sm font-medium text-gray-500">
        招待コード
      </Label>
      <div className="flex">
        <Input id="invitation-code" value={code} readOnly className="flex-1" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="ml-2"
                onClick={() => copyToClipboard(code, "invitation-code", "招待コードをコピーしました")}
              >
                {isCopied("invitation-code") ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>招待コードをコピー</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
