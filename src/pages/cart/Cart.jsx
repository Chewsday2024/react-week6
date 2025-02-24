import { useDispatch, useSelector } from "react-redux";
import ReactLoading from 'react-loading';



import Orders from "./cartComps/order/Orders";
import Form from "./cartComps/form/form";
import { allOrders, brushPage, DCTotal, getOrderStatus, OGTotal, zeroOrder } from "./cartComps/order/ordersSlice";




function Cart () {
  const dispatch = useDispatch();

  
  const orders = useSelector(allOrders);

  const originTotal = useSelector(OGTotal);

  const discountTotal = useSelector(DCTotal);

  const orderStatus = useSelector(getOrderStatus);

  const brush = useSelector(brushPage);

  

  return (
    <div className="container" >
      <div className={`text-end mb-3 ${!orders && 'd-none'}`}>
        <button className={`btn btn-outline-danger ${orders.length === 0 && 'd-none'}`} type="button" onClick={() => dispatch(zeroOrder())}>清空購物車</button>
      </div>

      <table className={`table align-middle w-100 ${orders.length === 0 && 'd-none'}`} key={brush}>
        <thead>
          <tr className="text-center fs-4">
            <th></th>

            <th>圖片</th>

            <th>品名</th>

            <th>數量/單位</th>

            <th>特價單價</th>

            <th>單項總價</th>
          </tr>
        </thead>

        <tbody>
          <Orders />
        </tbody>

        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="fs-5">原價總價：$ {originTotal}</td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="text-success fs-5">特價總價：$ {discountTotal}</td>
          </tr>
        </tfoot>
      </table>

      <h1 className={`text-center mt-5 ${orders.length === 0 ? 'd-block' : 'd-none'}`}>尚無購物車資料</h1>
      

      <Form/>


      {orderStatus === 'loading' && 
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(130, 130, 130, 0.42)",
            zIndex: 999,
          }}>
          <ReactLoading
            type="spin"
            color="black"
            width="4rem"
            height="4rem"
          />
        </div>
      }
      
    </div>
  )
};

export default Cart;