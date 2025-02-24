import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";



import { filterImages, getInputValue, getModalMove, setValue, uploadPic } from "./modalSlice";
import { createProduct, delProduct, editProduct } from "../../updateSlice";




function Modal () {

  const imageUrlRef = useRef();
  const imagesUrlRef = useRef();


  const dispatch = useDispatch();



  const inputValue = useSelector(getInputValue);
  
  const modalMove = useSelector(getModalMove);




  return (
    <>
      <div
        id="productModal"
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        >
        <div className="modal-dialog modal-xl">
          <div className="modal-content border-0">
            <div className="modal-header bg-secondary text-white">
              <h5 id="productModalLabel" className="modal-title">
                {modalMove === 'create' ? <span>新增產品</span> : <span>編輯產品</span>}
              </h5>
              
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ></button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-sm-4">
                  <div className="mb-2">
                    <div className="mb-5">
                      <p>主圖</p>

                      <label htmlFor="fileInput" className="form-label"> 圖片上傳 </label>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="form-control"
                        id="fileInput"
                        name='uploadPic'
                        onChange={(e) => dispatch(uploadPic(e.target.files[0]))}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="imageUrl" className="form-label">
                        輸入主圖片網址
                      </label>
                      <input
                        ref={imageUrlRef}
                        name='imageUrl'
                        type="text"
                        className="form-control"
                        placeholder="請輸入圖片連結"
                        />
                    </div>
                    
                    {inputValue.imageUrl ? <img className="img-fluid" src={inputValue.imageUrl} alt={inputValue.title} /> : null}
                  </div>

                  <div className='d-flex'>
                    {inputValue.imageUrl ? null : <button className="btn btn-outline-primary btn-sm w-100 me-1" onClick={() => {
                      dispatch(setValue({
                        name: imageUrlRef.current.name,
                        value: imageUrlRef.current.value
                      }))
                      imageUrlRef.current.value = '';
                    }}>新增圖片</button>}
                  
                    {inputValue.imageUrl 
                      ? <button
                          className="btn btn-outline-danger btn-sm w-100"
                          onClick={() => dispatch(setValue({ del: 'del' }))}
                          >
                            刪除圖片
                        </button> 
                      : null}
                  </div>

                  <hr />

                  <div className="mb-2">
                    <div className="mb-3">
                      <label htmlFor="imageUrl" className="form-label">
                        輸入副圖片網址
                      </label>

                      <input
                        ref={imagesUrlRef}
                        name='imagesUrl'
                        type="text"
                        className="form-control mb-3"
                        placeholder="請輸入圖片連結"
                        />

                      {(!inputValue.imagesUrl || inputValue.imagesUrl.length < 5) && 
                        <button
                          className="btn btn-outline-primary btn-sm w-100 me-1"
                          onClick={() => {
                            dispatch(setValue({
                              name: imagesUrlRef.current.name,
                              value: imagesUrlRef.current.value
                            }))
                            imagesUrlRef.current.value = '';
                          }}
                        >新增圖片</button>}
                    </div>

                    <div className='row row-cols-1 gap-2'>
                      {inputValue.imagesUrl?.map((pic, index) => 
                        <div className='col' key={index}>
                          <p className='mb-2'>副圖{index + 1}</p>
                          <img className="img-fluid mb-2" src={pic} alt='#' />

                          <button
                            className="btn btn-outline-danger btn-sm w-100"
                            onClick={() => dispatch(filterImages(pic))}>
                              刪除圖片
                          </button>
                        </div>)
                      }
                    </div>
                  </div>
                </div>

                <div className="col-sm-8">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">標題</label>

                    <input
                      name='title'
                      value={inputValue.title}
                      onChange={(e) => dispatch(setValue({
                        name: e.target.name,
                        value: e.target.value
                      }))}
                      id="title"
                      type="text"
                      className="form-control"
                      placeholder="請輸入標題"
                      />
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="category" className="form-label">分類</label>

                      <input
                        name='category'
                        value={inputValue.category}
                        onChange={(e) => dispatch(setValue({
                          name: e.target.name,
                          value: e.target.value
                        }))}
                        id="category"
                        type="text"
                        className="form-control"
                        placeholder="請輸入分類"
                        />
                    </div>

                    <div className="mb-3 col-md-6">
                      <label htmlFor="unit" className="form-label">單位</label>
                      <input
                        name='unit'
                        value={inputValue.unit}
                        onChange={(e) => dispatch(setValue({
                          name: e.target.name,
                          value: e.target.value
                        }))}
                        id="unit"
                        type="text"
                        className="form-control"
                        placeholder="請輸入單位"
                        />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="origin_price" className="form-label">原價</label>
                      <input
                        name='origin_price'
                        value={inputValue.origin_price}
                        onChange={(e) => dispatch(setValue({
                          name: e.target.name,
                          value: e.target.value
                        }))}
                        id="origin_price"
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="請輸入原價"
                        />
                    </div>

                    <div className="mb-3 col-md-6">
                      <label htmlFor="price" className="form-label">售價</label>
                      <input
                        name='price'
                        value={inputValue.price}
                        onChange={(e) => dispatch(setValue({
                          name: e.target.name,
                          value: e.target.value
                        }))}
                        id="price"
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="請輸入售價"
                        />
                    </div>
                  </div>

                  <hr />

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">產品描述</label>
                    <textarea
                      name='description'
                      value={inputValue.description}
                      onChange={(e) => dispatch(setValue({
                        name: e.target.name,
                        value: e.target.value
                      }))}
                      id="description"
                      className="form-control"
                      placeholder="請輸入產品描述"
                      ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">說明內容</label>
                    <textarea
                      name='content'
                      value={inputValue.content}
                      onChange={(e) => dispatch(setValue({
                        name: e.target.name,
                        value: e.target.value
                      }))}
                      id="content"
                      className="form-control"
                      placeholder="請輸入說明內容"
                      ></textarea>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        name='is_enabled'
                        checked={inputValue.is_enabled}
                        onChange={(e) => dispatch(setValue({
                          name: e.target.name,
                          value: e.target.value,
                          type: e.target.type,
                          checked: e.target.checked
                        }))}
                        id="is_enabled"
                        className="form-check-input"
                        type="checkbox"
                        />
                      <label className="form-check-label" htmlFor="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                >
                取消
              </button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                modalMove === 'create' ? dispatch(createProduct())
                                       : dispatch(editProduct())
              }}>確認</button>
            </div>
          </div>
        </div>
      </div>




      <div
        className="modal fade"
        id="delProductModal"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        data-bs-backdrop="static">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">刪除產品</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              你是否要刪除 
              <span className="text-danger fw-bold">{inputValue.title}</span>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => dispatch(delProduct())}>
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;