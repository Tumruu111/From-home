import { gql } from "graphql-tag";

import {
  movieTypeDefs,
  userMutationTypeDefs,
  movieMutationTypeDefs,
  userQueriesTypeDefs,
  movieQueriesTypeDefs,
} from "../graphql/schema";

import { userMutations } from "../graphql/resolvers/userMutations";

export const typeDefs = gql`
  ${movieTypeDefs}

  type Query {
    ${userQueriesTypeDefs}
    ${movieQueriesTypeDefs}
  }

  type Mutation {
    ${userMutationTypeDefs}
    ${movieMutationTypeDefs}
  }
`;

export const resolvers = {
  Query: {},

  Mutation: {
    ...userMutations,
  },
};
