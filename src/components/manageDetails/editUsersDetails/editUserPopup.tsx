import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  Eye, 
  EyeOff, 
  Upload 
} from 'lucide-react';

interface User {
  employeeId?: string;
  name?: string;
  aadhaar?: string;
  dob?: string;
  age?: string;
  gender?: string;
  bloodGroup?: string;
  email?: string;
  maritalStatus?: string;
}

interface EditUserPopupProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (user: User) => void;
}

interface FamilyMember {
  id: number;
  name: string;
  dob: string;
  gender: string;
  relationship: string;
  aadhaar: string;
}

interface FormData {
  // Personal Details
  aadhaar: string;
  dob: string;
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
  email: string;
  maritalStatus: string;
  
  // Work Details
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
  
  // Contact Details
  communicationAddress: string;
  username: string;
  password: string;
  contactNumber: string;
  emergencyContactNumber: string;
  
  // Documents
  userImage: File | null;
  aadhaarFront: File | null;
  aadhaarBack: File | null;
  panNumber: string;
  voterId: string;
}

const EditUserPopup: React.FC<EditUserPopupProps> = ({ 
  user, 
  isOpen, 
  onClose, 
  onSave 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const defaultFormData: FormData = {
    // Personal Details
    aadhaar: '94732XXXXX4234',
    dob: '2000-01-15',
    name: 'Kiran Singh',
    age: '24',
    gender: 'Male',
    bloodGroup: 'O+',
    email: 'kiran.singh@company.com',
    maritalStatus: 'Single',
    
    // Work Details
    userRole: 'User',
    bankName: 'XXX SSB OOO',
    designation: '',
    educationalQualification: 'MCA',
    accountNumber: '111222223333',
    department: '',
    previousExperience: '',
    ifscCode: 'DHFOGHV087',
    salary: '0.0',
    uanNumber: '123456789101',
    accountHolderName: 'AAAAAA',
    esiNumber: '1124567891011',
    entity: '',
    shiftTime: '',
    branch: '',
    zone: '',
    dateOfJoining: '',
    employeeId: 'EMP001',
    reportingManager: '',
    
    // Contact Details
    communicationAddress: 'XXXX SSB OOO',
    username: 'username',
    password: '',
    contactNumber: '(+)123456789',
    emergencyContactNumber: '(+)123456789',
    
    // Documents
    userImage: null,
    aadhaarFront: null,
    aadhaarBack: null,
    panNumber: '0123456789',
    voterId: '0123456789'
  };

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { 
      id: 1, 
      name: 'Member1', 
      dob: '03-Feb-2024', 
      gender: 'Male', 
      relationship: 'Father', 
      aadhaar: '1234 xxxx xxxx' 
    },
    { 
      id: 2, 
      name: 'Member2', 
      dob: '04-Feb-2024', 
      gender: 'Female', 
      relationship: 'Mother', 
      aadhaar: '1234 xxxx xxxx' 
    }
  ]);

  const steps = [
    { number: 1, title: 'Personal Details' },
    { number: 2, title: 'Work Details' },
    { number: 3, title: 'Contact Details' },
    { number: 4, title: 'Document Upload' }
  ];

  // Reset form when user changes
  useEffect(() => {
    if (user && isOpen) {
      setFormData(prev => ({
        ...defaultFormData,
        ...user,
        employeeId: user.employeeId || 'O8005'
      }));
    }
  }, [user, isOpen]);

  const handleInputChange = (field: keyof FormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof FormData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ ...user, ...formData } as User);
    }
    onClose();
  };

  const handleAddFamilyMember = () => {
    const newMember: FamilyMember = {
      id: familyMembers.length + 1,
      name: `Member${familyMembers.length + 1}`,
      dob: new Date().toLocaleDateString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      gender: 'Male',
      relationship: 'Relative',
      aadhaar: '1234 xxxx xxxx'
    };
    setFamilyMembers(prev => [...prev, newMember]);
  };

  const handleDeleteFamilyMember = (id: number) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
          
          {/* Combined Header with Steps */}
          <div className="px-6 sm:px-8 py-6 border-b border-gray-200 flex-shrink-0">
            {/* Main Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Onboard User Edit
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Employee: {formData.name} - ID: {user?.employeeId || 'O8005'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center flex-1">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        step.number === currentStep
                          ? 'bg-blue-600 text-white'
                          : step.number < currentStep
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.number < currentStep ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span 
                      className={`text-xs mt-2 font-medium text-center ${
                        step.number === currentStep ? 'text-blue-600' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div 
                      className={`flex-1 h-0.5 mx-4 ${
                        step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`} 
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            
            {/* Step 1: Personal Information */}
{currentStep === 1 && (
  <div className="bg-white border border-gray-200 rounded-xl p-6">
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        Enter basic personal details and family information.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Left Column */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aadhaar Number
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.aadhaar}
              onChange={(e) => handleInputChange('aadhaar', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
              <Check className="w-3 h-3" /> Verified
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => handleInputChange('dob', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      {/* Right Column */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
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
            onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
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
            disabled
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
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
                checked={formData.maritalStatus === 'Single'}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Single</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="maritalStatus"
                value="Married"
                checked={formData.maritalStatus === 'Married'}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Married</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    {/* Family Members Section */}
    <div className="border-t border-gray-200 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h4 className="text-base font-semibold text-gray-900">
            Add Family Details
          </h4>
          <p className="text-sm text-gray-500 mt-0.5">
            Add basic family information.
          </p>
        </div>
        <button 
          onClick={handleAddFamilyMember}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

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
            {familyMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors p-1">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteFamilyMember(member.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {member.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {member.dob}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {member.gender}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {member.relationship}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {member.aadhaar}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}
            {/* Step 2: Work Details */}
            {currentStep === 2 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Work Details
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter work details
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {[
                    { label: 'User role', field: 'userRole', type: 'select', options: ['User', 'Admin', 'Manager'] },
                    { label: 'Bank name', field: 'bankName', type: 'text' },
                    { label: 'Designation', field: 'designation', type: 'select', options: ['', 'Developer', 'Designer', 'Manager'] },
                    { label: 'Educational qualification', field: 'educationalQualification', type: 'text' },
                    { label: 'Account Number', field: 'accountNumber', type: 'text' },
                    { label: 'Department', field: 'department', type: 'select', options: ['', 'IT', 'HR', 'Finance'] },
                    { label: 'Previous Experience', field: 'previousExperience', type: 'text', placeholder: 'Enter previous experience' },
                    { label: 'IFSC code', field: 'ifscCode', type: 'text' },
                    { label: 'Salary', field: 'salary', type: 'text' },
                    { label: 'UAN Number', field: 'uanNumber', type: 'text' },
                    { label: 'Account holder name', field: 'accountHolderName', type: 'text' },
                    { label: 'ESI Number', field: 'esiNumber', type: 'text' },
                    { label: 'Entity', field: 'entity', type: 'select', options: ['', 'Entity1', 'Entity2'] },
                    { label: 'Shift time', field: 'shiftTime', type: 'select', options: ['', 'Morning', 'Evening', 'Night'] },
                    { label: 'Branch', field: 'branch', type: 'select', options: ['', 'Branch1', 'Branch2'] },
                    { label: 'Zone', field: 'zone', type: 'select', options: ['', 'North', 'South', 'East', 'West'] },
                  ].map(({ label, field, type, options, placeholder }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                      </label>
                      {type === 'select' ? (
                        <select
                          value={formData[field as keyof FormData] as string}
                          onChange={(e) => handleInputChange(field as keyof FormData, e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {options?.map(option => (
                            <option key={option} value={option}>
                              {option || `Select ${label.toLowerCase()}`}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          placeholder={placeholder}
                          value={formData[field as keyof FormData] as string}
                          onChange={(e) => handleInputChange(field as keyof FormData, e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Office Use Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-base font-semibold text-gray-900 mb-4">
                    Office use
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Joining <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.dateOfJoining}
                        onChange={(e) => handleInputChange('dateOfJoining', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employee id
                      </label>
                      <input
                        type="text"
                        value={formData.employeeId}
                        onChange={(e) => handleInputChange('employeeId', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reporting Manager
                      </label>
                      <select
                        value={formData.reportingManager}
                        onChange={(e) => handleInputChange('reportingManager', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Manager</option>
                        <option value="Manager1">Manager 1</option>
                        <option value="Manager2">Manager 2</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Details */}
            {currentStep === 3 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Contact Details
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter address and contact details
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Communication Address', field: 'communicationAddress', type: 'text' },
                    { label: 'User name', field: 'username', type: 'text' },
                    { 
                      label: 'Contact Number', 
                      field: 'contactNumber', 
                      type: 'tel',
                      required: true 
                    },
                    { 
                      label: 'Password', 
                      field: 'password', 
                      type: 'password',
                      placeholder: '........'
                    },
                    { 
                      label: 'Emergency Contact Number', 
                      field: 'emergencyContactNumber', 
                      type: 'tel' 
                    },
                  ].map(({ label, field, type, placeholder, required }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label} {required && <span className="text-red-500">*</span>}
                      </label>
                      {type === 'password' ? (
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData[field as keyof FormData] as string}
                            placeholder={placeholder}
                            onChange={(e) => handleInputChange(field as keyof FormData, e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <input
                          type={type}
                          value={formData[field as keyof FormData] as string}
                          onChange={(e) => handleInputChange(field as keyof FormData, e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Document Upload */}
            {currentStep === 4 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Document Upload
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Upload required documents
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {[
                    { label: 'Upload Image', field: 'userImage', id: 'userImage' },
                    { label: 'Upload Aadhaar front', field: 'aadhaarFront', id: 'aadhaarFront' },
                    { label: 'Upload Aadhaar back', field: 'aadhaarBack', id: 'aadhaarBack' },
                  ].map(({ label, field, id }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(field as keyof FormData, e.target.files?.[0] || null)}
                          className="hidden"
                          id={id}
                        />
                        <label htmlFor={id} className="cursor-pointer block">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mb-2">
                              <Upload className="w-6 h-6 text-gray-400" />
                            </div>
                            <button 
                              type="button" 
                              className="text-sm text-blue-600 font-medium mb-1"
                            >
                              Choose File
                            </button>
                            <span className="text-xs text-gray-500 break-words max-w-full">
                              {formData[field as keyof FormData] 
                                ? (formData[field as keyof FormData] as File)?.name 
                                : 'No file chosen'
                              }
                            </span>
                            <span className="text-xs text-gray-400 mt-1">
                              5 Mb size
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'PAN number', field: 'panNumber' },
                    { label: 'Voter ID', field: 'voterId' },
                  ].map(({ label, field }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={formData[field as keyof FormData] as string}
                        onChange={(e) => handleInputChange(field as keyof FormData, e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

       {/* Footer */}
<div className="flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8 py-4 sm:py-6 border-t border-gray-200 flex-shrink-0 bg-white gap-4">
  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
    <span className="text-sm text-gray-500">
      Step {currentStep} of {steps.length}
    </span>
    {currentStep > 1 && (
      <button
        onClick={handlePrevious}
        className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
      >
        Back
      </button>
    )}
  </div>
  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
    {currentStep === steps.length ? (
      <>
        <button
          onClick={onClose}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          Submit
        </button>
      </>
    ) : (
      <button
        onClick={handleNext}
        className="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
      >
        Next
      </button>
    )}
  </div>
</div>
        </div>
      </div>
    </>
  );
};

export default EditUserPopup;