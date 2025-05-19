type Order = {
  id: string
  user_id: string
  products: {
    id: string
    quantity: number
    _id: string
  }[]
  total_amount: number
  status: string
  shipping_address: string
  billing_address: string
  payment_status: string
  created_at: string
  updated_at: string
}

type OrderListResponse = {
  orders: Order[]
}

type CreateOrder = {
  products: {
    id: string
    quantity: number
  }[]
  total_amount: number
  shipping_address: string
  billing_address: string
}