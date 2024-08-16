import mongoose from "mongoose";

const User = mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    qualification: { type: String, required: true },
    student: { type: Boolean, default: false },
    country: { type: String, required: true },
    witness: [String],
    verifyIdFlag: { type: Boolean, default: true },
    identity: { type: String, required: true },
    reports: { type: Number, default: 0 }
},
    {
        timestamps: true,
    }
)

export default mongoose.models.User || mongoose.model("User", User);
