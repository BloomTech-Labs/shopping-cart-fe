import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useCurrency from "../hooks/useCurrency";
import LifetimeSales from "../totoalSales/lifetimeSales";
import * as actionCreators from "../../state/actionCreators";
import Moment from "react-moment";
import { Table } from "antd";
import "antd/dist/antd.css";

const Orders = (props) => {
  const [newData, setNewData] = useState();
  const { currency } = props;
  const storeId = useSelector((state) => state.user.user._id);

  const dispatch = useDispatch();

  const sign = useCurrency(currency);
  useEffect(() => {
    dispatch(actionCreators.getSalesHistory());
    dispatch(actionCreators.setLoading(false));
    dispatch(actionCreators.getStoreOrders(storeId));
  }, [dispatch, storeId]);

  const dashboard = useSelector((state) => state.dashboard);
  const isLoading = useSelector((state) => state.user.isLoading);
  const allOrders = useSelector((state) => state.orders);
  console.log("allOrders", allOrders)


  const { Column, ColumnGroup } = Table;
  return (
    <div className='order-view'>
      <div className='sales-view'>
        <LifetimeSales
          currency={sign}
          amount={dashboard && dashboard.totalSales}
          monthSales={dashboard && dashboard.monthSales}
        />
      </div>

      <Table
        className='order-display'
        dataSource={!allOrders ? newData : allOrders}
      >
        <Column
          title='Order #'
          dataIndex='_id'
          key='_id'
          render={(order_number) => (
            <span>{order_number.substr(19, 24).toUpperCase()}</span>
          )}
        />
        <Column
          title='Customer Name'
          dataIndex='customerName'
          key='customerName'
        />
        <Column
          title='Total Items'
          dataIndex='orderItem'
          key='orderItem'
          render={(orderItem) => <span>{orderItem.length}</span>}
        />
        <Column
          title='Status'
          dataIndex='orderStatus'
          key='orderStatus'
          render={(status) => {
            if (status === "Not Ready") {
              return (
                <span style={{ background: "yellow", color: "white" }}>
                  Not Ready
                </span>
              );
            } else if (status === "Prepaired") {
              return (
                <span style={{ background: "#3AA3E3", color: "white" }}>
                  Prepared
                </span>
              );
            } else if (status === "Canceled") {
              return (
                <span style={{ background: "red", color: "white" }}>
                  Canceled
                </span>
              );
            } else if (status === "Completed") {
              return (
                <span style={{ background: "green", color: "white" }}>
                  Complete
                </span>
              );
            } else {
              return (
                <span style={{ background: "#8D939B", color: "white" }}>
                  No Status
                </span>
              );
            }
          }}
        />
        <Column
          title='Date'
          dataIndex='orderCreated'
          key='orderCreated'
          render={(date) => <Moment>{date}</Moment>}
        />
        <Column
          title='Actions'
          dataIndex='_id'
          key='_id'
          render={(order_id) => (
            <NavLink to={`/order/${order_id}`}>
              <span>Order Details</span>
            </NavLink>
          )}
        />
      </Table>
    </div>
  );
};

export default Orders;
