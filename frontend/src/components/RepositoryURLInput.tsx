import React, { FunctionComponent } from "react";
import { Form } from "react-bootstrap";

interface RepositoryURLInputProps {
    repositoryURL: string;
    onRepositoryURLUpdate: (repositoryURL: string) => void;
}

export const RepositoryURLInput: FunctionComponent<RepositoryURLInputProps> = ({
    repositoryURL,
    onRepositoryURLUpdate
}: RepositoryURLInputProps): JSX.Element => {
    return (
        <div>
            <Form.Group controlId="repositoryURL">
                <Form.Control
                    type="text"
                    className={"form-control"}
                    placeholder="e.g. 'https://github.com/stoplightio/prism' or 'stoplightio/prism'"
                    value={repositoryURL}
                    onChange={(event) => onRepositoryURLUpdate(event.target.value)}
                />
            </Form.Group>
        </div>
    );
};