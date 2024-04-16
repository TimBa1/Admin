import React, { useEffect, useState } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import authService from "../features/auth/authServices";
import { toast } from "react-toastify";
import Paginate from "../components/Paginate";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/numberFormatter";
import dateFormat from 'dateformat';



const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    staus: `London, Park Lane no. ${i}`,
  });
}
const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sept",
      sales: 38,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };


  const [page, setPage] = useState(1);
  const [limits, setLimits] = useState(20);
  const [load, setLoad] = useState(false)
  const [list, setList] = useState([])

  const filters = `?page=${page}&limit=${limits}`


  const getOrders = async () => {
    setLoad(true)
    try {
      const res = await authService.getRecentOrders(filters);
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
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Income Statics</h3>

      </div>
      <div className="mt-4">
        <h3 className="mb-1 title">Recent Orders</h3>
        <div>
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
      </div>
    </div>
  );
};

export default Dashboard;
