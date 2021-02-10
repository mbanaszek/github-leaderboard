import React from "react";
import TestRenderer from "react-test-renderer";

import {RepositoryURLInput} from "../RepositoryURLInput";


describe("Render repository URL field", () => {

    test("Empty field.", () => {
        // When
        const component = TestRenderer.create(
            <RepositoryURLInput repositoryURL={''} onRepositoryURLUpdate={()=>{}} />
        );

        // Then
        expect(component.toJSON()).toMatchSnapshot();
    });

    test("With value.", () => {
        // When
        const component = TestRenderer.create(
            <RepositoryURLInput repositoryURL={'https://github.com/mbanaszek/github-leaderboard'} onRepositoryURLUpdate={()=>{}} />
        );

        // Then
        expect(component.toJSON()).toMatchSnapshot();
    });
});
