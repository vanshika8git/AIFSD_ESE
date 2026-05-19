// const Complaint = require("../models/Complaint");
// const analyzeComplaint = require("../services/aiService");

// const addComplaint = async (req, res) => {
//     const {
//         name,
//         email,
//         title,
//         description,
//         category,
//         location
//     } = req.body;

//     const aiResult = await analyzeComplaint(description, category);

//     const complaint = await Complaint.create({
//         name,
//         email,
//         title,
//         description,
//         category,
//         location,
//         priority: aiResult.priority,
//         department: aiResult.department,
//         aiSummary: aiResult.summary,
//         autoResponse: aiResult.autoResponse
//     });

//     res.status(201).json(complaint);
// };

// const getComplaints = async (req, res) => {
//     const complaints = await Complaint.find();

//     res.json(complaints);
// };

// const updateComplaintStatus = async (req, res) => {
//     const complaint = await Complaint.findById(req.params.id);

//     if (!complaint) {
//         return res.status(404).json({
//             message: "Complaint not found"
//         });
//     }

//     complaint.status = req.body.status || complaint.status;

//     const updatedComplaint = await complaint.save();

//     res.json(updatedComplaint);
// };

// const searchComplaint = async (req, res) => {
//     const location = req.query.location;

//     const complaints = await Complaint.find({
//         location: {
//             $regex: location,
//             $options: "i"
//         }
//     });

//     res.json(complaints);
// };

// module.exports = {
//     addComplaint,
//     getComplaints,
//     updateComplaintStatus,
//     searchComplaint
// };

const Complaint = require("../models/Complaint");

const analyzeComplaint = require("../services/aiService");


// ================= ADD COMPLAINT =================

const addComplaint = async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            location
        } = req.body;

        // GET USER DATA FROM TOKEN

        const name = req.user.name;

        const email = req.user.email;


        // AI ANALYSIS

        const aiResult = await analyzeComplaint(
            description,
            category
        );


        // CREATE COMPLAINT

        const complaint = await Complaint.create({

            name,
            email,
            title,
            description,
            category,
            location,

            priority: aiResult.priority,

            department: aiResult.department,

            aiSummary: aiResult.summary,

            autoResponse: aiResult.autoResponse
        });


        res.status(201).json({
            message: "Complaint Added Successfully",
            complaint
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};



// ================= GET ALL COMPLAINTS =================

const getComplaints = async (req, res) => {

    try {

        const complaints = await Complaint.find();

        res.status(200).json(complaints);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};



// ================= UPDATE STATUS =================

const updateComplaintStatus = async (req, res) => {

    try {

        const complaintId = req.params.id;

        const complaint = await Complaint.findById(complaintId);

        if (!complaint) {

            return res.status(404).json({
                message: "Complaint Not Found"
            });
        }

        // UPDATE STATUS

        complaint.status = req.body.status;

        await complaint.save();

        // RETURN ONLY STATUS

        res.status(200).json({
            message: "Status Updated Successfully",
            updatedStatus: complaint.status
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};



// ================= SEARCH BY LOCATION =================

const searchComplaint = async (req, res) => {

    try {

        const location = req.query.location;

        const complaints = await Complaint.find({

            location: {
                $regex: location,
                $options: "i"
            }
        });

        res.status(200).json(complaints);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// ================= FILTER BY CATEGORY =================

const filterByCategory = async (req, res) => {

    try {

        const category = req.query.category;

        const complaints = await Complaint.find({

            category: {
                $regex: category,
                $options: "i"
            }
        });

        res.status(200).json(complaints);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// ================= DELETE COMPLAINT =================

const deleteComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint Not Found"
            });
        }

        await Complaint.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Complaint Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addComplaint,
    getComplaints,
    updateComplaintStatus,
    searchComplaint,
    filterByCategory,
    deleteComplaint
};