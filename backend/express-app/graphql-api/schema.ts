import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Query {
    contributorsStats(repositoryOwner: String!, repositoryName: String!): [ContributorStats]
  }

  type ContributorStats {
    name: String
    avatarUrl: String
    additions: Int
    deletions: Int
  }
`);