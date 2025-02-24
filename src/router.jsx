import { createHashRouter } from "react-router-dom";


import App from "./App";
import Login from "./pages/login/Login";
import ProductList from "./pages/productlist/ProductList";
import Navbar from "./layout/Navbar";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./pages/productlist/productComps/ProductDetail";
import ProductBackEnd from "./pages/productbackend/ProductBackEnd";





const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'Lobby',
        element: <Navbar />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'ProductList',
            element: <ProductList />
          },
          {
            path: ':id',
            element: <ProductDetail />
          },
          {
            path: 'Cart',
            element: <Cart />
          },
          {
            path: 'ProductBackEnd',
            element: <ProductBackEnd />
          }
        ]
      }
    ]
  }
]);





export default router;