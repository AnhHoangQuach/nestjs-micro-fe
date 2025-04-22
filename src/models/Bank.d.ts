type Bank = DBTimeAudit & {
  customerId: string
  numberBank: string
  note: string
}

type BankCreateBody = {
  customerId: string
  numberBank: string
  note?: string
}

type BankUpdateBody = {
  id: string
  numberBank?: string
  note?: string
}