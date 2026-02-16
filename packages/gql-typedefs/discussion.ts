import { gql } from "graphql-tag";

export const discussionTypeDef = gql`
  type DiscussionComment {
    id: ID!
    courseId: String!
    userId: String!
    comment: String!
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    discussionComments(courseId: String!, userId: String): [DiscussionComment!]!
  }

  extend type Mutation {
    addDiscussionComment(courseId: String!, comment: String!): DiscussionComment!
  }
`;
