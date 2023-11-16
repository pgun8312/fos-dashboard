import { useSelector } from "react-redux";
const Home = () => {
  const authUser = useSelector((state) => state.authUser.authUser);

  return <div>{console.log(authUser)}</div>;
};

export default Home;
