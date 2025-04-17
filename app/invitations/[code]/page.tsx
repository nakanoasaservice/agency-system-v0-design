"use client"
import { Header } from "@/components/header"
import { InvitationHeader } from "@/components/invitations/invitation-header"
import { InvitationDetailsCard } from "@/components/invitations/invitation-details-card"
import { RegisteredShopsCard } from "@/components/invitations/registered-shops-card"
import { useInvitationData } from "@/hooks/use-invitation-data"

export default function InvitationDetailPage({ params }: { params: { code: string } }) {
  const invitationCode = params.code
  const { invitationData, setInvitationData, handleChange, clearField, handleSave, isSaving } =
    useInvitationData(invitationCode)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <InvitationHeader invitationCode={invitationCode} />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <InvitationDetailsCard
                invitationData={invitationData}
                setInvitationData={setInvitationData}
                handleChange={handleChange}
                clearField={clearField}
                handleSave={handleSave}
                isSaving={isSaving}
              />
            </div>

            <RegisteredShopsCard invitationCode={invitationCode} />
          </div>
        </div>
      </main>
    </div>
  )
}
