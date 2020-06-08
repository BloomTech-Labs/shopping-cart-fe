import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useCurrency from "../hooks/useCurrency";
import MonthlySales from "../totoalSales/monthlySales";
import LifetimeSales from "../totoalSales/lifetimeSales";
import * as actionCreators from "../../state/actionCreators";
import Moment from "react-moment";
import { Table, Tag, Button } from "antd";
import { connect } from "react-redux";
import "antd/dist/antd.css";

const Orders = (props) => {
  const [newData, setNewData] = useState();
  const { currency } = props;

  const storeId = useSelector((state) => state.user.user._id);
  console.log(storeId);

  const dispatch = useDispatch();
  const sign = useCurrency(currency);
  useEffect(() => {
    dispatch(actionCreators.getSalesHistory());
    dispatch(actionCreators.setLoading(false));
    dispatch(actionCreators.getOrders(storeId));
  }, [dispatch, storeId]);
  const dashboard = useSelector((state) => state.dashboard);
  const isLoading = useSelector((state) => state.user.isLoading);
  const allOrders = useSelector((state) => state.orders);
  console.log(allOrders);

  const { Column, ColumnGroup } = Table;
  return (
    <div className='order-view'>
      <div className='sales-view'>
        <MonthlySales
          currency={sign}
          monthSales={dashboard && dashboard.monthSales}
        />
        <LifetimeSales
          currency={sign}
          amount={dashboard && dashboard.totalSales}
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
          render={(order_number) => <span>{order_number.substr(1, 7)}</span>}
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
          render={(status) =>
            status === "Not Ready" ? (
              <span style={{ background: "yellow", color: "black" }}>
                Not Ready
              </span>
            ) : (
              <span style={{ background: "green", color: "white" }}>
                Complete
              </span>
            )
          }
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
