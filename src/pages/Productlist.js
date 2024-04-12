import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Paginate from "../components/Paginate";
import { formatCurrency } from "../utils/numberFormatter";
import productService from "../features/product/productService";
import { toast } from "react-toastify";





const Productlist = () => {

  const [page, setPage] = useState(1);
  const [limits, setLimits] = useState(20);
  const [load, setLoad] = useState(false)
  const [productState, setProductState] = useState([])

  const filters = `?page=${page}&limit=${limits}`


  const getProducts = async () => {
    setLoad(true)
    try {
      const res = await productService.getProducts(filters);
      setLoad(false)
      setProductState(res)
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  }, [page, limits]);


  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div className="body">
        <div className="table-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price ($)</th>
                  <th>quantity Avaliable</th>
                  <th>Brand</th>
                  <th>category</th>
                  <th>Images</th>
                  <th>Action</th>
                </tr>
              </thead>
              {!load && productState?.content?.length > 0 && (
                <tbody>
                  {productState?.content?.map(
                    (tr, i) => (
                      <tr key={tr._id}>
                        <td>
                          {limits * (page - 1) +
                            i +
                            1}
                        </td>
                        <td>{tr.name}</td>
                        <td>{tr.description}</td>
                        <td>{formatCurrency(tr.price)}</td>
                        <td className="text-center">{tr.quantityAvailable}</td>
                        <td>{tr?.brand?.name}</td>
                        <td>{tr?.categories?.map(props => (<tr key={props}>{props.name}</tr>))}</td>
                        <td><img style={{ height: "50px", width: "50px", borderRadius: "5px" }} src={tr.images[0]} alt="no-img" /></td>

                        <td>
                          <span>
                            <Link to={`/admin/product/${tr.id}`}
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

export default Productlist;
