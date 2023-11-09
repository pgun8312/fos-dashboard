import {configureStore} from "@reduxjs/toolkit"
import { Provider } from "react-redux";
import theme from "./slices/themeSlice"
import authUser from "./slices/authUserSlice"
import cart from "./slices/cartSlice"
//redux store
const store = configureStore({
    reducer:{
        theme,
        authUser,
        cart
    }
})

//exposing the store provider
export const StoreProvider = ({children}) => {
    return <Provider store={store}>
        {children}
    </Provider>
}