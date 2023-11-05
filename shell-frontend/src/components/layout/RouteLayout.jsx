import { Outlet } from "react-router-dom"
import { ContextProvider } from "../../utils/ContextProvider"

const RouteLayout = () => {
  return (
    <ContextProvider> {/* giving access to context details */}
        <Outlet />
    </ContextProvider>
  )
}

export default RouteLayout