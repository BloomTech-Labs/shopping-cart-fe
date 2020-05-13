import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as creators from "../../state/actionCreators";
import { Table, Tag, Button } from "antd";
import { connect } from "react-redux";
import "antd/dist/antd.css";

const Orders = (props) => {
  const [newData, setNewData] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(creators.getCurrentUser());
  }, [dispatch]);

  const { Column, ColumnGroup } = Table;
  return (
    <div>
      <Table dataSource={!props.state ? newData : props.state.orders}>
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

export default Orders;
