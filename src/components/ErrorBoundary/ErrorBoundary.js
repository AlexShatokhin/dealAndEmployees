import { Component } from "react";

import Error from "../Error/Error";

class ErrorBoundary extends Component {

    state = {
        error: false,
    }

    static getDerivedStateFromError(error){
        return { error: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('Error caught:', error, errorInfo);
    }

    render(){
        if(this.state.error)
            return <Error />
        else
            return this.props.children;
    }
}

export default ErrorBoundary;