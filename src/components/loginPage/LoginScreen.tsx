// components/LoginScreen.tsx
import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Shield,
  User2,
  UserCheck,
  UserPen,
  Calendar,
} from "lucide-react";
import NameLogo from "../../assets/nameLogo.png";
import LoginImg from "../../assets/Login page.jpg";
import { useNavigate } from "react-router-dom";
import { getOrganizations, loginWeb } from "@/service/authService";

const LoginScreen: React.FC = () => {
  const [orgInput, setOrgInput] = useState("");
  const [filteredOrgs, setFilteredOrgs] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState<"userid" | "empid">("userid");
  const [showPassword, setShowPassword] = useState(false);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    empid: "",
    dob: "",
    rememberMe: false,
  });

  // === FETCH ORGANIZATIONS FROM API (Option A: API only) ===
  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const res = await getOrganizations();
        const orgs = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.org_name,
        }));

        // Add superadmin as id: "0"
        orgs.unshift({ id: "0", name: "Super Admin" });

        setOrganizations(orgs);
      } catch (error) {
        console.error("Error loading organizations:", error);
      }
    };

    fetchOrgs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let orgIdToSend = localStorage.getItem("selected_org_id");
    if (!orgIdToSend) orgIdToSend = "3";

    try {
      setLoading(true);

      const payload: any = {
        org_id: orgIdToSend,
        pin_number: "",
      };

      if (activeTab === "userid") {
        payload.flag = "user_email";
        payload.user_email = formData.username;
        payload.user_password = formData.password;
      } else {
        payload.flag = "emp_id";
        payload.emp_id = formData.empid;
        payload.dob = formData.dob;
      }

      console.log("FINAL PAYLOAD SENT → ", payload);

      const response = await loginWeb(payload);
      const data = response.data;

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("org_id", data.org_id);
      localStorage.setItem("is_superuser", data.is_superuser ? "1" : "0");

      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };


  const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOrgInput(value);

    if (value.trim() === "") {
      setFilteredOrgs([]);
      setShowSuggestions(false);
      return;
    }

    let filtered = organizations;


    if (activeTab === "empid") {
      filtered = filtered.filter((org: any) => org.id !== "0");
    }

    const matches = filtered.filter((org: any) =>
      org.name.toLowerCase().startsWith(value.toLowerCase())
    );

    setFilteredOrgs(matches);
    setShowSuggestions(matches.length > 0);
  };
  ;

  const handleSelectOrg = (org: any) => {
    setOrgInput(org.name);
    localStorage.setItem("selected_org_id", String(org.id));
    setShowSuggestions(false);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
      <div className="w-full h-full max-w-xxl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 z-10"></div>
          <img
            src={LoginImg}
            alt="Team Collaboration"
            className="w-full h-full object-cover"
          />


          <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 text-white">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-base font-bold">DataMoo</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">
                  Secure Authentication
                </span>
              </div>
              <h2 className="text-2xl font-bold leading-tight">
                Welcome to Your
                <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Workspace
                </span>
              </h2>
              <p className="text-blue-100 text-xs leading-relaxed">
                Access your personalized dashboard and collaborate with your
                team seamlessly. Join thousands of professionals who trust our
                platform.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="w-7 h-7 rounded-full bg-white/20 border-2 border-white backdrop-blur-sm flex items-center justify-center text-xs font-bold"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="text-xs text-blue-100">
                <span className="font-semibold">2k+</span> active users
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/4 z-10">
            <div className="p-2.5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="absolute bottom-1/3 right-1/4 z-10">
            <div className="p-2.5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center lg:text-left mb-6">
              <div className="flex items-center gap-2">
                <img src={NameLogo} alt="Logo" className="w-150 h-10" />
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Sign in to your account to continue your journey
              </p>
            </div>

            {/* Tabs */}
            <div className="relative mb-6 bg-gray-100 dark:bg-gray-700 rounded-xl p-1.5">
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveTab("userid")}
                  className={`w-1/2 text-sm font-medium py-2.5 rounded-lg transition-all duration-200 ${activeTab === "userid"
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  User ID
                </button>

                <button
                  onClick={() => setActiveTab("empid")}
                  className={`w-1/2 text-sm font-medium py-2.5 rounded-lg transition-all duration-200 ${activeTab === "empid"
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  Emp ID
                </button>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {activeTab === "userid" ? (
                <div className="flex flex-col gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-primary dark:text-gray-400" />
                      Organization
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                        <Shield className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={orgInput}
                        onChange={handleOrgChange}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Enter your organization"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm outline-none"
                      />
                      {showSuggestions && filteredOrgs.length > 0 && (
                        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                          {filteredOrgs.map((org: any) => (
                            <li
                              key={org.id}
                              onClick={() => handleSelectOrg(org)}
                              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                              {org.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  {/* Username */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      <User2 className="w-3.5 h-3.5 text-primary dark:text-gray-400" />
                      User Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                        <User2 className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter your user name"
                        className="border-bottom w-full pl-9 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-primary dark:text-gray-400" />
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="w-full pl-9 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="space-y-1.5 ">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-primary dark:text-gray-400" />
                      Organization
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                        <Shield className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={orgInput}
                        onChange={handleOrgChange}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Enter your organization"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm outline-none"
                      />
                      {showSuggestions && filteredOrgs.length > 0 && (
                        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                          {filteredOrgs.map((org: any) => (
                            <li
                              key={org.id}
                              onClick={() => handleSelectOrg(org)}
                              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                              {org.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  {/* EMP ID */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      <User2 className="w-3.5 h-3.5 text-primary dark:text-gray-400" />
                      Employee ID
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                        <User2 className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="empid"
                        value={formData.empid}
                        onChange={handleInputChange}
                        placeholder="Enter your employee ID"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* DOB */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary dark:text-gray-400" />
                      Date of Birth
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2.5 px-5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Sign In"}
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
