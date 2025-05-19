type Product = DBTimeAudit & {
  name: string
  description: string
  image: string
  price: number
  stock: number
}

type ProductListResponse = {
  products: Product[]
}

type CartItem = Product & { quantity: number }