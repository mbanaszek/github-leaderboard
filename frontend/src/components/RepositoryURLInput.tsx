import React, {FunctionComponent} from "react";
import { Form } from "react-bootstrap";

interface RepositoryURLInputProps {
    repositoryURL: string;
    onRepositoryURLUpdate: any;
}

export const RepositoryURLInput: FunctionComponent<RepositoryURLInputProps> = ({
    repositoryURL,
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
                    placeholder="e.g. 'https://github.com/stoplightio/prism' or 'stoplightio/prism'"
                    value={repositoryURL}
                    onChange={onRepositoryURLUpdate}
                    onKeyDown={onKeyDown}
                />
            </Form.Group>
        </div>
    );
}