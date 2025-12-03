import React, { useState, useEffect } from "react";
import {
  Edit2,
  X,
  Save,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building,
  User,
  Lock,
  Globe,
  Hash,
  Briefcase,
  Shield,
  Sparkles,
} from "lucide-react";
import ProfileHead from "./profileHead";
import { getProfile } from "@/service/profileService";

// API user structure
interface ApiUserProfile {
  id: number;
  emp_Id: string;
  username: string;
  full_name: string;
  email: string;
  mobile_number: string;
  dob: string | null;
  address: string | null;
  pincode: string | null;
  country: string | null;
  department_name: string | null;
  role_name: string;
}

// UI data structure
interface ProfileData {
  fullName: string;
  username: string;
  email: string;
  dob: string;
  department: string;
  phone: string;
  address: string;
  postalCode: string;
  country: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Empty State (replaced once API loads)
const INITIAL_DATA: ProfileData = {
  fullName: "",
  username: "",
  email: "",
  dob: "",
  department: "",
  phone: "",
  address: "",
  postalCode: "",
  country: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>(INITIAL_DATA);

  // Load user profile from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const org_id = localStorage.getItem("org_id");
        const user_id = localStorage.getItem("user_id");

        if (!org_id || !user_id) {
          console.error("Missing org_id or user_id in localStorage");
          return;
        }

        const response = await getProfile(org_id, user_id);

        const user: ApiUserProfile = response.users.find(
          (u: any) => u.id.toString() === user_id
        );

        if (!user) {
          console.error("User not found in API response");
          return;
        }

        setFormData({
          fullName: user.full_name || "",
          username: user.username || "",
          email: user.email || "",
          dob: user.dob || "",
          department: user.department_name || "",
          phone: user.mobile_number || "",
          address: user.address || "",
          postalCode: user.pincode || "",
          country: user.country || "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Profile load error:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Icon config
  const iconConfig = {
    user: { icon: User, color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
    mail: { icon: Mail, color: "text-red-500 bg-red-50 dark:bg-red-900/20" },
    phone: { icon: Phone, color: "text-green-500 bg-green-50 dark:bg-green-900/20" },
    calendar: {
      icon: Calendar,
      color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
    },
    map: { icon: MapPin, color: "text-orange-500 bg-orange-50 dark:bg-orange-900/20" },
    globe: { icon: Globe, color: "text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20" },
    hash: { icon: Hash, color: "text-pink-500 bg-pink-50 dark:bg-pink-900/20" },
    building: {
      icon: Building,
      color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20",
    },
    briefcase: {
      icon: Briefcase,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20",
    },
  };

  const IconWrapper = ({
    type,
    children,
  }: {
    type: keyof typeof iconConfig;
    children: React.ReactNode;
  }) => {
    const config = iconConfig[type];
    const IconComponent = config.icon;

    return (
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-xl ${config.color} transition-all duration-300 hover:scale-110`}
        >
          <IconComponent className="w-4 h-4" />
        </div>
        {children}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <ProfileHead />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl transition-all duration-300"
        >
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile Info Card - Enhanced */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
            {/* Profile Header with Badge */}
            <div className="flex flex-col items-center text-center relative">
              <div className="relative mb-2">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-purple-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl relative overflow-hidden">
                  {formData.fullName.charAt(0)}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <span className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-lg"></span>
                
                {/* Premium Badge */}
                {/* <div className="absolute -top-1 -left-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-lg flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  PRO
                </div> */}
              </div>

              <h2 className="mt-3 text-lg font-bold text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {formData.fullName}
              </h2>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {formData.department || "Admin"}
                </div>
                <div className="px-1.5 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs flex items-center gap-0.5">
                  <Shield className="w-3 h-3" />
                  Verified
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Employee ID: <span className="font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs">200201</span>
              </p>
            </div>

            {/* Profile Details with Colorful Icons */}
            <div className="mt-6 space-y-4">
              <IconWrapper type="user">
                <p className="font-medium text-gray-800 dark:text-white text-sm">
                  @{formData.username}
                </p>
              </IconWrapper>

              <IconWrapper type="mail">
                <p className="text-gray-800 dark:text-gray-200 break-all text-xs">{formData.email}</p>
              </IconWrapper>

              <IconWrapper type="phone">
                <p className="text-gray-800 dark:text-gray-200 text-sm">{formData.phone}</p>
              </IconWrapper>

              <IconWrapper type="calendar">
                <p className="text-gray-800 dark:text-gray-200 text-sm">{formatDate(formData.dob)}</p>
              </IconWrapper>

              <IconWrapper type="map">
                <p className="text-gray-800 dark:text-gray-200 text-sm">{formData.address}</p>
              </IconWrapper>

              <IconWrapper type="globe">
                <p className="text-gray-800 dark:text-gray-200 text-sm">{formData.country}</p>
              </IconWrapper>

              <IconWrapper type="hash">
                <p className="text-gray-800 dark:text-gray-200 text-sm">{formData.postalCode}</p>
              </IconWrapper>
            </div>

            {/* Stats Section */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">2.5y</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Experience</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">47</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Projects</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">98%</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Details Section - Enhanced */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-500">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Profile Overview
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Complete professional profile details</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: formData.fullName, icon: "user" },
                { label: "Username", value: `@${formData.username}`, icon: "user" },
                { label: "Department", value: formData.department, icon: "building" },
                { label: "Date of Birth", value: formatDate(formData.dob), icon: "calendar" },
                { label: "Country", value: formData.country, icon: "globe" },
                { label: "Postal Code", value: formData.postalCode, icon: "hash" },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 border border-gray-100 dark:border-gray-600 hover:border-gray-200 dark:hover:border-gray-500"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`p-1.5 rounded-lg ${iconConfig[item.icon as keyof typeof iconConfig].color}`}>
                      {React.createElement(iconConfig[item.icon as keyof typeof iconConfig].icon, { className: "w-3 h-3" })}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">{item.label}</p>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm pl-9">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Performance</h4>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Consistently exceeds expectations in frontend development and UI/UX implementation.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Status</h4>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Active team member with full access privileges and security clearance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal - Enhanced */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-5 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Update your personal and professional information</p>
              </div>
              <button
                onClick={handleCancel}
                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Basic Info */}
              <section>
                <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    <User className="w-4 h-4" />
                  </div>
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", name: "fullName", type: "text", icon: "user" },
                    { label: "Username", name: "username", type: "text", icon: "user" },
                    { label: "Email", name: "email", type: "email", icon: "mail" },
                    { label: "Date of Birth", name: "dob", type: "date", icon: "calendar" },
                    { label: "Phone", name: "phone", type: "tel", icon: "phone" },
                    { label: "Postal Code", name: "postalCode", type: "text", icon: "hash" },
                  ].map((field) => (
                    <div key={field.name} className="space-y-1.5">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                        <div className={`p-1 rounded-lg ${iconConfig[field.icon as keyof typeof iconConfig].color}`}>
                          {React.createElement(iconConfig[field.icon as keyof typeof iconConfig].icon, { className: "w-3 h-3" })}
                        </div>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={(formData as any)[field.name]}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                      />
                    </div>
                  ))}

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      <div className="p-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500">
                        <Building className="w-3 h-3" />
                      </div>
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200 text-sm"
                    >
                      <option value="">Select Department</option>
                      <option value="UI UX">UI UX</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Testing">Testing</option>
                      <option value="Full Stack">Full Stack</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      <div className="p-1 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 text-cyan-500">
                        <Globe className="w-3 h-3" />
                      </div>
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary transition-all duration-200 text-sm"
                    >
                      <option value="">Select Country</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      <div className="p-1 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-500">
                        <MapPin className="w-3 h-3" />
                      </div>
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your full address"
                      className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                    />
                  </div>
                </div>
              </section>

              {/* Password Change */}
              <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  Change Password
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Old Password", name: "oldPassword" },
                    { label: "New Password", name: "newPassword" },
                    { label: "Confirm Password", name: "confirmPassword" },
                  ].map((field) => (
                    <div
                      key={field.name}
                      className={field.name === "confirmPassword" ? "md:col-span-2 space-y-1.5" : "space-y-1.5"}
                    >
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {field.label}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                          type="password"
                          name={field.name}
                          value={(formData as any)[field.name]}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-5 flex justify-end gap-2 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg hover:from-primary/90 hover:to-purple-600/90 transition-all duration-200 shadow-lg hover:shadow-xl font-medium text-sm"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;