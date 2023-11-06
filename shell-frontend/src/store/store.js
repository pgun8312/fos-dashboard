import {configureStore} from "@reduxjs/toolkit"
import theme from "./slices/themeSlice"
import authUser from "./slices/authUserSlice"
import { Provider } from "react-redux";
//redux store
const store = configureStore({
    reducer:{
        theme,
        authUser
    }
})

//exposing the store provider
export const StoreProvider = ({children}) => {
    return <Provider store={store}>
        {children}
    </Provider>
}