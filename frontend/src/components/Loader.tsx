
import {Spinner} from "react-bootstrap";
import React from "react";

export const Loader = (): JSX.Element => {
    return (
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    );
}