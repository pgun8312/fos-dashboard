import React from 'react'
import {useSelector} from "react-redux"

const UserOrders = () => {
  const authUser = useSelector((state) => state.authUser.authUser);
  console.log("IN User Order: ",authUser)
  return (
    <div>UserOrders</div>
  )
}

export default UserOrders