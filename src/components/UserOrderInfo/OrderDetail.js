import React from "react"
import { Table, Button } from "antd"
import {
  CloseOutlined,
  DeleteOutlined,
  PauseCircleTwoTone,
} from "@ant-design/icons"

const { Column } = Table
function OrderDetail() {
  const data = [
    {
      quantity: 1,
      product: "Baked Potato",
    },
    {
      quantity: 2,
      product: "T-shirt",
    },
    {
      quantity: 2,
      product: "T-shirt",
    },
    {
      quantity: 2,
      product: "T-shirt",
    },
    {
      quantity: 2,
      product: "T-shirt",
    },
    {
      quantity: 2,
      product: "Computer",
    },
  ]
  return (
    <div>
      <Table
        dataSource={data}
        pagination={false}
        style={{ background: "white", width: "auto", height: "min-content", fontWeight:"bold", fontSize: '16px',}}
      >
        <Column
          title="Quantity"
          dataIndex="quantity"
          key="quantity"
          style={{ fontSize: "20px" }}
        />
        
        <Column key="action" render={() => <CloseOutlined />} />
        <Column title="Product" dataIndex="product" key="product" />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column
          key="action"
          render={() => (
            <Button
              type="default"
              style={{
                border: "none",
                color: "#007FFF",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Edit
            </Button>
          )}
        />
        <Column
          key="action"
          render={() => (
            <DeleteOutlined style={{ color: "red", fontSize: "20px" }} />
          )}
        />
      </Table>
    </div>
  )
}

export default OrderDetail
