import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import { RepositoryURLInput } from "./components/RepositoryURLInput";
import { isNil } from "./functional/logic";
import { Maybe } from "./functional/maybe";
import { ContributorsStatsTable, EmptyContributorsStatsTable } from "./components/ContributorsStatsTable";
import { getRepositoryDetails, RepositoryDetails } from "./graphql/repositoryDetails";

interface AppState {
    repositoryURL: string;
    repositoryDetails: Maybe<RepositoryDetails>;
}

export class App extends React.Component<unknown, AppState> {

    constructor(props: unknown) {
        super(props);

        this.state = {
            repositoryURL: "",
            repositoryDetails: null
        };

        this.onRepositoryURLUpdate = this.onRepositoryURLUpdate.bind(this);
    }

    onRepositoryURLUpdate(repositoryURL: string): void {
        this.setState({
            ...this.state,
            repositoryURL: repositoryURL,
            repositoryDetails: getRepositoryDetails(repositoryURL)
        });
    }

    render() : JSX.Element  {
        return (
            <div className="App">
                <Container>
                    <Row className={"mt-4 mb-4"}>
                        <Col>
                            <h1>Github Leaderboard</h1>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <RepositoryURLInput
                                repositoryURL={this.state.repositoryURL}
                                onRepositoryURLUpdate={this.onRepositoryURLUpdate}
                            />
                        </Col>
                    </Row>
                    <Row className={"mt-4 mb-4"}>
                        {
                            isNil(this.state.repositoryDetails)
                                ? <EmptyContributorsStatsTable/>
                                : <ContributorsStatsTable repositoryDetails={this.state.repositoryDetails} />
                        }
                    </Row>
                </Container>
                <Container>
                    <Row className={"mt-4 mb-4 text-right"}>
                        <Col><small className="text-muted">made by Maciej Banaszek cDStudio</small></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
