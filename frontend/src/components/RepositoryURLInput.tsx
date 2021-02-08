import React, {FunctionComponent} from "react";
import {Alert, Form} from "react-bootstrap";

import {isNotNil} from "../functional/logic";
import {Maybe} from "../functional/maybe";

interface RepositoryURLInputProps {
    repositoryURL: string;
    errorMessage: Maybe<string>;
    disabled: boolean;
    onRepositoryURLFieldUpdate: any;
    onRepositoryURLUpdate: any;
}

export const RepositoryURLInput: FunctionComponent<RepositoryURLInputProps> = ({
    repositoryURL,
    errorMessage,
    disabled,
    onRepositoryURLFieldUpdate,
    onRepositoryURLUpdate
}): JSX.Element => {
    const onKeyDown = (event: any): void => {
        if (event.key !== 'Enter') return;
        onRepositoryURLUpdate(event);
    }
    return (
        <div>
            <Form.Group controlId="repositoryURL">
                <input
                    type="text"
                    className={'form-control'}
                    placeholder="e.g. https://github.com/stoplightio/prism"
                    value={repositoryURL}
                    onChange={onRepositoryURLFieldUpdate}
                    onBlur={onRepositoryURLUpdate}
                    onKeyDown={onKeyDown}
                    disabled={disabled}
                />
            </Form.Group>
            {
                isNotNil(errorMessage) ? <Alert key='error' variant='danger'>{errorMessage}</Alert> : null
            }
        </div>
    );
}