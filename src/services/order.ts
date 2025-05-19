import { client } from './axios';

const fetchOrders = (): Promise<OrderListResponse> =>
  client.get(`/orders`);

const createOrder = (body: CreateOrder) => client.post(`/orders`, body);

export default {
  fetchOrders,
  createOrder
}
