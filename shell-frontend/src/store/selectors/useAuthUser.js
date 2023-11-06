import { useSelector } from "react-redux";

const useAuthUser = () => {
    return useSelector((state) => state.authUser.authUser);
}

export default useAuthUser;