import {
  Box,
  Button,
  TextField,
  Typography
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'
import { productService } from 'services'

const Product = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    stock: ''
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (body: CreateProduct) => productService.createProduct(body),
    onSuccess: () => {
      enqueueSnackbar('Tạo sản phẩm thành công!', { variant: 'success' })
      setForm({
        name: '',
        description: '',
        image: '',
        price: '',
        stock: ''
      })
    },
    onError: (err) => {
      enqueueSnackbar(err?.message || 'Tạo sản phẩm thất bại', { variant: 'error' })
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({
      name: form.name,
      description: form.description,
      image: form.image,
      price: Number(form.price),
      stock: Number(form.stock)
    })
  }

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Typography variant="h5" mb={2}>Tạo sản phẩm</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tên sản phẩm"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Mô tả"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Link ảnh"
          name="image"
          value={form.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Giá"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Tồn kho"
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isPending}
        >
          {isPending ? 'Đang tạo...' : 'Tạo sản phẩm'}
        </Button>
      </form>
    </Box>
  )
}

export default Product
