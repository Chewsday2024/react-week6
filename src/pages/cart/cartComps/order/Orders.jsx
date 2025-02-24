import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { allOrders, delOrder, editOrder, getOrders } from "./ordersSlice";
import { getFormKey } from "../form/formSlice";



function Order () {


  const dispatch = useDispatch();

  const orders = useSelector(allOrders);

  const formKey = useSelector(getFormKey);
  

  useEffect(() => {
    dispatch(getOrders());
  }, [formKey]);



  return (
    <>
      {orders.map(order => (
          <tr key={order.id} className="text-center fs-5">
            <td>
              <button type="button" className="btn btn-outline-danger fw-bold" onClick={() => dispatch(delOrder(order.id))}>
                x
              </button>
            </td>

            <td className="w-25"><img className="w-100" src={order.product.imageUrl} alt={order.product.title} /></td>

            <td>{order.product.title}</td>
           
            <td>
              <div className="d-flex justify-content-center align-items-center">
                <div className="btn-group me-2" role="group">
                  <button
                    onClick={() => {
                      dispatch(editOrder({
                        orderId: order.id,
                        productId: order.product.id,
                        orderQty: order.qty - 1
                      }))
                    }}
                    type="button"
                    className="btn btn-outline-dark"
                    disabled={order.qty === 1}
                  >
                    -
                  </button>

                  <span className="btn border border-dark">{order.qty}</span>
                  
                  <button
                    onClick={() => {
                      dispatch(editOrder({
                        orderId: order.id,
                        productId: order.product.id,
                        orderQty: order.qty + 1
                      }))
                    }}
                    type="button"
                    className="btn btn-outline-dark"
                  >
                    +
                  </button>
                </div>

                <span>{order.product.unit}</span>
              </div>
            </td>

            <td className="text-success fw-bold">$ {order.product.price}</td>

            <td>$ {order.total}</td>
          </tr>
        ))
      }
    </>
  );
};

export default Order;