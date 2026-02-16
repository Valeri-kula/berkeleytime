import mongoose, { InferSchemaType, Schema } from "mongoose";

const discussionSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    courseId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

discussionSchema.index({ courseId: 1, createdAt: -1 });

export const DiscussionModel = mongoose.model("discussion", discussionSchema);
export type DiscussionType = InferSchemaType<typeof discussionSchema>;
