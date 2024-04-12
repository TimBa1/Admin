import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation, useParams } from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
import { formatCurrency } from "../utils/numberFormatter";
import dateFormat from 'dateformat';



const ViewOrder = () => {
  const details = useLocation().state

  console.log(details)

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
    <div className="row">
      <h3 className="mb-4 title">View Order</h3>

      <div className="col-lg-8">
        <div className='d-flex mb-3 justify-content-between'>
          <span style={{ fontSize: "16px" }}>Total</span>
          <strong style={{ fontSize: "18px" }}>${formatCurrency(details.total)}</strong>
        </div>
        <div className='d-flex mb-3 justify-content-between'>
          <span style={{ fontSize: "16px" }}>Current Status</span>
          <strong style={{ fontSize: "18px" }}><span
            className={`badge rounded-pill ${badgeColor(
              details.currentStatus,
            )}`}>
            {returnStatus(
              details.currentStatus,
            )}
          </span></strong>
        </div>
        <div className='d-flex mb-3 justify-content-between'>
          <span style={{ fontSize: "16px" }}>Created At</span>
          <strong style={{ fontSize: "18px" }}>{dateFormat(details.createdAt, 'mmm dd, yyyy | h:MM TT')}</strong>
        </div>
        <div className='d-flex mb-3 justify-content-between'>
          <span style={{ fontSize: "16px" }}>Items</span>
          <strong style={{ fontSize: "18px" }}>{details.items.map((i) => (
            <div key={i} style={{ borderBottom: "1px solid black", display: "flex", flexDirection: "column" }}>
              <span style={{ marginRight: "", }}  >Name: {i.productDto.name}</span>
              <span>Quantity: {i.quantity}</span>
              <span>price: ${formatCurrency(i.productDto.price)}</span>
              <span>Quantity Avaliable: {i.productDto.quantityAvailable}</span>
              <span>Description: {i.productDto.description.substring(0,30)}...</span>
              <span><img style={{ height: "50px", width: "50px", borderRadius: "50%" }} src={i.productDto.images[0]} alt="no-img" /></span>
              <span>Categories: {i.productDto.categories.map((j) => (
                <tr key={j}>{j.name}</tr>
              ))}</span>
              <span>
                Brand: {i.productDto.brand.name}
              </span>
            </div>
          ))}</strong>
        </div>
        <div className='d-flex mb-3 justify-content-between'>
          <span style={{ fontSize: "16px" }}>Quantities</span>
          <strong style={{ fontSize: "18px" }}>{details.items.map((i) => (
            <tr key={i}>
              <span>{i.quantity}</span>
            </tr>
          ))}</strong>
        </div>
        <div className='d-flex mb-3 justify-content-between'>
          <span style={{ fontSize: "16px" }}>Total</span>
          <strong style={{ fontSize: "18px" }}>{formatCurrency(details.total)}</strong>
        </div>
        <div className='d-flex mb-3 justify-content-between'>
          <span style={{ fontSize: "16px" }}>Total</span>
          <strong style={{ fontSize: "18px" }}>{formatCurrency(details.total)}</strong>
        </div>
      </div>

    </div>
  );
};

export default ViewOrder;
