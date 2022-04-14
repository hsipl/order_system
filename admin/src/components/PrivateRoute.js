import React from 'react'
import {Route, Redirect} from "react-router-dom"



const PrivateRoute = (props) => {
    const isLogin = localStorage.getItem("UserAccount") ? true : false
    return isLogin ? (
        <Route
            path={props.path}
            render={()=> <props.component></props.component>}
            >
        </Route>
    ) :(
        <Redirect to = "/login"/>
    )
}

export default PrivateRoute
