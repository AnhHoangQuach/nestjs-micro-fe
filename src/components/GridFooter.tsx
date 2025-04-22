import { Pagination } from "@mui/material"
import {
  GridFooterContainer,
  gridPageSelector,
  gridPageSizeSelector,
  GridPagination,
  gridRowCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid"

const GridPaginationSize = () => {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const rowCount = useGridSelector(apiRef, gridRowCountSelector)
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector)

  return (
    <Pagination
      classes={{ ul: "pl-3 pr-6" }}
      color="primary"
      count={Math.ceil(rowCount / pageSize)}
      onChange={(_, value) => apiRef.current.setPage(value - 1)}
      page={page + 1}
      shape="rounded"
      variant="outlined"
    />
  )
}

const GridFooter = () => {
  return (
    <GridFooterContainer>
      <GridPaginationSize />
      <GridPagination />
    </GridFooterContainer>
  )
}

export default GridFooter
