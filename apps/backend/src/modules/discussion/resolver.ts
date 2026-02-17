import { GraphQLError } from "graphql";

import {
  addDiscussionComment as addDiscussionCommentController,
  getDiscussionComments,
} from "./controller";
import { formatDiscussionComment, formatDiscussionComments } from "./formatter";

const resolvers = {
  Query: {
    discussionComments: async (
      _: unknown,
      { courseId, userId }: { courseId: string; userId?: string }
    ) => {
      try {
        const result = await getDiscussionComments(courseId, userId);
        return formatDiscussionComments(result);
      } catch (error: unknown) {
        if (error instanceof GraphQLError) throw error;
        throw new GraphQLError(
          typeof error === "object" && error !== null && "message" in error
            ? String((error as any).message)
            : "An unexpected error occurred",
          { extensions: { code: "INTERNAL_SERVER_ERROR" } }
        );
      }
    },
  },

  Mutation: {
    addDiscussionComment: async (
      _: unknown,
      { courseId, comment }: { courseId: string; comment: string },
      context: any
    ) => {
      try {
        const saved = await addDiscussionCommentController(
          context,
          courseId,
          comment
        );
        return formatDiscussionComment(saved);
      } catch (error: unknown) {
        if (error instanceof GraphQLError) throw error;
        throw new GraphQLError(
          typeof error === "object" && error !== null && "message" in error
            ? String((error as any).message)
            : "An unexpected error occurred",
          { extensions: { code: "INTERNAL_SERVER_ERROR" } }
        );
      }
    },
  },
};

export default resolvers;
