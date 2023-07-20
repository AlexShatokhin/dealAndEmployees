import { Component } from "react";

import Error from "../Error/Error";

class ErrorBoundary extends Component {

    state = {
        error: false,
    }

    static getDerivedStateFromError(er){
        this.setState({
            error: true,
        })
    }

    render(){
        if(this.state.error)
            return <Error />
        else
            return this.props.children;
    }
}

export default ErrorBoundary;