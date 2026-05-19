// const validateComplaint = (req, res, next) => {
//     const { name, email, title, description, category, location } = req.body;

//     if (
//         !name ||
//         !email ||
//         !title ||
//         !description ||
//         !category ||
//         !location
//     ) {
//         return res.status(400).json({
//             message: "All fields are required"
//         });
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//         return res.status(400).json({
//             message: "Invalid email"
//         });
//     }

//     next();
// };

// module.exports = validateComplaint;

const validateComplaint = (req, res, next) => {

    const {
        title,
        description,
        category,
        location
    } = req.body;

    if (
        !title ||
        !description ||
        !category ||
        !location
    ) {

        return res.status(400).json({
            message: "All fields are required"
        });
    }

    next();
};

module.exports = validateComplaint;