import {Container, Spinner} from "react-bootstrap";
import React from "react";

export const Loader = (): JSX.Element => {
    return (
        <Container className={"text-center"}>
            <Spinner animation="border" role="status" className={"mt-5 mb-5"}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        </Container>
    );
}