const analyzeComplaint = require("../services/aiService");

const analyze = async (req, res) => {
    const { description, category } = req.body;

    const result = await analyzeComplaint(description, category);

    res.json(result);
};

module.exports = {
    analyze
};