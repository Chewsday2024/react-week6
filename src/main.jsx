//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';


import router from './router.jsx';
import store from './store.jsx';



import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/all.scss';



createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  //</StrictMode>,
)
