export interface BankAccount {
  bankName: string
  branchName: string
  accountType: string
  accountNumber: string
  accountName: string
}

export interface AgencySettings {
  id: string
  name: string
  email: string
  address?: string
  phone?: string
  invoiceRegistrationNumber?: string
  bankAccount?: BankAccount
  createdAt: string
  updatedAt: string
}
