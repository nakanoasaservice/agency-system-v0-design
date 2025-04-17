interface InvitationBasicInfoProps {
  signups: number
  created: string
}

export function InvitationBasicInfo({ signups, created }: InvitationBasicInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">登録数</p>
        <p className="font-medium">{signups}件</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">作成日</p>
        <p className="font-medium">{created}</p>
      </div>
    </div>
  )
}
