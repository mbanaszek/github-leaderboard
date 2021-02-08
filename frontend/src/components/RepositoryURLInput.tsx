import React, {FunctionComponent} from "react";
import {Alert, Form} from "react-bootstrap";

import {isNotNil} from "../functional/logic";
import {Maybe} from "../functional/maybe";

export type RepositoryURLInputProps = {
    repositoryURL: string;
    errorMessage: Maybe<string>;
}

export const RepositoryURLInput: FunctionComponent<RepositoryURLInputProps> = ({
    repositoryURL,
    errorMessage
}): JSX.Element => {
    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Control
                    type="email"
                    placeholder="e.g. https://github.com/stoplightio/prism"
                    value={repositoryURL}
                />
            </Form.Group>
            {
                isNotNil(errorMessage) ? <Alert key='error' variant='danger'>{errorMessage}</Alert> : null
            }
        </Form>
    );
}