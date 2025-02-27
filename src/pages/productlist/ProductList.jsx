import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import { Link, Outlet } from "react-router-dom";





import { addCart, allProducts, getProductList, productStatus } from "./productlistSlice";




import './ProductList.scss';
import { getDetailIsOpen, openDetail, resetStatus } from "./productComps/productDetailSlice";



function ProductList () {

  const dispatch = useDispatch();

  const productList = useSelector(allProducts);

  const listSatus = useSelector(productStatus);

  const detailIsOpen = useSelector(getDetailIsOpen);


  useEffect(() => {
    listSatus === 'idle' && dispatch(getProductList());
  }, [dispatch, listSatus]);



  return (
    <>
      <div className={`container ${detailIsOpen ? 'd-none' : 'd-block'}`}>
        <table className="table align-middle">
          <thead className="text-center">
            <tr className="fs-3">
              <th>圖片</th>

              <th>商品名稱</th>

              <th>價格</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {productList && productList.length > 0 
            ? (productList.map(( product, index) => (
              <tr key={index} className="text-center">
                <td className="w-25">
                  <img className="w-100" src={product.imageUrl} />
                </td>

                <td className="h3">{product.title}</td>

                <td>
                  <div className="d-flex justify-content-around align-items-center">
                    <div>
                      <div className="h5 mb-1">原價</div>
                      <del className="h5 ">${product.origin_price}</del>
                    </div>

                    <span className="h1">{'→'}</span>

                    <div >
                      <div className="h5 mb-1">特價</div>
                      <h5 className="text-success fw-bold">${product.price}</h5>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="d-flex m-auto" style={{width: '205px'}}>
                    <div className="btn-group btn-group-sm">
                      <Link 
                        type="button"
                        className="btn btn-outline-secondary"
                        to={`${product.id}`}
                        onClick={() => {
                          dispatch(openDetail(true))
                          dispatch(resetStatus())
                        }}>
                          查看更多
                      </Link>
                      
                      <button 
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => dispatch(addCart({id: product.id, qty: 1 }))}>
                      <i className="bi bi-cart-fill me-1"></i>
                        加到購物車
                      </button>
                    </div>
                    
                    {listSatus === product.id && <ReactLoading className="d-inline-block ms-2" type="spin" color="black" width="1rem" height="1rem" />}
                  </div>
                </td>
              </tr>
            )))
            : (<tr><td colSpan="5">尚無產品資料</td></tr>)}
            
          </tbody>
        </table>

        {listSatus === 'loading' && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(130, 130, 130, 0.42)",
              zIndex: 999,
            }}
          >
            <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
          </div>
        )}
      </div>


      <Outlet />
    </>
  );
};

export default ProductList;