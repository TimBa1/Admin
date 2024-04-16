import React, { useEffect, useState } from "react";
import Paginate from "../components/Paginate";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import customerService from "../features/cutomers/customerService";
import { toast } from "react-toastify";

const Customers = () => {

  const [page, setPage] = useState(1);
  const [limits, setLimits] = useState(20);
  const [load, setLoad] = useState(false)
  const [productState, setProductState] = useState([])

  const filters = ``


  const getProducts = async () => {
    setLoad(true)
    try {
      const res = await customerService.getUsers(filters);
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

  const users = productState?.content?.map((props) => ({
    email: props?.user?.email,
    image: props?.user?.userImage,
    name: `${props?.user?.firstName} ${' '} ${props?.user?.lastName}`,
    enabled: props?.user?.enabled,
    number: props?.user?.phoneNumber,
    gender: props?.user?.gender,
    verified: props?.user?.verified,
    id:props?.user?.id

  }))

  return (
    <div>
      <h3 className="mb-4 title">Registered Users</h3>
      <div className="body">
        <div className="table-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>email</th>
                  <th>phone number</th>
                  <th>gender</th>
                  <th>enabled</th>
                  <th>User Verified?</th>
                  <th>image</th>
                  <th>Action</th>
                </tr>
              </thead>
              {!load && users?.length > 0 && (
                <tbody>
                  {users?.map(
                    
                    (tr, i) => (
                      
                      <tr key={i}>
                        <td>
                          {limits * (page - 1) +
                            i +
                            1}
                        </td>
                        <td>{tr?.name}</td>
                        <td>{tr?.email}</td>

                        <td>{tr.number}</td>
                        <td>{tr?.gender || '--'}</td>
                        <td>{tr?.enabled === true ? "True" : "False"}</td>
                        <td>{tr?.verified === true ? "True" : "False"}</td>
                        <td><img style={{ height: "50px", width: "50px", borderRadius: "50%" }} src={tr.image} alt="no-img" /></td>
                        <td>{tr.id}</td>
                        <td>
                          <span>
                            <Link to={`/admin/customer-order/${tr?.id}`}>
                              View Customer</Link>
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

export default Customers;
