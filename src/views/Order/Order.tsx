import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { orderService, productService } from 'services'

const Order = () => {
  const { data: orderData, isLoading, isError } = useQuery({
    queryKey: ['orderService.fetchOrders'],
    queryFn: async () => await orderService.fetchOrders(),
  })  

  const { data: productData } = useQuery({
    queryKey: ['productService.fetchProducts'],
    queryFn: async () => await productService.fetchProducts(),
  })

  // Tạo map id -> product để tra cứu nhanh
  const productMap = React.useMemo(() => {
    const map: Record<string, any> = {}
    productData?.products?.forEach((p: any) => {
      map[p.id] = p
    })
    return map
  }, [productData])

  if (isLoading) return <Typography>Đang tải đơn hàng...</Typography>
  if (isError) return <Typography color="error">Lỗi khi tải đơn hàng!</Typography>

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Đơn hàng của bạn
      </Typography>
      {(!orderData || !orderData.orders || orderData.orders.length === 0) ? (
        <Typography>Chưa có đơn hàng nào.</Typography>
      ) : (
        <List>
          {orderData.orders.map((order: any) => (
            <Paper key={order.id} sx={{ mb: 3, p: 2 }} elevation={2}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Mã đơn: {order.id}
              </Typography>
              <Typography>
                Địa chỉ giao hàng: <b>{order.shipping_address}</b>
              </Typography>
              <Typography>
                Địa chỉ hóa đơn: <b>{order.billing_address}</b>
              </Typography>
              <Typography>
                Tổng tiền: <b style={{ color: '#1976d2' }}>{order.total_amount.toLocaleString()}₫</b>
              </Typography>
              <Box sx={{ mt: 1, mb: 1 }}>
                <Typography fontWeight={600}>Sản phẩm:</Typography>
                <List dense>
                  {order.products.map((prod: any, idx: number) => {
                    const product = productMap[prod.id]
                    return (
                      <ListItem key={prod.id || idx} sx={{ pl: 0 }}>
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            src={product?.image}
                            alt={product?.name}
                            sx={{ width: 48, height: 48, mr: 2 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <>
                              <Chip label={`x${prod.quantity}`} size="small" sx={{ mr: 1 }} />
                              {product?.name || prod.id}
                            </>
                          }
                          secondary={
                            product?.price
                              ? `${product.price.toLocaleString()}₫/sp`
                              : ''
                          }
                        />
                      </ListItem>
                    )
                  })}
                </List>
              </Box>
              <Divider />
              <Typography variant="caption" color="text.secondary">
                Ngày đặt: {order.created_at ? new Date(order.created_at).toLocaleString() : '---'}
              </Typography>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  )
}

export default Order
