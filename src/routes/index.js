import config from '~/config';

import { AuthenLayout } from '~/components/Layout';

import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Product from '~/pages/Product';
import Detail from '~/pages/Detail';
import CartPage from '~/pages/CartPage';
import Checkout from '~/pages/Checkout';
import CheckoutDone from '~/pages/CheckoutDone';
import UserPurchase from '~/pages/UserPurchase';

export const publicRoutes = [
  { path: config.routes.login, component: Login, layout: AuthenLayout },
  { path: config.routes.register, component: Register, layout: AuthenLayout },
  { path: config.routes.products, component: Product },
  { path: config.routes.detail, component: Detail },
  { path: config.routes.cart, component: CartPage },
  { path: config.routes.checkoutDone, component: CheckoutDone },
  { path: config.routes.checkout, component: Checkout },
  { path: config.routes.userPurchase, component: UserPurchase },
];

export const privateRoutes = [];
