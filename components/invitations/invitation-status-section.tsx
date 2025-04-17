import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface InvitationStatusSectionProps {
  status: string
}

export function InvitationStatusSection({ status }: InvitationStatusSectionProps) {
  return (
    <div className="flex flex-col items-end">
      <div className="flex flex-col items-start gap-1">
        <p className="text-sm font-medium text-gray-500">ステータス</p>
        <div className="flex items-center gap-2">
          <Badge variant={status === "active" ? "default" : "secondary"}>{status === "active" ? "有効" : "無効"}</Badge>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            無効化
          </Button>
        </div>
      </div>
    </div>
  )
}
