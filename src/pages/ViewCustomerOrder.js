import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import authService from "../features/auth/authServices";
import { toast } from "react-toastify";
import Paginate from "../components/Paginate";
import { formatCurrency } from "../utils/numberFormatter";
import dateFormat from 'dateformat';

const ViewCustomerOrder = () => {
    const {id} = useParams()
  const [page, setPage] = useState(1);
  const [limits, setLimits] = useState(20);
  const [load, setLoad] = useState(false)
  const [list, setList] = useState([])

  const filters = ` `


  const getOrders = async () => {
    setLoad(true)
    try {
      const res = await authService.getCustomerOrder(id,filters);
      setLoad(false)
      setList(res)
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    getOrders();
  }, [page, limits]);
  console.log(list)

  const badgeColor = (str) => {
    if (str) {
      let status = str.toLowerCase();
      if (status === 'payment_successful') {
        return 'bg-primary';
      } else if (status.includes('payment_failed')) {
        return 'bg-danger';
      } else if (status.includes('payment_pending')) {
        return 'bg-warning text-dark';
      } else if (status.includes('paid')) {
        return 'bg-primary';
      } else {
        return 'bg-info';
      }
    }
    return 'bg-dang';
  };
  const returnStatus = (status) => {
    let split = status?.split('_');
    return split ? split[1] : status;
  };


  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div className="body">
        <div className="table-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>descripition</th>
                  <th>Price</th>
                  <th>category</th>
                  <th>Status</th>
                  <th>Amount ($)</th>
                  <th>Created at</th>
                </tr>
              </thead>
              {!load && list?.content?.length > 0 && (
                <tbody>
                  {list?.content?.map(
                    (tr, i) => (
                      <tr key={tr._id}>
                        <td>
                          {limits * (page - 1) +
                            i +
                            1}
                        </td>
                        <td></td>
                        <td>{tr.items.map((i) => (
                          <tr key={i}>
                            <span>{i.productDto.name}</span>
                          </tr>
                        ))}</td>
                        <td>{tr.items.map((i) => (
                          <tr key={i}>
                            <span>{i.quantity}</span>
                          </tr>
                        ))}</td>
                        <td>{tr.items.map((i) => (
                          <tr key={i}>
                            <span>{i.productDto.description.substring(0, 40)}...</span>
                          </tr>
                        ))}</td>
                        <td>{tr.items.map((i) => (
                          <tr key={i}>
                            <span style={{ fontWeight: "700", fontSize: "17px" }}>{formatCurrency(i.productDto.price)}</span>
                          </tr>
                        ))}</td>
                        <td>{tr.items.map((i) => (
                          <tr key={i}>
                            <span>{i.productDto.categories.map((j) => (
                              <tr key={j}>{j.name}</tr>
                            ))}</span>
                          </tr>
                        ))}</td>
                        <td><span
                          className={`badge rounded-pill ${badgeColor(
                            tr.currentStatus,
                          )}`}>
                          {returnStatus(
                            tr.currentStatus,
                          )}
                        </span></td>
                        <td style={{ fontWeight: "700", fontSize: "17px" }}>{formatCurrency(tr.total)}</td>
                        <td> {dateFormat(
                          tr.createdAt,
                          'mmm dd, yyyy | h:MM TT',
                        )}</td>
                        <td></td>
                        <td>
                          <span>
                            <Link to={`/admin/order/${tr.slug}`}
                              state={tr}>
                              <BiEdit /></Link>
                          </span>
                          <span>

                          </span>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              )}
            </table>
          </div>
          {!load && list?.totalPages > 1 && (
            <Paginate
              currentPage={page}
              totalCount={list?.totalElements}
              pageSize={limits}
              lastPage={list.totalPages}
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

export default ViewCustomerOrder;
