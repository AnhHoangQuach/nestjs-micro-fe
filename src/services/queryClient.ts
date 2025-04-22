import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: 'always',
      retry: 0,
      staleTime: 10 * 1000,
    },
  },
})
