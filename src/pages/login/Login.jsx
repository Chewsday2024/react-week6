import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from 'react-loading';


import { userlogin, userStatus } from "./loginSlice";



function Login () {

  const dispatch = useDispatch();

  const loginStatus = useSelector(userStatus);

  const go = useNavigate();


  
  useEffect(() => {
    loginStatus === 'succeded' ? go('/Lobby') : null
  }, [loginStatus]);


  const [account, setAccount] = useState({
    username: '',
    password: ''
  });
  

  function accountValue (e) {
    
    const { name, value } = e.target;

    setAccount({
      ...account,
      [name]: value
    })
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="row justify-content-center">
        <h1 className="h3 mb-3 text-center font-weight-normal">請先登入</h1>
        <div className="col-8">
          <form id="form" onSubmit={(e) => {
            e.preventDefault();
            dispatch(userlogin(account));
            }}>  
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                name="username"
                onChange={accountValue}
                autoComplete="username"
                required
                autoFocus
                />
              <label htmlFor="username">Email address</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={accountValue}
                autoComplete="current-password"
                required
                />
              <label htmlFor="password">Password</label>
            </div>

            <button className="btn btn-lg btn-primary w-100 mt-3">登入</button>
          </form>
        </div>
      </div>

      <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>


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
    </div>
  )
}


export default Login;