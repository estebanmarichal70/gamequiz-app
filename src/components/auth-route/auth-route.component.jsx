import React from "react";
import {Redirect, Route} from "react-router";

const AuthRoute = ({component: Component, user, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>
                user != null ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/usuario/login',
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    );
}

export default AuthRoute;