import { DiscussionModel } from "@repo/common/models";

export const getDiscussionComments = async (
  courseId: string,
  userId?: string
) => {
  const filter: { courseId: string; userId?: string } = { courseId };

  if (userId !== undefined) {
    filter.userId = userId;
  }

  return DiscussionModel.find(filter).sort({ createdAt: -1 }).lean();
};

export const addDiscussionComment = async (
  courseId: string,
  userId: string,
  comment: string
) => {
  const doc = new DiscussionModel({ courseId, userId, comment });
  return doc.save();
};
