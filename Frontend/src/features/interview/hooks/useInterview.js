import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"
import axios from "axios" // 🔥 FIX: Added the missing axios import!
import toast from 'react-hot-toast';


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)

            // 🔥 Add success toast here
            toast.success("Interview strategy generated successfully!");

        } catch (error) {
            // 🔥 This line extracts the exact custom message from our backend!
            const errorMessage = error.response?.data?.message || "Failed to generate strategy. Please try again.";

            // Show the error in the toast
            toast.error(errorMessage);

            return null;
        } finally {
            setLoading(false);
        }
        return response?.interviewReport
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response?.interviewReport
    }

    const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response?.interviewReports
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteReport = async (reportId) => {
        // 🔥 Use toast.promise to handle loading, success, and error automatically!
        const deletePromise = async () => {
            const token = localStorage.getItem("token");
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/interview/${reportId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            setReports(prevReports => prevReports.filter(r => r._id !== reportId));
        };

        toast.promise(deletePromise(), {
            loading: 'Deleting plan...',
            success: 'Plan deleted successfully!',
            error: 'Could not delete the plan.'
        });
    };

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [interviewId])


    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf, handleDeleteReport }

}