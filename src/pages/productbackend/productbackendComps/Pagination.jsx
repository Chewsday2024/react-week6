import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts, getPageInfo } from "../productbackendSlice";








function Pagination () {

  const dispatch = useDispatch();

  const pageInfo = useSelector(getPageInfo);

  

  return (
    <div className={`d-flex justify-content-center ${pageInfo.total_pages === 0 && 'd-none'}`}>
      <nav>
        <ul className="pagination">
          <li className={`page-item ${!pageInfo.has_pre && 'disabled'}`}>
            <button onClick={() => dispatch(getAdminProducts(pageInfo.current_page - 1))} className="page-link">
              上一頁
            </button>
          </li>

          
          {Array.from({ length: pageInfo.total_pages }).map(( _, index ) => (
            <li className={`page-item ${pageInfo.current_page === index + 1 && 'active'}`} key={index}>
              <button onClick={() => dispatch(getAdminProducts(index + 1))} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
          
          
          <li className={`page-item ${!pageInfo.has_next && 'disabled'}`}>
            <button onClick={() => dispatch(getAdminProducts(pageInfo.current_page + 1))} className="page-link">
              下一頁
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
};

export default Pagination;