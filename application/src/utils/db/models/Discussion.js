import mongoose from "mongoose";

const Discussion = mongoose.Schema({
    heading: { type: String, required: true },
    explanation: { type: String, required: true },
    tags: { type: String, required: true },
    creator: { type: String, required: true },
    mediaLinks: [String],
    upvoters: [String],
    downvoters: [String]
},
    {
        timestamps: true,
    }
)

export default mongoose.models.Discussion || mongoose.model("Discussion", Discussion);
