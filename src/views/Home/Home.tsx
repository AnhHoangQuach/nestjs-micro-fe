import React, { useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { orderService, productService } from 'services'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const Home = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [orderOpen, setOrderOpen] = useState(false)
  const [shippingAddress, setShippingAddress] = useState('')
  const [billingAddress, setBillingAddress] = useState('')

  const { data } = useQuery({
    queryFn: async () => await productService.fetchProducts(),
    queryKey: ['productService.fetchProducts'],
  })

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const found = prevCart.find((item) => item.id === product.id)
      if (found) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    )
  }

  // Tính tổng số sản phẩm và tổng tiền
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)

  // Xử lý mở popup xem chi tiết
  const handleOpenDetail = (product: Product) => {
    setSelectedProduct(product)
    setOpen(true)
  }
  const handleCloseDetail = () => {
    setOpen(false)
    setSelectedProduct(null)
  }

  const handleOrder = () => {
    setOrderOpen(true)
  }

  const handleOrderClose = () => {
    setOrderOpen(false)
    setShippingAddress('')
    setBillingAddress('')
  }

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await orderService.createOrder({
        total_amount: totalPrice,
        shipping_address: shippingAddress,
        billing_address: billingAddress,
        products: cart.map(item => ({
          id: item.id,
          quantity: item.quantity,
        })),
      })
      alert('Đặt hàng thành công!')
      handleOrderClose()
      setCart([])
    } catch (err) {
      console.log(err)
      alert('Đặt hàng thất bại!')
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: 4, mt: 4, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {/* Product List */}
      <Paper elevation={3} sx={{ flex: 1, minWidth: 340, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Danh sách sản phẩm
        </Typography>
        <Grid container spacing={3}>
          {data?.products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    height: 180,
                    objectFit: 'cover',
                    borderRadius: 2,
                    mb: 1,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                  onClick={() => handleOpenDetail(product)}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" noWrap>
                    {product.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                    {product.price.toLocaleString()}₫
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => addToCart(product)}
                    fullWidth
                  >
                    Thêm vào giỏ
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Cart */}
      <Paper elevation={3} sx={{ flex: 1, minWidth: 340, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Giỏ hàng
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">
            Tổng số sản phẩm: <b>{totalQuantity}</b>
          </Typography>
          <Typography variant="subtitle1">
            Tổng tiền: <b style={{ color: '#1976d2' }}>{totalPrice.toLocaleString()}₫</b>
          </Typography>
        </Box>
        {cart.length === 0 ? (
          <Typography color="text.secondary">Chưa có sản phẩm nào</Typography>
        ) : (
          <>
            <List>
              {cart.map((item) => (
                <ListItem
                  key={item.id}
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton edge="end" color="error" onClick={() => removeFromCart(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      src={item.image}
                      alt={item.name}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography fontWeight={600}>{item.name}</Typography>
                        <Typography color="text.secondary" fontSize={14}>
                          x{item.quantity}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography color="text.secondary" fontSize={14}>
                        {(item.price * item.quantity).toLocaleString()}₫ ({item.price.toLocaleString()}₫/sp)
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2, width: '100%' }}
              onClick={handleOrder}
            >
              Xác nhận đặt hàng
            </Button>
          </>
        )}
      </Paper>

      {/* Popup xem chi tiết sản phẩm */}
      <Dialog open={open} onClose={handleCloseDetail} maxWidth="sm" fullWidth>
        {selectedProduct && (
          <>
            <DialogTitle>{selectedProduct.name}</DialogTitle>
            <DialogContent sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Zoom>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: 400,
                      borderRadius: 8,
                      cursor: 'zoom-in',
                    }}
                  />
                </Zoom>
              </Box>
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                {selectedProduct.price.toLocaleString()}₫
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => addToCart(selectedProduct)}
                >
                  Thêm vào giỏ
                </Button>
                {(() => {
                  const found = cart.find((item) => item.id === selectedProduct.id)
                  return found && found.quantity > 0 ? (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => removeFromCart(selectedProduct.id)}
                    >
                      Xoá bớt
                    </Button>
                  ) : null
                })()}
              </Box>
              {(() => {
                const found = cart.find((item) => item.id === selectedProduct.id)
                return found && found.quantity > 0 ? (
                  <Typography color="text.secondary">
                    Đang có trong giỏ: <b>{found.quantity}</b>
                  </Typography>
                ) : null
              })()}
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Popup xác nhận đặt hàng */}
      <Dialog open={orderOpen} onClose={handleOrderClose} maxWidth="xs" fullWidth>
        <DialogTitle>
          Xác nhận đặt hàng
          <IconButton
            aria-label="close"
            onClick={handleOrderClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleOrderSubmit} sx={{ mt: 1 }}>
            <TextField
              label="Địa chỉ giao hàng"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Địa chỉ hóa đơn"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: '100%' }}
            >
              Đặt hàng
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Home
