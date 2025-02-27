import { Link } from "react-router-dom";



function NotFound () {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark ">
      <h1 className="bg-danger p-5 rounded-4">不存在的頁面！</h1>

      <Link className="btn btn-primary mt-5 fs-4" to='/Lobby'>回首頁</Link>
    </div>
  );
};

export default NotFound;