import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Paginate from "../components/Paginate";
import { toast } from "react-toastify";
import brandService from "../features/brand/brandService";

 
const Brandlist = () => {
  const [page, setPage] = useState(1);
  const [limits, setLimits] = useState(20);
  const [load, setLoad] = useState(false)
  const [productState, setProductState] = useState([])

  const filters = `?page=${page}&limit=${limits}`


  const getProducts = async () => {
    setLoad(true)
    try {
      const res = await brandService.getBrands(filters);
      setLoad(false)
      setProductState(res)
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  }
  console.log(productState)

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  }, [page, limits]);


  return (
    <div>
      <h3 className="mb-4 title">Categories</h3>
      <div className="body">
        <div className="table-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>decription</th>
                  <th>image</th>
                  <th>Action</th>
                </tr>
              </thead>
              {!load && productState.content?.length > 0 && (
                <tbody>
                  {productState.content?.map(

                    (tr, i) => (

                      <tr key={i}>
                        <td>
                          {limits * (page - 1) +
                            i +
                            1}
                        </td>
                        <td>{tr?.name}</td>
                        <td>{tr?.description}</td>
                        <td><img style={{ height: "50px", width: "50px", borderRadius: "50%" }} src={tr.logo} alt="no-img" /></td>
                        <td>
                          <span>
                            <Link to={`/admin/brand/${tr.slug}`}
                              state={tr}>
                              <BiEdit /></Link>
                          </span>
                          <span>

                            <AiOutlineDelete />
                          </span>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              )}
            </table>
          </div>
          {!load && productState?.totalPages > 1 && (
            <Paginate
              currentPage={page}
              totalCount={productState?.totalElements}
              pageSize={limits}
              lastPage={productState.totalPages}
              onSelect={(p) => setPage(Number(p))}
              onNext={(p) => setPage(p)}
              onPrev={(p) => setPage(p)}
              changeLimit={(p) =>
                setLimits(Number(p))
              }
            />
          )}
          {load && 'Loading...'}
        </div>
      </div>
    </div>
  );
};

export default Brandlist;
