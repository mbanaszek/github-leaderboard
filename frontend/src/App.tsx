import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ContributorsStatsTable, ContributorStats} from "./components/ContributorsStatsTable";
import {Loader} from "./components/Loader";
import {RepositoryURLInput} from "./components/RepositoryURLInput";
import {Maybe} from "./functional/maybe";

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
            repositoryURL: "https://github.com/stoplightio/prism",
            contributorsStats: []
        };
    }

    render() {
        return (
            <div className="App">
                <Container>
                    <Row>
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
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {
                                this.state.loading
                                ? <Loader/>
                                : <ContributorsStatsTable contributorsStats={this.state.contributorsStats}/>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
