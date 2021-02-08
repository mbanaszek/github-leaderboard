import {Table} from "react-bootstrap";
import React, {FunctionComponent} from "react";
import Image from 'react-bootstrap/Image'

export type ContributorStats = {
    name: string;
    avatarUrl: string;
    additions: number;
    deletions: number;
};

type ContributorsStatsTableProps = {
    contributorsStats: ContributorStats[]
}

export const ContributorsStatsTable: FunctionComponent<ContributorsStatsTableProps> = ({contributorsStats}): JSX.Element => {
    return (
        <Table striped bordered hover>
            <tbody>
            {
                contributorsStats.map((contributorStats) => (
                    <tr>
                        <td>1</td>
                        <td>{contributorStats.name}</td>
                        <td>
                            <Image src={contributorStats.avatarUrl} thumbnail />
                        </td>
                        <td>
                            <span>{contributorStats.additions} additions</span>
                            +
                            <span>{contributorStats.deletions} deletions</span>
                            =
                            <span>{contributorStats.additions + contributorStats.deletions} updates</span>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
    );
}

