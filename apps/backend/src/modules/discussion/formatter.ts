export interface FormattedDiscussionComment {
  id: string;
  courseId: string;
  userId: string;
  comment: string;
  createdAt: Date | string | undefined;
  updatedAt: Date | string | undefined;
}

type DiscussionCommentInput = {
  _id: unknown;
  courseId: string;
  userId: string;
  comment: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

const toIdString = (id: unknown): string => {
  if (id == null) return "";
  if (typeof id === "string") return id;
  if (typeof id === "object" && "toString" in id) return String(id);
  return String(id);
};

export const formatDiscussionComment = (
  doc: DiscussionCommentInput
): FormattedDiscussionComment => {
  return {
    id: toIdString(doc._id),
    courseId: doc.courseId,
    userId: doc.userId,
    comment: doc.comment,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

export const formatDiscussionComments = (
  docs: DiscussionCommentInput[]
): FormattedDiscussionComment[] => {
  return docs.map(formatDiscussionComment);
};
