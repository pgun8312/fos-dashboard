import { useSelector } from "react-redux";
const AdminDashboard = () => {
  const state = useSelector((state) => state);
  return (
    <div>
      AdminDashboard
      {console.log(state)}
    </div>
  );
};

export default AdminDashboard;
