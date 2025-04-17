"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Check, Copy, ExternalLink } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useClipboard } from "@/hooks/use-clipboard"

interface InvitationLinkSectionProps {
  url: string
}

export function InvitationLinkSection({ url }: InvitationLinkSectionProps) {
  const { copyToClipboard, isCopied } = useClipboard()

  return (
    <div className="space-y-2">
      <Label htmlFor="invitation-url" className="text-sm font-medium text-gray-500">
        招待リンク
      </Label>
      <div className="flex">
        <Input id="invitation-url" value={url} readOnly className="flex-1" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="ml-2"
                onClick={() => copyToClipboard(url, "invitation-link", "招待リンクをコピーしました")}
              >
                {isCopied("invitation-link") ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>招待リンクをコピー</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="ml-2" asChild>
                <Link href={url} target="_blank">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>招待リンクを開く</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
