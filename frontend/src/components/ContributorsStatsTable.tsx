import {Table} from "react-bootstrap";
import React, {FunctionComponent} from "react";
import Image from 'react-bootstrap/Image'
import {ContributorStats} from "../fetchRepositoryContributorsStatistics";

interface ContributorsStatsTableProps {
    contributorsStats: ContributorStats[]
}

export const ContributorsStatsTable: FunctionComponent<ContributorsStatsTableProps> = ({contributorsStats}): JSX.Element => {

    const sortedContributedStats = sortContributorsStatsByHighestTotalChanges(contributorsStats);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th></th>
                    <th>Name</th>
                    <th></th>
                    <th></th>
                    <th className={"text-right"}>Total score</th>
                </tr>
            </thead>
            <tbody>
            {
                sortedContributedStats.length === 0
                ?
                    <tr>
                        <td colSpan={6}>Please provide a valid GitHub repository URL.</td>
                    </tr>
                : sortedContributedStats.map((contributorStats, index) => (
                    <tr key={contributorStats.name}>
                        <td>{index + 1}.</td>
                        <td>
                            <Image src={contributorStats.avatarUrl} thumbnail width={"150 px"}/>
                        </td>
                        <td>{contributorStats.name}</td>
                        <td className={"text-right"}>
                            <span className={"text-success"}>+ {contributorStats.additions} additions</span>
                        </td>
                        <td className={"text-right"}>
                            <span className={"text-danger"}>- {contributorStats.deletions} deletions</span>
                        </td>
                        <td className={"text-right"}>
                            <span className={"text-info"}>{contributorStats.additions + contributorStats.deletions} updates</span>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
    );
}

const sortContributorsStatsByHighestTotalChanges = (stats: ContributorStats[]): ContributorStats[] => {
    return stats.slice().sort((
        firstStats,
        secondStats
    ) => {
        const firstTotalChanges = firstStats.additions + firstStats.deletions;
        const secondTotalChanges = secondStats.additions + secondStats.deletions;
        return secondTotalChanges - firstTotalChanges;
    })
}

