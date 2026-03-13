const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")




/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    console.log("RAW GEMINI DATA:", interViewReportByAi);

    // 🔥 THE FIX: Unwrap the AI data whether Gemini nested it or not!
    const aiData = interViewReportByAi.interviewReport
        || interViewReportByAi.report
        || interViewReportByAi;

    const interviewReport = await interviewReportModel.create({
        ...aiData, // Spread the unwrapped data first!
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        title: aiData.title || "Custom Interview Strategy Plan"
    })

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}

// Backend/src/controllers/interview.controller.js

const deleteInterviewReport = async (req, res) => {
    try {
        const reportId = req.params.id;

        // 🔥 FIX: Changed 'userId' to 'user' to match your MongoDB schema!
        const deletedReport = await interviewReportModel.findOneAndDelete({
            _id: reportId,
            user: req.user.id
        });

        if (!deletedReport) {
            return res.status(404).json({ message: "Report not found or unauthorized" });
        }

        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Server error while deleting report" });
    }
};

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController, deleteInterviewReport }