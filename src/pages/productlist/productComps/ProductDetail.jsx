import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import ReactLoading from 'react-loading';


import { detailstatus, getOneProduct, oneProduct, openDetail, resetStatus } from "./productDetailSlice";
import { addCart, productStatus } from "../productlistSlice";





function ProductDetail () {

  const product = useSelector(oneProduct);
  const cartStatus = useSelector(productStatus);
  const screenStatus = useSelector(detailstatus);


  
  const dispatch = useDispatch();

  const go = useNavigate();

  const qtyRef = useRef(null);

  const { id } = useParams();

  
  useEffect(() => {
    screenStatus === 'idle' && dispatch(getOneProduct(id));
  }, [dispatch, id, screenStatus]);


  useEffect(() => {
    screenStatus === 'succeded' ||  screenStatus === 'failed' ? (product.id !== id &&  (go('*') , dispatch(resetStatus()))) : null

    id && dispatch(openDetail(true))

  }, [product.id, id, go, screenStatus, dispatch])
  

  return (
    <>
      <div className={`container ${screenStatus === 'loading' && 'd-none'}`}>
        <Link
          type="button"
          className="btn btn-primary fs-3 me-2"
          to='..'
          onClick={() => dispatch(openDetail(false))}
        >
          上一頁
        </Link>

        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                產品名稱：{product.title}
              </h2>
            </div>

            <div className="modal-body fs-5" style={{height: '650px'}}>
              <img
                src={product.imageUrl}
                alt={product.title}
                className="object-fit-cover w-100 h-75 mb-2"
              />
              <p className="mb-2">內容：{product.content}</p>
              <p className="mb-2">描述：{product.description}</p>
              <p className="mb-2">
                價錢：
                <del className="me-1">{product.origin_price}</del>元

                <span className="h5 mx-2">{'→'}</span>

                <span className="text-success me-1">{product?.price}</span>元
              </p>

              <div className="input-group align-items-center">
                <label htmlFor="qtySelect">數量：</label>
                <select
                  id="qtySelect"
                  className="form-select"
                  ref={qtyRef}
                >
                  {Array.from({ length: 10 }).map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="modal-footer">
              <div className="d-flex ms-auto align-items-center" style={{width: '140px'}}>
                {cartStatus === product.id && 
                  <ReactLoading 
                    type="spin"
                    color="black"
                    width="1.5rem"
                    height="1.5rem" 
                  />
                }
                
                <button 
                  type="button" 
                  className="btn btn-primary ms-auto" 
                  onClick={() => dispatch(addCart({id: product.id, qty: qtyRef.current.value}))}>
                    加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {screenStatus === 'loading' && (
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
    </>
  );
};

export default ProductDetail;