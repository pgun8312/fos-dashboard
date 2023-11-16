import { useSelector } from "react-redux";
const AdminDashboard = () => {
  const authUser = useSelector((state) => state);
  const order = useSelector((state) => state.local.order);
  return (
    <div>
      AdminDashboard
      {console.log(authUser)}
      {console.log(order)}
    </div>
  );
};

export default AdminDashboard;
