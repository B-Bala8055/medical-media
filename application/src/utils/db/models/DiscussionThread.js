import mongoose from "mongoose";

const DiscussionThread = mongoose.Schema({
    discussionId: { type: String, required: true },
    threadId: { type: Number, required: true },
    underId: { type: String, default: 'main' },
    creator: { type: String, required: true },
    comment: { type: String, required: true },
    mediaLinks: [String],
    upvoters: [String],
    downvoters: [String]
},
    {
        timestamps: true,
    }
)

export default mongoose.models.DiscussionThread || mongoose.model("DiscussionThread", DiscussionThread);
