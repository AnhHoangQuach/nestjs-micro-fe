import { Home } from 'views/Home'
import { Order } from 'views/Order'

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
}

export default privateRoute
