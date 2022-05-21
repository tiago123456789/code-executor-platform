import React from "react";
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
    const accessToken = localStorage.getItem("accessToken")
    const isUserAuthenticated = accessToken != null
    if (!isUserAuthenticated) {
        return <Redirect to="/login" />
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />
}


export default PrivateRoute