import { client } from './axios';

const fetchProducts = (): Promise<ProductListResponse> =>
  client.get(`/products`);

const createProduct = (body: CreateProduct) => client.post(`/products`, body);

export default {
  fetchProducts,
  createProduct
}
