type PaginateParams = {
  page?: number
  size?: number
  desc?: boolean
}

type PaginateResponse<T> = {
  items: T[]
  currentPage: number
  size: number
  total: number
}
