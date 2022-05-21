import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap"
import axios from "axios"
import * as querystringUtil from "../utils/Querystring"

const client_id = process.env.REACT_APP_OAUTH_CLIENT_ID
const redirect_uri = process.env.REACT_APP_OAUTH_REDIRECT_URI

export default (props) => {
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [code, setCode] = useState(null);

    const getAccessToken = async (code) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}authenticate`, {
            code
        })
        setIsAuthenticating(false)
        localStorage.setItem("accessToken", response.data.accessToken)
        props.history.push("/gists")
    }

    useEffect(() => {
        const querystring = querystringUtil.get(props.location.search);
        const path = querystring.path;
        if (path) {
            return props.history.push(path)
        }

        if (querystring.code) {
            setIsAuthenticating(true)
            setCode(querystring.code);
            getAccessToken(querystring.code)
        }
    }, [])

    return (
        <div className="container">
            <br />
            <Card className="text-center col-md-4 offset-md-4 mt-4"
            >
                <CardBody>
                    <CardTitle tag="h5">
                        Sign in
                    </CardTitle>
                    <br/>
                    <a className="btn btn-dark"
                        href={`${process.env.REACT_APP_OAUTH_LOGIN_GITHUB}?scope=user%20gist&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                    >{ !isAuthenticating ? 'Github' : 'Authenticating...' }</a>
                    
                </CardBody>
            </Card>

        </div>
    )
}