// components/CreateUserForm.tsx
import React, { useState, useRef, useEffect } from 'react';
import { X, Eye, EyeOff, Calendar } from 'lucide-react';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    employeeId: '',
    gender: '',
    dob: '',
    mobile: '',
    designation: '',
    password: '',
    role: '',
    department: '',
    zone: '',
    branch: '',
    shiftTiming: '',
    assignTo: '',
    picture: null as File | null,
    location: '',
    typeOfSelectLocation: '',
    fromDate: '',
    toDate: '',
    defaultLocation: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        picture: e.target.files![0]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleClear = () => {
    setFormData({
      username: '',
      fullName: '',
      employeeId: '',
      gender: '',
      dob: '',
      mobile: '',
      designation: '',
      password: '',
      role: '',
      department: '',
      zone: '',
      branch: '',
      shiftTiming: '',
      assignTo: '',
      picture: null,
      location: '',
      typeOfSelectLocation: '',
      fromDate: '',
      toDate: '',
      defaultLocation: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Create User</h2>
            <p className="text-sm text-gray-600 mt-1">Enter User details to add user.</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - EXACT ORDER FROM IMAGE */}
              <div className="space-y-4">
                {/* User name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    User name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="username"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500 text-sm">@datamoo.ai</span>
                    </div>
                  </div>
                </div>

                {/* Employee ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Employee ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Employee ID"
                    required
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    DOB <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-10"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  >
                    <option value="">Select designation</option>
                    <option value="manager">Manager</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                  </select>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  >
                    <option value="">Select the role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>

                {/* Zone */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Zone <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="zone"
                    value={formData.zone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  >
                    <option value="">Select the zone</option>
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                  </select>
                </div>

                {/* Shift Timing */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Shift Timing
                  </label>
                  <select
                    name="shiftTiming"
                    value={formData.shiftTiming}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select</option>
                    <option value="morning">Morning</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                  </select>
                </div>

                {/* Picture */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Picture
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      id="picture"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                    <label
                      htmlFor="picture"
                      className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-sm whitespace-nowrap"
                    >
                      Choose File
                    </label>
                    <span className="text-sm text-gray-500">
                      {formData.picture ? formData.picture.name : 'No file chosen'}
                    </span>
                  </div>
                </div>

                {/* Default Location Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="defaultLocation"
                      name="defaultLocation"
                      checked={formData.defaultLocation}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="defaultLocation" className="text-sm font-medium text-gray-900">
                      Default
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        From Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="fromDate"
                          value={formData.fromDate}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        To Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="toDate"
                          value={formData.toDate}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-10"
                          required
                        />
                      </div>
                    </div>
                  </div>


                </div>
              </div>

              {/* Right Column - EXACT ORDER FROM IMAGE */}
              <div className="space-y-4">
                {/* Full name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Mobile number */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Mobile 
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter mobile no"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-10"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  >
                    <option value="">Select department</option>
                    <option value="it">IT</option>
                    <option value="hr">HR</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>

                {/* Branch */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Branch
                  </label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select branch</option>
                    <option value="main">Main Branch</option>
                    <option value="branch1">Branch 1</option>
                    <option value="branch2">Branch 2</option>
                  </select>
                </div>

                {/* Assign to */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Assign to <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="assignTo"
                    value={formData.assignTo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  >
                    <option value="">Select the manager</option>
                    <option value="manager1">Manager 1</option>
                    <option value="manager2">Manager 2</option>
                    <option value="manager3">Manager 3</option>
                  </select>
                </div>

                {/* Add location Help section */}
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Add location Help</span>
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Assign location
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">All sign location</p>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 mt-7">
                      Type of select location <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600 mb-2"># Select of Particular</div>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="typeOfSelectLocation"
                            value="all"
                            checked={formData.typeOfSelectLocation === 'all'}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            required
                          />
                          <span className="text-sm text-gray-900">Select all</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="typeOfSelectLocation"
                            value="particular"
                            checked={formData.typeOfSelectLocation === 'particular'}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-900">Particular</span>
                        </label>
                      </div>
                    </div>
                  </div>
                     <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Enter location"
                      required
                    />
                  </div>
              </div>
            </div>

            {/* Action Buttons - Clear button at bottom left as shown in image */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                Clear
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;