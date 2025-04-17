"use client"

import type React from "react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { InvitationStatusSection } from "./invitation-status-section"
import { InvitationBasicInfo } from "./invitation-basic-info"
import { InvitationLinkSection } from "./invitation-link-section"
import { InvitationCodeSection } from "./invitation-code-section"
import { InvitationForm } from "./invitation-form"

interface InvitationDetailsCardProps {
  invitationData: {
    code: string
    url: string
    created: string
    status: string
    signups: number
    memo: string
    expiration: string
    maxSignups: string
  }
  setInvitationData: React.Dispatch<React.SetStateAction<any>>
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  clearField: (field: "expiration" | "maxSignups") => void
  handleSave: () => void
  isSaving: boolean
}

export function InvitationDetailsCard({
  invitationData,
  handleChange,
  clearField,
  handleSave,
  isSaving,
}: InvitationDetailsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>招待コード詳細</CardTitle>
          <CardDescription>この招待コードの詳細情報</CardDescription>
        </div>
        <InvitationStatusSection status={invitationData.status} />
      </CardHeader>
      <CardContent className="space-y-6">
        <InvitationBasicInfo signups={invitationData.signups} created={invitationData.created} />

        <div className="space-y-4 pb-4 border-b">
          <InvitationLinkSection url={invitationData.url} />
          <InvitationCodeSection code={invitationData.code} />
        </div>

        <InvitationForm
          memo={invitationData.memo}
          expiration={invitationData.expiration}
          maxSignups={invitationData.maxSignups}
          handleChange={handleChange}
          clearField={clearField}
        />
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-6">
        <Button variant="default" onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            "保存中..."
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              変更を保存
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
