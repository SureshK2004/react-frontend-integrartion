// components/formsDetails/newFormPage.tsx
import { ArrowLeft, Download, DownloadCloudIcon, DownloadIcon, Eye, Trash2, Upload } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadLogo from "./UploadLogo";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type AnswerType =
    | "short-answer"
    | "date"
    | "time"
    | "rating"
    | "multiple-choice"
    | "paragraph"
    | "checkbox"
    | "mobile-number"
    | "email"
    | "pan"
    | "dropdown"
    | "aadhar"
    | "file-upload"
    | "geotag";

interface Question {
    label: string;
    type: AnswerType;
    extra?: string;
    options?: string[];
    required?: boolean;
}

interface Section {
    title: string;
    questions: Question[];
}

const answerTypes: { label: string; value: AnswerType }[] = [
    { label: "Short Answer", value: "short-answer" },
    { label: "Date", value: "date" },
    { label: "Time", value: "time" },
    { label: "Rating", value: "rating" },
    { label: "Multiple Choice", value: "multiple-choice" },
    { label: "Paragraph", value: "paragraph" },
    { label: "Checkbox", value: "checkbox" },
    { label: "Mobile Number", value: "mobile-number" },
    { label: "Email", value: "email" },
    { label: "PAN", value: "pan" },
    { label: "Dropdown", value: "dropdown" },
    { label: "Aadhar", value: "aadhar" },
    { label: "File Upload", value: "file-upload" },
    { label: "Geo Tag", value: "geotag" },
];


const NewFormPage: React.FC = () => {
    const navigate = useNavigate();
    const [formTitle, setFormTitle] = useState("Untitled Form");
    const [formDescription, setFormDescription] = useState("");
    const [showPreview, setShowPreview] = useState(false);

    // Inside NewFormPage component
    const [logoPreview, setLogoPreview] = useState<string>("");

    const [previewFiles, setPreviewFiles] = useState<{ [key: string]: string }>({});

    const [sections, setSections] = useState<Section[]>([
        { title: "Untitled Section", questions: [{ label: "", type: "short-answer" }] }
    ]);

    const [questions, setQuestions] = useState<Question[]>([
        { label: "form Question", type: "short-answer" },
    ]);


    const handleTypeChange = (sectionIndex: number, questionIndex: number, type: AnswerType) => {
        const newSections = [...sections];
        newSections[sectionIndex].questions[questionIndex].type = type;
        if (type !== "file-upload" && type !== "pan" && type !== "aadhar") {
            delete newSections[sectionIndex].questions[questionIndex].extra;
        }
        setSections(newSections);
    };

    const handleExtraChange = (sectionIndex: number, questionIndex: number, value: string) => {
        const newSections = [...sections];
        newSections[sectionIndex].questions[questionIndex].extra = value;
        setSections(newSections);
    };
    const addSection = () => {
        setSections([
            ...sections,
            { title: "Untitled Section", questions: [{ label: "", type: "short-answer" }] }
        ]);
    };
    const deleteSection = (sectionIdx: number) => {
        const newSections = [...sections];
        newSections.splice(sectionIdx, 1); // remove the section
        setSections(newSections);
    };

    const addQuestion = (sectionIndex: number) => {
        const newSections = [...sections];
        newSections[sectionIndex].questions.push({ label: "", type: "short-answer" });
        setSections(newSections);
    };

    const deleteQuestion = (sectionIndex: number, questionIndex: number) => {
        const newSections = [...sections];
        newSections[sectionIndex].questions.splice(questionIndex, 1);
        setSections(newSections);
    };

    const addOption = (sectionIndex: number, questionIndex: number) => {
        const newSections = [...sections];
        if (!newSections[sectionIndex].questions[questionIndex].options) newSections[sectionIndex].questions[questionIndex].options = [];
        newSections[sectionIndex].questions[questionIndex].options!.push("");
        setSections(newSections);
    };

    const handleOptionChange = (sectionIndex: number, questionIndex: number, optionIndex: number, value: string) => {
        const newSections = [...sections];
        newSections[sectionIndex].questions[questionIndex].options![optionIndex] = value;
        setSections(newSections);
    };

    const deleteOption = (sectionIndex: number, questionIndex: number, optionIndex: number) => {
        const newSections = [...sections];
        newSections[sectionIndex].questions[questionIndex].options!.splice(optionIndex, 1);
        setSections(newSections);
    };


    const renderConditionalInput = (q: Question, sectionIdx: number, questionIdx: number) => {
        switch (q.type) {
            case "date":
                return (
                    <input
                        type="date"
                        className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white mt-2"
                        value={q.extra || ""}
                        onChange={(e) => handleExtraChange(sectionIdx, questionIdx, e.target.value)}
                    />
                );

            case "time":
                return (
                    <input
                        type="time"
                        className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white mt-2"
                        value={q.extra || ""}
                        onChange={(e) => handleExtraChange(sectionIdx, questionIdx, e.target.value)}
                    />
                );

            case "paragraph":
                return <textarea rows={4} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white mt-2" placeholder="Enter paragraph..." />;
            case "rating":
                return (
                    <div className="mt-2 space-y-2">
                        <input
                            type="number"
                            min={0}
                            max={5}
                            placeholder="stars (1–5)"
                            value={q.extra || ""}
                            onChange={(e) => {
                                const value = Math.min(5, Math.max(1, Number(e.target.value) || 0)); // clamp between 1–5
                                handleExtraChange(sectionIdx, questionIdx, String(value));
                            }}
                            className="w-48 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                        />

                        {q.extra && !isNaN(Number(q.extra)) && (
                            <div className="flex space-x-1">
                                {Array.from({ length: Number(q.extra) }).map((_, i) => (
                                    <span key={i} className="text-yellow-500 text-xl">★</span>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case "short-answer":
            case "email":
            case "mobile-number":
            case "pan":
            case "aadhar":
                return (
                    <div className="flex items-center gap-4 mt-2">
                        <input
                            type="text"
                            placeholder={`Enter ${q.type.toUpperCase()}`}
                            value={q.extra || ""}
                            onChange={(e) => handleExtraChange(sectionIdx, questionIdx, e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                        />

                    </div>
                );
            case "file-upload":
                return (
                    <div className="mt-2">
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    handleExtraChange(sectionIdx, questionIdx, file.name);
                                    const key = `section-${sectionIdx}-question-${questionIdx}`;
                                    setPreviewFiles((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
                                }
                            }}
                        />

                        {previewFiles[`section-${sectionIdx}-question-${questionIdx}`] && (
                            <img
                                src={previewFiles[`section-${sectionIdx}-question-${questionIdx}`]}
                                alt="Preview"
                                className="mt-2 w-32 h-32 object-cover border rounded-md"
                            />
                        )}
                    </div>
                );
            case "checkbox":
            case "multiple-choice":
            case "dropdown":
                return (
                    <div className="space-y-2 mt-2">
                        {(q.options || []).map((opt, i) => (
                            <div key={i} className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => handleOptionChange(sectionIdx, questionIdx, i, e.target.value)}
                                    className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                                    placeholder="Option"
                                />
                                <button onClick={() => deleteOption(sectionIdx, questionIdx, i)} className="p-2 bg-red-500 text-white rounded-lg">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => addOption(sectionIdx, questionIdx)}
                            className="px-4 py-1 bg-primary text-white hover:bg-blue-600 rounded-lg"
                        >
                            + Add Option
                        </button>
                    </div>
                );
            case "geotag":
                return <div className="mt-2">Geotag input / map component here</div>;
            default:
                return null;
        }
    };
    const [downloading, setDownloading] = useState(false);

    const handleDownloadPDF = async () => {
        setDownloading(true);
        try {
            const element = document.querySelector(".form-preview-content");
            if (!element) return;

            // 1️⃣ Clone the element
            const clone = element.cloneNode(true) as HTMLElement;

            // 2️⃣ Reset problematic styles
            clone.style.position = "absolute";
            clone.style.top = "0";
            clone.style.left = "0";
            clone.style.width = "100%";
            clone.style.height = "auto";
            clone.style.overflow = "visible";
            clone.style.zIndex = "-1"; // keep it invisible
            clone.style.background = "#fff";

            // 3️⃣ Append clone off-screen (so browser paints all content)
            document.body.appendChild(clone);

            // 4️⃣ Use html2canvas on the clone
            const canvas = await html2canvas(clone, {
                scale: 1.2,
                useCORS: true,
                backgroundColor: "#ffffff",
                scrollY: 0,
                windowWidth: clone.scrollWidth,
                windowHeight: clone.scrollHeight,
            });

            // 5️⃣ Remove the clone
            document.body.removeChild(clone);

            // 6️⃣ Generate the PDF
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            let heightLeft = pdfHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight, "", "SLOW");
            heightLeft -= pdf.internal.pageSize.getHeight();

            // 7️⃣ Handle multiple pages if content exceeds one
            while (heightLeft > 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight, "", "FAST");
                heightLeft -= pdf.internal.pageSize.getHeight();
            }

            // 8️⃣ Save it
            pdf.save(`${formTitle || "form-preview"}.pdf`);
        } finally {
            setDownloading(false);
        }
    };



    return (
        <div className="container mx-auto px-4 py-6 space-y-6">
            {/* Top Bar */}
            <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Survey Form
                        </h2>
                    </div>

                    {/* Back Button and Theme Toggle */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Card */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 px-6 py-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2">
                        <Upload className="w-6 h-6 text-primary dark:text-white" />
                        <input
                            type="text"
                            placeholder="Untitled Form"
                            value={formTitle} // we'll need a state for this
                            onChange={(e) => setFormTitle(e.target.value)}
                            className="px-2 py-1 font-semibold text-lg text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </div>

                    <div>

                        <button
                            onClick={() => setShowPreview(true)}
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                            title="Preview Form"
                        >

                            <Eye className="w-5 h-5 text-gray-700 dark:text-white" />
                        </button>
                    </div>
                </div>

                {/* Upload Section */}
                <UploadLogo onPreviewChange={(url) => setLogoPreview(url)} />
                {/* Form Details */}
                <div className="space-y-4">

                    <label htmlFor="">Form Description</label>
                    <textarea
                        placeholder=" Form description..."
                        value={formDescription} // we'll need a state for this
                        onChange={(e) => setFormDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    />

                    <div className="space-y-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 px-6 py-6">
                        <h2 className="font-semibold text-lg">Form Sections</h2>
                        {sections.map((section, sIdx) => (
                            <div key={sIdx} className="space-y-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 px-6 py-6">
                                <div className="flex justify-between items-center mb-4">
                                    <input
                                        type="text"
                                        value={section.title}
                                        onChange={(e) => {
                                            const newSections = [...sections];
                                            newSections[sIdx].title = e.target.value;
                                            setSections(newSections);
                                        }}
                                        placeholder="Untitled Section"
                                        className="flex-1 px-2 py-1 font-semibold text-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                    />

                                    {/* Delete Section Button */}
                                    <button
                                        onClick={() => deleteSection(sIdx)}
                                        className="p-2 bg-red-500 text-white rounded-lg"
                                    >
                                        Delete Section
                                    </button>
                                </div>

                                {section.questions.map((q, qIdx) => (
                                    <div key={qIdx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 space-y-3">

                                        {/* Header Row */}
                                        <div className="flex justify-between items-center">
                                            <input
                                                type="text"
                                                value={q.label}
                                                onChange={(e) => {
                                                    const newSections = [...sections];
                                                    newSections[sIdx].questions[qIdx].label = e.target.value;
                                                    setSections(newSections);
                                                }}
                                                placeholder={
                                                    q.type === "short-answer" ? "Label for short answer" :
                                                        q.type === "paragraph" ? "Label for paragraph" :
                                                            q.type === "email" ? "Label for email" :
                                                                q.type === "mobile-number" ? "Label for mobile number" :
                                                                    q.type === "pan" ? "Label for PAN number" :
                                                                        q.type === "aadhar" ? "Label for Aadhar number" :
                                                                            q.type === "date" ? "Select date" :
                                                                                q.type === "time" ? "Select time" :
                                                                                    q.type === "rating" ? "Set rating scale" :
                                                                                        q.type === "checkbox" ? "Label for checkbox question" :
                                                                                            q.type === "multiple-choice" ? "Label for multiple choice question" :
                                                                                                q.type === "dropdown" ? "Label for dropdown question" :
                                                                                                    q.type === "file-upload" ? "Upload file" :
                                                                                                        q.type === "geotag" ? "Label for location/geotag" :
                                                                                                            "Label for question"
                                                }
                                                className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                                            />


                                            <select
                                                value={q.type}
                                                onChange={(e) => handleTypeChange(sIdx, qIdx, e.target.value as AnswerType)}
                                                className="w-48 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                                            >
                                                {answerTypes.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>

                                            <button
                                                onClick={() => deleteQuestion(sIdx, qIdx)}
                                                className="p-2 bg-red-500 text-white rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Input Preview / Conditional Input */}
                                        {renderConditionalInput(q, sIdx, qIdx)}

                                        {/* Required Checkbox */}
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={q.required || false}
                                                onChange={(e) => {
                                                    const newSections = [...sections];
                                                    newSections[sIdx].questions[qIdx].required = e.target.checked;
                                                    setSections(newSections);
                                                }}
                                            />
                                            <label className="text-sm text-gray-700 dark:text-gray-300">Required</label>
                                        </div>
                                    </div>
                                ))}


                                {/* Add Question inside section */}
                                <div className="flex justify-between mt-6">
                                    <Button className="bg-primary text-white hover:bg-blue-600" onClick={() => addQuestion(sIdx)}>+ Add Question</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Save Button */}
                <div className="flex justify-end space-x-4 mt-6">
                    <Button onClick={addSection} className="bg-primary text-white hover:bg-blue-600">
                        + Add Section
                    </Button>
                    <Button onClick={() => setShowPreview(true)} className="bg-primary text-white hover:bg-blue-600">Save</Button>
                </div>
            </div>

            {showPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  p-4 ">

                    <div className=" bg-white dark:bg-gray-900 w-full rounded-2xl shadow-2xl overflow-y-scroll absolute -top-6 bottom-0 left-0 right-0">
                        <div className="flex justify-end items-center gap-3">
                            <button
                                onClick={handleDownloadPDF}
                                disabled={downloading}
                                className="text-gray-700 dark:text-gray-300 text-xl hover:text-blue-600 transition disabled:opacity-50"
                                title="Download PDF"
                            >
                                {downloading ? "..." : <Download className="w-6 h-6" />}
                            </button>

                            <button
                                onClick={() => setShowPreview(false)}
                                className="text-gray-700 dark:text-gray-300 text-3xl font-bold hover:text-red-500 transition"
                            >
                                ×
                            </button>
                        </div>
                        <div className="form-preview-content">
                            {/* Header */}
                            <div className=" flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                                <div className="relative flex items-center justify-center w-full py-4 bg-white dark:bg-gray-900">
                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Logo"
                                            className="absolute left-6 w-16 h-16 rounded-md object-cover"
                                        />
                                    ) : (
                                        <div className="absolute left-6 w-16 h-16 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 text-xs border border-gray-300 dark:border-gray-600">
                                            No Logo
                                        </div>
                                    )}
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{formTitle}</h2>
                                </div>


                            </div>

                            {/* Body */}
                            <div className="px-6 py-6 space-y-8">
                                {/* Description */}
                                {formDescription && (
                                    <div>
                                        <p className="uppercase text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">Description</p>
                                        <p className="text-gray-800 dark:text-gray-200">{formDescription}</p>
                                    </div>
                                )}

                                {/* Sections */}
                                {sections.map((section, sIdx) => (
                                    <div key={sIdx} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md space-y-4">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{section.title}</h3>

                                        {/* Questions */}
                                        {section.questions.map((q, qIdx) => (
                                            <div
                                                key={qIdx}
                                                className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 space-y-3"
                                            >
                                                <p className="font-semibold text-gray-900 dark:text-white">{q.type}</p>
                                                <p className="font-semibold text-gray-900 dark:text-white">{q.label || 'untitled question'}</p>

                                                {/* === SHORT ANSWER, EMAIL, MOBILE, PAN, AADHAR === */}
                                                {["short-answer", "email", "mobile-number", "pan", "aadhar"].includes(q.type) && (
                                                    <input
                                                        type={q.type === "email" ? "email" : "text"}
                                                        placeholder={q.label}
                                                        value={q.extra || ""}
                                                        onChange={(e) => handleExtraChange(sIdx, qIdx, e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                                                    />
                                                )}

                                                {/* === PARAGRAPH === */}
                                                {q.type === "paragraph" && (
                                                    <textarea
                                                        rows={4}
                                                        placeholder={q.label}
                                                        value={q.extra || ""}
                                                        onChange={(e) => handleExtraChange(sIdx, qIdx, e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                                                    />
                                                )}

                                                {/* === DATE === */}
                                                {q.type === "date" && (
                                                    <input
                                                        type="date"
                                                        value={q.extra || ""}
                                                        onChange={(e) => handleExtraChange(sIdx, qIdx, e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                                                    />
                                                )}

                                                {/* === TIME === */}
                                                {q.type === "time" && (
                                                    <input
                                                        type="time"
                                                        value={q.extra || ""}
                                                        onChange={(e) => handleExtraChange(sIdx, qIdx, e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                                                    />
                                                )}

                                                {/* === DROPDOWN === */}
                                                {q.type === "dropdown" && q.options && (
                                                    <select
                                                        value={q.extra || ""}
                                                        onChange={(e) => handleExtraChange(sIdx, qIdx, e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                                                    >
                                                        <option value="">Select an option</option>
                                                        {q.options.map((opt, i) => (
                                                            <option key={i} value={opt}>
                                                                {opt}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}

                                                {/* === MULTIPLE CHOICE === */}
                                                {q.type === "multiple-choice" && q.options && (
                                                    <div className="flex flex-col gap-2">
                                                        {q.options.map((opt, i) => (
                                                            <label key={i} className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                                                <input
                                                                    type="radio"
                                                                    name={`section-${sIdx}-q-${qIdx}`}
                                                                    value={opt}
                                                                    checked={q.extra === opt}
                                                                    onChange={(e) => handleExtraChange(sIdx, qIdx, e.target.value)}
                                                                />
                                                                {opt}
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* === CHECKBOX === */}
                                                {q.type === "checkbox" && q.options && (
                                                    <div className="flex flex-col gap-2">
                                                        {q.options.map((opt, i) => (
                                                            <label key={i} className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={(q.extra || "").split(",").includes(opt)}
                                                                    onChange={(e) => {
                                                                        const selected = new Set((q.extra || "").split(",").filter(Boolean));
                                                                        if (e.target.checked) selected.add(opt);
                                                                        else selected.delete(opt);
                                                                        handleExtraChange(sIdx, qIdx, Array.from(selected).join(","));
                                                                    }}
                                                                />
                                                                {opt}
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* === FILE UPLOAD === */}
                                                {q.type === "file-upload" && (
                                                    <div>
                                                        <input
                                                            type="file"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    handleExtraChange(sIdx, qIdx, file.name);
                                                                    const key = `section-${sIdx}-question-${qIdx}`;
                                                                    setPreviewFiles((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
                                                                }
                                                            }}
                                                        />
                                                        {previewFiles[`section-${sIdx}-question-${qIdx}`] && (
                                                            <img
                                                                src={previewFiles[`section-${sIdx}-question-${qIdx}`]}
                                                                alt="Preview"
                                                                className="mt-2 w-24 h-24 object-cover border rounded-md"
                                                            />
                                                        )}
                                                    </div>
                                                )}

                                                {/* === RATING === */}
                                                {q.type === "rating" && (
                                                    <div className="flex gap-2">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <span
                                                                key={i}
                                                                onClick={() => handleExtraChange(sIdx, qIdx, String(i + 1))}
                                                                className={`cursor-pointer text-2xl ${Number(q.extra) > i ? "text-yellow-500" : "text-gray-400"
                                                                    }`}
                                                            >
                                                                ★
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                    </div>
                                ))}

                                <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Button
                                        onClick={() => {
                                            alert("Form submitted!");
                                            setShowPreview(false);
                                        }}
                                        className="bg-primary text-white hover:bg-blue-600 px-6 py-2 rounded-lg shadow-md"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


 
        </div>
    );
};

export default NewFormPage;
