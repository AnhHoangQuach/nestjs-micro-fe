import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { productService } from 'services'

const Home = () => {
  const [cart, setCart] = useState<CartItem[]>([])

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
                  sx={{ height: 180, objectFit: 'cover', borderRadius: 2, mb: 1 }}
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
        )}
      </Paper>
    </Box>
  )
}

export default Home
