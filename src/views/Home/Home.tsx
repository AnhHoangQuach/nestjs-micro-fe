import { Add, InfoOutlined } from '@mui/icons-material'
import { Box, Button, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { GridEmpty, GridFooter } from 'components'
import { useSearch } from 'hooks'
import { useState } from 'react'
import { bankService } from 'services'
import { HomeSearch, PopupCreateBank } from 'views/Home/components'

const Home = () => {
  const { dataSearch, onSearchChange } = useSearch()
  const [openBank, setOpenBank] = useState(false)
  const [bank, setBank] = useState<Bank>()

  const { data } = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => bankService.fetchBanks(dataSearch),
    queryKey: ['bankService.fetchBanks', dataSearch],
  })
  const { items = [], currentPage = 1, size = 10, total = 0 } = data ?? {}

  return (
    <Stack>
      <Box marginBottom={2} className="flex items-center gap-4 justify-between">
        <HomeSearch onSearchChange={onSearchChange} />
        <Button
          className="whitespace-nowrap"
          onClick={() => {
            setOpenBank(true)
          }}
          startIcon={<Add />}
        >
          Tạo mới
        </Button>
      </Box>
      <DataGrid
        columns={[
          { field: 'customerId', flex: 1, headerName: 'Customer ID', sortable: false },
          { field: 'numberBank', flex: 1, headerName: 'Number Bank', sortable: false },
          { field: 'note', flex: 1, headerName: 'Note', sortable: false },
          {
            align: 'right',
            field: 'actions',
            headerName: '',
            renderCell: ({ row: item }) => {
              return (
                <Button
                  color="inherit"
                  onClick={() => {
                    setOpenBank(true)
                    setBank(item)
                  }}
                  size="small"
                >
                  <InfoOutlined />
                </Button>
              )
            },
            sortable: false,
            flex: 1,
          },
        ]}
        onPaginationModelChange={(model) => {
          const { page, pageSize } = model
          onSearchChange({ page: page + 1, size: pageSize })
        }}
        paginationModel={{ page: currentPage - 1, pageSize: size }}
        paginationMode="server"
        disableColumnMenu={true}
        rowSelection={false}
        showCellVerticalBorder={true}
        showColumnVerticalBorder={true}
        rowCount={total}
        rows={items}
        pageSizeOptions={[10, 20, 50, 100]}
        slots={{ footer: GridFooter, noRowsOverlay: GridEmpty }}
      />

      <PopupCreateBank bank={bank} onClose={() => setOpenBank(false)} open={openBank} />
    </Stack>
  )
}

export default Home
