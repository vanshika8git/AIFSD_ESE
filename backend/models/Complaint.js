const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },

    priority: {
        type: String,
        default: "Medium"
    },

    department: {
        type: String,
        default: ""
    },

    aiSummary: {
        type: String,
        default: ""
    },

    autoResponse: {
        type: String,
        default: ""
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Complaint", complaintSchema);