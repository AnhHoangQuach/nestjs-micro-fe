type DBTimeAudit = {
  id: string
  createdAt: ISODateString
  updatedAt: ISODateString
}

type PopupController = {
  onClose: () => void
  onSuccess?: () => void
}