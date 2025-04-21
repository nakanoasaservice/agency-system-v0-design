import { Badge } from "@/components/ui/badge"

interface ShopStatusBadgeProps {
  status: string
}

export function ShopStatusBadge({ status }: ShopStatusBadgeProps) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default"

  switch (status) {
    case "トライアル中":
      variant = "secondary"
      break
    case "利用継続中":
      variant = "default"
      break
    case "利用停止":
      variant = "destructive"
      break
    case "解約済":
      variant = "outline"
      break
  }

  return <Badge variant={variant}>{status}</Badge>
}
