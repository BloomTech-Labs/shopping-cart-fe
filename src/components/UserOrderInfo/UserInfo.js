import React from "react"

function UserInfo({ order }) {
  const [orderStatus, setOrderStatus] = React.useState(order.orderStatus)

  return (
    <div style={{ background: "pink" }}>
      <div>
        <h3>Andy Doe</h3>
        <h3>409-790-6464</h3>
        <h3>Order Number: {order._id}</h3>
        {orderStatus === false ? <h4>Not ready</h4> : <h4>Ready</h4>}
        <h3>Order Made: {order.orderCreated}</h3>
        <h3>Order Completed: {order.orderCompleted}</h3>
      </div>
      <div>
        <button onClick={() => setOrderStatus(!orderStatus)}>
          Order Ready
        </button>
        <button>Cancel Order</button>
      </div>
    </div>
  )
}

export default UserInfo
