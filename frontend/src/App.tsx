import React from 'react';
import { Col, Container, Row } from "react-bootstrap";

import { ContributorsStatsTable } from "./components/ContributorsStatsTable";
import { Loader } from "./components/Loader";
import { RepositoryURLInput } from "./components/RepositoryURLInput";
import { Maybe } from "./functional/maybe";
import {
    ContributorStats,
    fetchRepositoryContributorsStatistics,
    RepositoryNotFound
} from "./fetchRepositoryContributorsStatistics";
import { isNil } from "./functional/logic";
import { getRepositoryDetails, RepositoryDetails } from "./githubRepositoryURL";


interface AppProps {}

interface AppState {
    loading: boolean;
    errorMessage: Maybe<string>;
    repositoryURL: string;
    contributorsStats: ContributorStats[];
}

export class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);

        this.state = {
            loading: false,
            errorMessage: null,
            repositoryURL: "",
            contributorsStats: []
        };

        this.handleRepositoryURLUpdate = this.handleRepositoryURLUpdate.bind(this);
        this.displayErrorMessage = this.displayErrorMessage.bind(this);
        this.reloadContributorsStatsTable = this.reloadContributorsStatsTable.bind(this);
        this.handleRepositoryURLFieldUpdate = this.handleRepositoryURLFieldUpdate.bind(this);
    }

    async handleRepositoryURLFieldUpdate(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const repositoryURL = event.target.value;
        if (this.state.repositoryURL === repositoryURL) return;

        this.setState({ ...this.state, repositoryURL: repositoryURL, errorMessage: null });
    }


    async handleRepositoryURLUpdate(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        if (isNil(event.target.value) || event.target.value.length === 0) return;

        const repositoryURL = event.target.value;
        const repositoryDetails = getRepositoryDetails(repositoryURL);
        if (isNil(repositoryDetails)) {
            return this.displayErrorMessage("Invalid GitHub repository URL.");
        } else {
            return this.reloadContributorsStatsTable(repositoryDetails);
        }
    }

    async reloadContributorsStatsTable(repositoryDetails: RepositoryDetails) {
        this.setState({...this.state, loading: true});
        try {
            const stats =  await fetchRepositoryContributorsStatistics(repositoryDetails);
            this.setState({
                ...this.state,
                loading: false,
                errorMessage: null,
                contributorsStats: stats
            });
        } catch (error) {
            if (error instanceof RepositoryNotFound) {
                this.displayErrorMessage("Repository not found.");
            } else {
                this.displayErrorMessage("Can NOT load repository stats fro GitHub.");
            }
        }
    }

    displayErrorMessage(errorMessage: string): void {
        this.setState({
            ...this.state,
            errorMessage: errorMessage,
            loading: false,
            contributorsStats: []
        });
    }

    render() {
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
                                errorMessage={this.state.errorMessage}
                                disabled={this.state.loading}
                                onRepositoryURLFieldUpdate={this.handleRepositoryURLFieldUpdate}
                                onRepositoryURLUpdate={this.handleRepositoryURLUpdate}
                            />
                        </Col>
                    </Row>
                    <Row className={"mt-4 mb-4"}>
                        <Col>
                            {
                                this.state.loading
                                ? <Loader/>
                                : <ContributorsStatsTable contributorsStats={this.state.contributorsStats}/>
                            }
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row className={"mt-4 mb-4 text-right"}>
                        <Col><small className="text-muted">Made by Maciej Banaszek</small></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
