import { useCallback, useState } from 'react'

type CommonSearch = {
  [key: string]: unknown
  page?: number
  size?: number
  desc?: boolean
  search?: string
}

const useSearch = (search?: CommonSearch) => {
  const [dataSearch, setDataSearch] = useState<CommonSearch>({
    page: 1,
    size: 10,
    desc: true,
    search: '',
    ...search,
  })

  const onSearchChange = useCallback((search?: CommonSearch) => {
    setDataSearch((current: CommonSearch) => {
      return {
        ...current,
        page: 1,
        ...search,
      }
    })
  }, [])

  return { dataSearch, onSearchChange }
}

export default useSearch
