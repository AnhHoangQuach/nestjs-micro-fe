import { client } from './axios'

const fetchProducts = (): Promise<ProductListResponse> =>
  client.get(`/products`);

export default {
  fetchProducts
}
