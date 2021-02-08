import React, {FunctionComponent} from "react";
import {Alert, Container} from "react-bootstrap";

export const ErrorMessage: FunctionComponent<{ text: string }> = ({text}): JSX.Element => (
    <Container className={'text-center'}>
        <Alert key='error' variant='danger'>{text}</Alert>
    </Container>
);