import { client } from './axios'

const fetchBanks = (params?: PaginateParams): Promise<PaginateResponse<Bank>> =>
  client.get(`/bank`, { params })
const createBank = (body: BankCreateBody): Promise<Bank> => client.post(`/bank`, body)
const updateBank = ({ id, ...body }: BankUpdateBody): Promise<Bank> =>
  client.put(`/bank/${id}`, body)

const bankService = {
  fetchBanks,
  createBank,
  updateBank,
}

export default bankService
