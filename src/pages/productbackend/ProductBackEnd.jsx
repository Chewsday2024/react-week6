import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import axios from "axios";





import { getAdminProducts, getAdminProductsStatus, getAllProducts } from "./productbackendSlice";
import Pagination from "./productbackendComps/Pagination";
import Modal from "./productbackendComps/modal/Modal";
import { handleInputValue } from "./productbackendComps/modal/modalSlice";
import { getUpdateStatus } from "./updateSlice";


function ProductBackEnd () {

  const dispatch = useDispatch();

  const AdminProductsStatus = useSelector(getAdminProductsStatus);

  const products = useSelector(getAllProducts);

  const updateStatus = useSelector(getUpdateStatus);


  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)dogfood\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
    
    axios.defaults.headers.common['Authorization'] = token;


    dispatch(getAdminProducts());
  }, [updateStatus, dispatch])


  

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between mt-4">
        <h2 className='m-0 fw-bold'>產品列表</h2>
        <button className="btn btn-primary" onClick={() => dispatch(handleInputValue({move: 'create'}))} data-bs-toggle="modal" data-bs-target="#productModal">建立新的產品</button>
      </div>

      <table className="table mt-4">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th width="120">產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        
        <tbody>
          {products && products.length > 0 ? (
            products.map((item) => (
              <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.title}</td>
                <td>{item.origin_price}</td>
                <td>{item.price}</td>
                <td>{item.is_enabled ? <span className="text-success">啟用</span> : <span>未啟用</span>}</td>
                <td>
                  <div className="btn-group">
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => dispatch(handleInputValue({move: 'edit', item}))} data-bs-toggle="modal" data-bs-target="#productModal">
                      編輯
                    </button>
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => dispatch(handleInputValue({move: 'del', item}))} data-bs-toggle="modal" data-bs-target="#delProductModal">
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">尚無產品資料</td>
            </tr>
          )}
        </tbody>
      </table>


      <Pagination />

      <Modal />




      {AdminProductsStatus === 'loading' && 
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
  );
};

export default ProductBackEnd;