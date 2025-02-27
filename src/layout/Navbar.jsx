import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactLoading from 'react-loading';



import { checkislogin, userlogout, userStatus } from "../pages/login/loginSlice";
import { useEffect } from "react";
import { openDetail } from "../pages/productlist/productComps/productDetailSlice";


function Navbar () {

  const dispatch = useDispatch();

  const go = useNavigate();

  const loginStatus = useSelector(userStatus);


  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)dogfood\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
    
    axios.defaults.headers.common['Authorization'] = token;

    
    loginStatus !== 'logout' && dispatch(checkislogin());

    (loginStatus === 'logout' || !loginStatus) && go('/');
  }, [loginStatus, dispatch, go]);



  return (
    <>
      <nav className="bg-dark sticky-top">
        <div className="container-fluid">
          <ul className="d-flex justify-content-between w-50 m-auto">
          <li>
              <Link
                type="button"
                className="btn btn-primary">
                  首頁
              </Link>
            </li>

            <li>
              <Link 
                type="button"
                className="btn btn-primary"
                to='ProductList'
                onClick={() => dispatch(openDetail(false))}
                >
                  產品列表
              </Link>
            </li>

            <li>
              <Link
                type="button"
                className="btn btn-primary"
                to='Cart'>購物車</Link>
            </li>

            <li>
              <Link
                type="button"
                className="btn btn-primary"
                to='ProductBackEnd'>產品後台</Link>
            </li>

            <li>
              <Link 
                type="button" 
                className="btn btn-primary"
                onClick={() => dispatch(userlogout())}
                to='..'>
                  登出
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />




      {loginStatus === 'loading' && (
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

export default Navbar;