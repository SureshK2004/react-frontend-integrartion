// components/manageDetail/subPages/OnboardingFormStandalone.tsx
import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Check,
  Eye,
  EyeOff,
  Upload,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import OnboardingFormHead from "./onboardingUserList/onboardingFormHead";

interface FamilyMember {
  name: string;
  dob: string;
  gender: string;
  relationship: string;
  aadhaar: string;
}

interface FormData {
  // ----- Personal -----
  aadhaar: string;
  dob: string;
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
  email: string;
  maritalStatus: string;

  // ----- Work -----
  userRole: string;
  bankName: string;
  designation: string;
  educationalQualification: string;
  accountNumber: string;
  department: string;
  previousExperience: string;
  ifscCode: string;
  salary: string;
  uanNumber: string;
  accountHolderName: string;
  esiNumber: string;
  entity: string;
  shiftTime: string;
  branch: string;
  zone: string;
  dateOfJoining: string;
  employeeId: string;
  reportingManager: string;

  // ----- Contact -----
  communicationAddress: string;
  username: string;
  password: string;
  contactNumber: string;
  emergencyContactNumber: string;

  // ----- Documents -----
  userImage: File | null;
  aadhaarFront: File | null;
  aadhaarBack: File | null;
  panNumber: string;
  voterId: string;
}

const OnboardingFormStandalone: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const defaultFormData: FormData = {
    aadhaar: "",
    dob: "",
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    email: "",
    maritalStatus: "",
    userRole: "",
    bankName: "",
    designation: "",
    educationalQualification: "",
    accountNumber: "",
    department: "",
    previousExperience: "",
    ifscCode: "",
    salary: "",
    uanNumber: "",
    accountHolderName: "",
    esiNumber: "",
    entity: "",
    shiftTime: "",
    branch: "",
    zone: "",
    dateOfJoining: "",
    employeeId: "",
    reportingManager: "",
    communicationAddress: "",
    username: "",
    password: "",
    contactNumber: "",
    emergencyContactNumber: "",
    userImage: null,
    aadhaarFront: null,
    aadhaarBack: null,
    panNumber: "",
    voterId: "",
  };

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  const steps = [
    { number: 1, title: "Personal Details" },
    { number: 2, title: "Work Details" },
    { number: 3, title: "Contact Details" },
    { number: 4, title: "Document Upload" },
  ];

  useEffect(() => {
    setFormData(defaultFormData);
    setFamilyMembers([]);
    setCurrentStep(1);
  }, []);

  const handleInputChange = (
    field: keyof FormData,
    value: string | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof FormData, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSave = () => {
    console.log("Form Data:", formData);
    console.log("Family Members:", familyMembers);
    alert("User onboarded successfully!");
    navigate("/mange/onboarding");
  };

  const handleAddFamilyMember = () => {
    const newMember: FamilyMember = {
      name: "",
      dob: "",
      gender: "",
      relationship: "",
      aadhaar: "",
    };
    setFamilyMembers((prev) => [...prev, newMember]);
  };

  const handleDeleteFamilyMember = (index: number) => {
    setFamilyMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFamilyMemberChange = (
    index: number,
    field: keyof FamilyMember,
    value: string
  ) => {
    setFamilyMembers((prev) =>
      prev.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      )
    );
  };

  /* ---------- Render Helpers ---------- */
  const renderFileInput = (
    label: string,
    field: keyof FormData,
    accept?: string
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <Upload className="w-4 h-4" />
          Choose File
          <input
            type="file"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              // optional: limit size to 5 MB
              if (file && file.size > 5 * 1024 * 1024) {
                alert("File size must be ≤ 5 MB");
                return;
              }
              handleFileChange(field, file);
            }}
            className="hidden"
          />
        </label>
        <span className="text-sm text-gray-600">
          {formData[field] ? (formData[field] as File).name : "No file chosen"}
        </span>
      </div>
      <p className="mt-1 text-xs text-gray-500">5 MB size limit</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <OnboardingFormHead />

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Steps Header */}
          <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold transition-all ${
                        step.number === currentStep
                          ? "bg-primary text-white shadow-lg"
                          : step.number < currentStep
                          ? "bg-green-100 text-green-600 border-2 border-green-200"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.number < currentStep ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`text-sm mt-2 font-medium text-center ${
                        step.number === currentStep
                          ? "text-primary font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 rounded-full ${
                        step.number < currentStep ? "bg-green-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* ==== STEP 1 – PERSONAL ==== */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Personal Information
                  </h2>
                  <p className="text-gray-600">
                    Enter basic personal details and family information.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aadhaar Number
                      </label>
                      <input
                        type="text"
                        value={formData.aadhaar}
                        onChange={(e) =>
                          handleInputChange("aadhaar", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Aadhaar Number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) =>
                          handleInputChange("dob", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age (Auto)
                      </label>
                      <input
                        type="text"
                        value={formData.age}
                        disabled
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Group
                      </label>
                      <select
                        value={formData.bloodGroup}
                        onChange={(e) =>
                          handleInputChange("bloodGroup", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Official Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="employee@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Marital Status
                      </label>
                      <div className="flex gap-6 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="maritalStatus"
                            value="Single"
                            checked={formData.maritalStatus === "Single"}
                            onChange={(e) =>
                              handleInputChange(
                                "maritalStatus",
                                e.target.value
                              )
                            }
                            className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Single</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="maritalStatus"
                            value="Married"
                            checked={formData.maritalStatus === "Married"}
                            onChange={(e) =>
                              handleInputChange(
                                "maritalStatus",
                                e.target.value
                              )
                            }
                            className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Married</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Family Members */}
                <div className="border-t border-gray-200 pt-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Family Details
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Add family member information (optional)
                      </p>
                    </div>
                    <button
                      onClick={handleAddFamilyMember}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
                    >
                      <Plus className="w-4 h-4" />
                      Add Member
                    </button>
                  </div>

                  {familyMembers.length > 0 && (
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                      <table className="w-full min-w-[600px]">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Actions
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              DOB
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Gender
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Relationship
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Aadhaar No
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {familyMembers.map((member, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <button className="text-gray-400 hover:text-blue-600 transition-colors p-1">
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteFamilyMember(index)
                                    }
                                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  value={member.name}
                                  onChange={(e) =>
                                    handleFamilyMemberChange(
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                  placeholder="Name"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="date"
                                  value={member.dob}
                                  onChange={(e) =>
                                    handleFamilyMemberChange(
                                      index,
                                      "dob",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <select
                                  value={member.gender}
                                  onChange={(e) =>
                                    handleFamilyMemberChange(
                                      index,
                                      "gender",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                >
                                  <option value="">Gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  value={member.relationship}
                                  onChange={(e) =>
                                    handleFamilyMemberChange(
                                      index,
                                      "relationship",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                  placeholder="Relationship"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  value={member.aadhaar}
                                  onChange={(e) =>
                                    handleFamilyMemberChange(
                                      index,
                                      "aadhaar",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                  placeholder="Aadhaar"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ==== STEP 2 – WORK DETAILS ==== */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Work Details
                  </h2>
                  <p className="text-gray-600">Enter work details</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        User role
                      </label>
                      <input
                        type="text"
                        value={formData.userRole}
                        onChange={(e) =>
                          handleInputChange("userRole", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="User"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bank name
                      </label>
                      <input
                        type="text"
                        value={formData.bankName}
                        onChange={(e) =>
                          handleInputChange("bankName", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="XXX SSB OOO"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation
                      </label>
                      <select
                        value={formData.designation}
                        onChange={(e) =>
                          handleInputChange("designation", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select designation</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Manager">Manager</option>
                        {/* add more */}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Educational qualification
                      </label>
                      <input
                        type="text"
                        value={formData.educationalQualification}
                        onChange={(e) =>
                          handleInputChange(
                            "educationalQualification",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="MCA"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={formData.accountNumber}
                        onChange={(e) =>
                          handleInputChange("accountNumber", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="111222223333"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) =>
                          handleInputChange("department", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select department</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        {/* add more */}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Previous Experience
                      </label>
                      <input
                        type="text"
                        value={formData.previousExperience}
                        onChange={(e) =>
                          handleInputChange(
                            "previousExperience",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter previous experience"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IFSC code
                      </label>
                      <input
                        type="text"
                        value={formData.ifscCode}
                        onChange={(e) =>
                          handleInputChange("ifscCode", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="DHFOGHV087"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Salary
                      </label>
                      <input
                        type="text"
                        value={formData.salary}
                        onChange={(e) =>
                          handleInputChange("salary", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.0"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UAN Number
                      </label>
                      <input
                        type="text"
                        value={formData.uanNumber}
                        onChange={(e) =>
                          handleInputChange("uanNumber", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123456789101"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account holder name
                      </label>
                      <input
                        type="text"
                        value={formData.accountHolderName}
                        onChange={(e) =>
                          handleInputChange(
                            "accountHolderName",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="AAAAAA"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ESI Number
                      </label>
                      <input
                        type="text"
                        value={formData.esiNumber}
                        onChange={(e) =>
                          handleInputChange("esiNumber", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1124567891011"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Entity
                      </label>
                      <select
                        value={formData.entity}
                        onChange={(e) =>
                          handleInputChange("entity", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select entity</option>
                        <option value="Corp">Corp</option>
                        <option value="Branch">Branch</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shift time
                      </label>
                      <select
                        value={formData.shiftTime}
                        onChange={(e) =>
                          handleInputChange("shiftTime", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select shift time</option>
                        <option value="Day">Day</option>
                        <option value="Night">Night</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Branch
                      </label>
                      <select
                        value={formData.branch}
                        onChange={(e) =>
                          handleInputChange("branch", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select branch</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zone
                      </label>
                      <select
                        value={formData.zone}
                        onChange={(e) =>
                          handleInputChange("zone", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select zone</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Joining *
                      </label>
                      <input
                        type="date"
                        value={formData.dateOfJoining}
                        onChange={(e) =>
                          handleInputChange("dateOfJoining", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employee id
                      </label>
                      <input
                        type="text"
                        value={formData.employeeId}
                        onChange={(e) =>
                          handleInputChange("employeeId", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="DM 0001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reporting Manager
                      </label>
                      <input
                        type="text"
                        value={formData.reportingManager}
                        onChange={(e) =>
                          handleInputChange(
                            "reportingManager",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Select manager"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==== STEP 3 – CONTACT DETAILS ==== */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Contact Details
                  </h2>
                  <p className="text-gray-600">
                    Enter address and contact details
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Communication Address
                      </label>
                      <textarea
                        rows={3}
                        value={formData.communicationAddress}
                        onChange={(e) =>
                          handleInputChange(
                            "communicationAddress",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="XXXX SSB OOO"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        User name
                      </label>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Number *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-600 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                          +
                        </span>
                        <input
                          type="tel"
                          value={formData.contactNumber}
                          onChange={(e) =>
                            handleInputChange("contactNumber", e.target.value)
                          }
                          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="123456789"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="........"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Number
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-600 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                          +
                        </span>
                        <input
                          type="tel"
                          value={formData.emergencyContactNumber}
                          onChange={(e) =>
                            handleInputChange(
                              "emergencyContactNumber",
                              e.target.value
                            )
                          }
                          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="123456789"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==== STEP 4 – DOCUMENT UPLOAD ==== */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Document Upload
                  </h2>
                  <p className="text-gray-600">
                    Upload required documents
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderFileInput(
                    "Upload Image",
                    "userImage",
                    "image/*"
                  )}

                  {renderFileInput(
                    "Upload Aadhaar front",
                    "aadhaarFront",
                    "image/*,.pdf"
                  )}

                  {renderFileInput(
                    "Upload Aadhaar back",
                    "aadhaarBack",
                    "image/*,.pdf"
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PAN number
                    </label>
                    <input
                      type="text"
                      value={formData.panNumber}
                      onChange={(e) =>
                        handleInputChange("panNumber", e.target.value)
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voter ID
                    </label>
                    <input
                      type="text"
                      value={formData.voterId}
                      onChange={(e) =>
                        handleInputChange("voterId", e.target.value)
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0123456789"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-gray-700">
                  Step {currentStep} of {steps.length}
                </span>
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevious}
                    className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Back
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {currentStep === steps.length ? (
                  <>
                    <button
                      onClick={() => navigate(-1)}
                      className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
                  >
                    Next Step
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFormStandalone;