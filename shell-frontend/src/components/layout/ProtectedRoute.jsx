import {Navigate, Outlet} from "react-router-dom"
import { userStateContext } from "../../utils/ContextProvider"
const ProtectedRoute = ({userRole, redirect}) => {

/* in here need to to the token validation and extract the role and set to the variable */

  const { authUser } = userStateContext();//this auth User coming from context(the details set to context in the login using ID token)
 
  {console.log(!authUser)}
  //also set the authUser details by checking the localstorage in case of page refresh

  //if the user is not authenticated send to the login
  if(!authUser.role) {
    return <Navigate to="/" replace />
  }

  //if user is authenticated but does not have the access to the route
  if(userRole && !userRole.includes(authUser.role)) {
    return <Navigate to={redirect} replace/>
  }

  //authenticated user and the have access to route return the sub routes
  return <Outlet />
}

export default ProtectedRoute