import mongoose from "mongoose";

const LinkSchema = mongoose.Schema({
    
    originalUrl: {
        type: String,
        required: true,
    },
    clicks: [
        {
            insertedAt: {
                type: Date,
                default: Date.now,
            },
            ipAddress: {
                type: String,
                required: true,
            },
            targetParamValue:String
        },
    ],
    targetParamName:String,
        targetValues: [
            {
                name: String,
                value: String,
            }
        ],
    
});
const Link = mongoose.model("links", LinkSchema);

export { Link, LinkSchema };

