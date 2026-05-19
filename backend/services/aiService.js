// const analyzeComplaint = async (description, category) => {

//     let priority = "Medium";
//     let department = "General Department";

//     const text = description.toLowerCase();

//     if (text.includes("fire") || text.includes("electric")) {
//         priority = "High";
//     }

//     if (text.includes("water")) {
//         department = "Water Department";
//     } else if (text.includes("garbage")) {
//         department = "Sanitation Department";
//     } else if (text.includes("electric")) {
//         department = "Electricity Department";
//     }

//     const summary = description.substring(0, 60);

//     const autoResponse = `Your complaint regarding ${category} has been registered successfully.`;

//     return {
//         priority,
//         department,
//         summary,
//         autoResponse
//     };
// };

// module.exports = analyzeComplaint;

const axios = require("axios");

const analyzeComplaint = async (description, category) => {

    try {

        // SHORT + TOKEN OPTIMIZED PROMPT

        const prompt = `

Analyze this complaint and perform all tasks.

Complaint Category:
${category}

Complaint Description:
${description}

Tasks:
1. Detect complaint priority
2. Suggest responsible department
3. Generate a short 1-2 line summary
4. Generate a professional 1-2 line response

Rules:
- Electricity/fire/danger -> High priority
- Water leakage/road damage -> Medium priority
- Garbage/sanitation -> Low priority
- Unknown complaints -> intelligently predict department

Return ONLY valid JSON:

{
  "priority": "",
  "department": "",
  "summary": "",
  "autoResponse": ""
}

`;

        const response = await axios.post(

            "https://openrouter.ai/api/v1/chat/completions",

            {
                model: "openai/gpt-4o-mini",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                // CONTROL TOKEN USAGE

                max_tokens: 140,

                temperature: 0.3
            },

            {
                headers: {

                    Authorization:
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type": "application/json"
                }
            }
        );

        // AI RESPONSE

        const aiText =
            response.data.choices[0].message.content;

        // REMOVE ```json BLOCKS

        const cleanedText = aiText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        // PARSE JSON

        const parsedData = JSON.parse(cleanedText);

        // ENSURE ALL FIELDS EXIST

        return {

            priority:
                parsedData.priority || "Medium",

            department:
                parsedData.department || "General Department",

            summary:
                parsedData.summary ||
                (
                    description.length > 100
                        ? description.substring(0, 100) + "..."
                        : description
                ),

            autoResponse:
                parsedData.autoResponse ||
                "Your complaint has been registered successfully. The concerned department will review it shortly."
        };

    } catch (error) {

        console.log("AI ERROR:", error.message);

        // FALLBACK RESPONSE

        return {

            priority: "Medium",

            department: "General Department",

            summary:
                description.length > 100
                    ? description.substring(0, 100) + "..."
                    : description,

            autoResponse:
                "Your complaint has been registered successfully. The concerned department will review it shortly."
        };
    }
};

module.exports = analyzeComplaint;