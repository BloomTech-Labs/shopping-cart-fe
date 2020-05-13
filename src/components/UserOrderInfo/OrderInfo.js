import React, {useState, useEffect} from "react"
import OrderDetail from "./OrderDetail"
import UserInfo from "./UserInfo"
import * as action from "../../state/actionCreators";
import { useSelector, useDispatch } from "react-redux";

function OrderInfo() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(action.getCurrentUser())
  }, [dispatch])

  const user = useSelector((state) => state.user.user)

  return (
    <div className="site-card-border-less-wrapper" style = {{display:"flex", justifyContent :"flex-start"}}>
      <UserInfo />
      <OrderDetail />
    </div>
  )
}

export default OrderInfo;
