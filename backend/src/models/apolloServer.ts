import { userMutationTypeDefs } from "../graphql/schema";

import { gql } from "graphql-tag";

export const typeDefs = gql`

 type Query {

 }

  type Mutation {
    ${userMutationTypeDefs}
  }
`;

export const resolvers = {
  Mutation: {},
  Query: {},
};
