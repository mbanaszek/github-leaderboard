import React, { FunctionComponent } from "react";
import { Alert, Container } from "react-bootstrap";

interface ErrorMessageProps {
    text: string;
}

export const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ text }: ErrorMessageProps): JSX.Element => (
    <Container className={"text-center"}>
        <Alert key='error' variant='danger'>{text}</Alert>
    </Container>
);