import { GraphQLError } from "graphql";

import {
  addDiscussionComment as addDiscussionCommentController,
  getDiscussionComments,
} from "./controller";
import { formatDiscussionComment, formatDiscussionComments } from "./formatter";

type GqlContext = {
  user?: { _id: string };
};

const getErrorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "An unexpected error occurred";

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
        throw new GraphQLError(getErrorMessage(error), {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
  },

  Mutation: {
    addDiscussionComment: async (
      _: unknown,
      { courseId, comment }: { courseId: string; comment: string },
      context: GqlContext
    ) => {
      try {
        if (!context.user?._id) {
          throw new GraphQLError("Unauthorized", {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
        const saved = await addDiscussionCommentController(
          courseId,
          context.user._id,
          comment
        );
        return formatDiscussionComment(saved);
      } catch (error: unknown) {
        if (error instanceof GraphQLError) throw error;
        throw new GraphQLError(getErrorMessage(error), {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
  },
};

export default resolvers;
