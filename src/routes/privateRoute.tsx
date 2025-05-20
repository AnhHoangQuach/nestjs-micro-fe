import { Home } from 'views/Home'
import { Order } from 'views/Order'
import { Product } from 'views/Product'

const privateRoute = {
  home: {
    name: 'Trang mua hàng',
    component: Home,
    path: '/',
    url: '/',
  },
  order: {
    name: 'Danh sách đơn hàng',
    component: Order,
    path: '/order',
    url: '/order',
  },
  product: {
    name: 'Tạo sản phẩm',
    component: Product,
    path: '/product',
    url: '/product',
  },
}

export default privateRoute
