import { expect } from "chai";

import { getRepositoryDetails } from "../repositoryDetails";

test.each([
    ['', null],
    ['abc', null],
    ['abc d', null],
    ['owner/name', { owner: 'owner', name: 'name'}],
    ['https://github.com/mbanaszek/github-leaderboard', { owner: 'mbanaszek', name: 'github-leaderboard'}],
    ['http://github.com/mbanaszek/github-leaderboard', { owner: 'mbanaszek', name: 'github-leaderboard'}],
    ['https://github.com/mbanaszek/github-leaderboard/issues', { owner: 'mbanaszek', name: 'github-leaderboard'}]
])(
    "Get repository details using URL (given URL: '%s').",
    (givenRepositoryURL, expectedRepositoryDetails) => {

    // When & Then
    expect(getRepositoryDetails(givenRepositoryURL)).to.be.deep.equal(expectedRepositoryDetails);
});
