// const express = require("express");

// const router = express.Router();

// const {
//     addComplaint,
//     getComplaints,
//     updateComplaintStatus,
//     searchComplaint
// } = require("../controllers/complaintController");

// const protect = require("../middleware/authMiddleware");

// const validateComplaint = require("../middleware/validateMiddleware");

// router.post("/", protect, validateComplaint, addComplaint);

// router.get("/", protect, getComplaints);

// router.put("/:id", protect, updateComplaintStatus);

// router.get("/search/location", protect, searchComplaint);

// module.exports = router;

const express = require("express");

const router = express.Router();

const {
    addComplaint,
    getComplaints,
    updateComplaintStatus,
    searchComplaint,
    filterByCategory
} = require("../controllers/complaintController");

const protect = require("../middleware/authMiddleware");

const validateComplaint = require("../middleware/validateMiddleware");


// ================= ADD COMPLAINT =================

router.post(
    "/",
    protect,
    validateComplaint,
    addComplaint
);


// ================= GET ALL COMPLAINTS =================

router.get(
    "/",
    protect,
    getComplaints
);


// ================= UPDATE STATUS =================
// TOKEN REQUIRED

router.put(
    "/:id",
    protect,
    updateComplaintStatus
);


// ================= SEARCH BY LOCATION =================

router.get(
    "/search/location",
    protect,
    searchComplaint
);

// ================= FILTER BY CATEGORY =================

router.get(
    "/filter/category",
    protect,
    filterByCategory
);

module.exports = router;