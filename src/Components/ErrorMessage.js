import React from "react";

const ErrorMessage = (props) => {
    return <div className={props.className}>{props.message}</div>;
};

export default ErrorMessage;
