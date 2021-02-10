import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import TestRenderer, { act } from "react-test-renderer";

import { ContributorsStatsTable } from "../ContributorsStatsTable";
import {
    ContributorStats,
    createContributorsStatisticsQuery
} from "../../graphql/contributorsStatistics";
import { Maybe } from "../../functional/maybe";
import { isNil } from "../../functional/logic";
import { RepositoryDetails } from "../../graphql/repositoryDetails";

describe("Rendering table", () => {

    const repositoryDetails: RepositoryDetails = {
        name: "dummy-owner",
        owner: "dummy-name"
    };

    test("Loading.", async () => {
        // Given
        const apolloClientMock = createApolloMock(repositoryDetails, [], null, null);

        // When
        const component = renderTable(apolloClientMock, repositoryDetails);

        // Then
        await waitForRender();
        expect(component.toJSON()).toMatchSnapshot();
    });

    test("No results.", async () => {
        // Given
        const apolloClientMock = createApolloMock(repositoryDetails, [], null, null);

        // When
        const component = renderTable(apolloClientMock, repositoryDetails);

        // Then
        await waitForRender();
        expect(component.toJSON()).toMatchSnapshot();
    });

    test("Results.", async () => {
        // Given
        const dummyContributorsStats: ContributorStats[] = [
            { name: "dummy-name-1", avatarUrl: "http://dummy.avatar/url-1", additions: 1, deletions: 2 },
            { name: "dummy-name-2", avatarUrl: "http://dummy.avatar/url-2", additions: 3, deletions: 4 }
        ];
        const apolloClientMock = createApolloMock(repositoryDetails, dummyContributorsStats, null, null);

        // When
        const component = renderTable(apolloClientMock, repositoryDetails);

        // Then
        await waitForRender();
        expect(component.toJSON()).toMatchSnapshot();
    });

    test("Error message (like repository not found).", async () => {
        // Given
        const apolloClientMock = createApolloMock(
            repositoryDetails,
            null,
            [ { errorName: "RepositoryNotFound", statusCode: 404, message: "Repository not found." }],
            null
        );

        // When
        const component = renderTable(apolloClientMock, repositoryDetails);

        // Then
        await waitForRender();
        expect(component.toJSON()).toMatchSnapshot();
    });

    test("Network error message.", async () => {
        // Given
        const apolloClientMock = createApolloMock(
            repositoryDetails,
            null,
            null,
            "Network error."
        );

        // When
        const component = renderTable(apolloClientMock, repositoryDetails);

        // Then
        await waitForRender();
        expect(component.toJSON()).toMatchSnapshot();
    });
});

const createApolloMock = (repositoryDetails: RepositoryDetails, contributorsStats: Maybe<ContributorStats[]>, errors: Maybe<ApolloResponseErrors[]>, networkError: Maybe<string>): any => {
    return {
        request: {
            query: createContributorsStatisticsQuery(repositoryDetails)
        },
        ... isNil(errors) ? {} : { errors: errors },
        ... isNil(networkError) ? {} : { error: new Error(networkError) },
        result: {
            data: {
                contributorsStats: contributorsStats
            },
        },
    };
};

const renderTable = (apolloClientMock: any, repositoryDetails: RepositoryDetails) => TestRenderer.create(
    <MockedProvider mocks={[apolloClientMock]} addTypename={false}>
        <ContributorsStatsTable repositoryDetails={repositoryDetails} />
    </MockedProvider>,
);

const waitForRender = async () => act(() => {
    return new Promise(resolve => {
        setTimeout(resolve, 0);
    });
});

type ApolloResponseErrors = {
    "errorName": string;
    "statusCode": number;
    "message": string;
}