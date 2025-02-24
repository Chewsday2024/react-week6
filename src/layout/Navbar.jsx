import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";



import { userLogOut } from "../pages/login/loginSlice";


function Navbar () {

  const dispatch = useDispatch();



  return (
    <>
      <nav className=" bg-dark">
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
                to='ProductList'>
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
                onClick={() => dispatch(userLogOut())}
                to='..'>
                  登出
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;