import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCurrency from "../hooks/useCurrency";
import MonthlySales from "../totoalSales/monthlySales";
import LifetimeSales from "../totoalSales/lifetimeSales";
import * as actionCreators from "../../state/actionCreators";
import { Table, Tag, Button } from "antd";
import { connect } from "react-redux";
import "antd/dist/antd.css";

// import { data } from "../../db.js";
// import { getOrders } from "../../utils/api";

const Orders = (props, { currency, storeId }) => {
  const [newData, setNewData] = useState();

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(creators.getOrders());
  // }, [dispatch]);

  const dispatch = useDispatch();
  const sign = useCurrency(currency);
  useEffect(() => {
    dispatch(actionCreators.getSalesHistory());
    dispatch(actionCreators.setLoading(false));
  }, [dispatch, storeId]);
  const dashboard = useSelector((state) => state.dashboard);
  const isLoading = useSelector((state) => state.user.isLoading);

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

      {/* <Button
        type='primary'
        onClick={() => {
          const info = props.getOrders(data);
        }}
      >
        View Orders
      </Button> */}
      <Table
        className='order-display'
        dataSource={!props.state ? newData : props.state.orders}
        // loading={!props.state ? true : false}
      >
        <Column title='Order #' dataIndex='id' key='id' />
        <Column
          title='Customer Name'
          dataIndex='customerName'
          key='customerName'
        />
        <Column
          title='Total Items'
          dataIndex='items'
          key='items'
          render={(items) => <span>{items.length}</span>}
        />
        <Column
          title='Status'
          dataIndex='status'
          key='status'
          render={(status) =>
            status === false ? (
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
        <Column title='Date' dataIndex='date' key='date' />
        <Column
          title='Action'
          key='action'
          render={(text) => (
            <span>
              <a>View</a>
            </span>
          )}
        />
      </Table>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   console.log(state);
//   return { state };
// };

// export default connect(mapStateToProps, { getOrders })(Orders);

export default Orders;
