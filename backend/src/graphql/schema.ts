export const movieTypeDefs = `
  type User {
    name: String
    email: String
    password: String
    role: Int
  }

  input loginInput {
    email: String
    password: String
  }

  input signupInput {
    name: String
    email: String
    password: String
  }
`;

export const userMutationTypeDefs = `
  signup(input: signupInput): String
  login(input: loginInput): String
`;

export const movieMutationTypeDefs = `
  createPoll(input: createPollInput): Poll
`;

export const userQueriesTypeDefs = `
  userVote(input: voteInput): Vote
`;

export const movieQueriesTypeDefs = `
`;

export const schemaTypeDefs = `
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
