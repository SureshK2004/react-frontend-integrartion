// components/EditOrganisationModal.tsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { X, Loader2, Eye, EyeOff } from "lucide-react";

// Edit Schema matching your API fields
const EditOrgSchema = z.object({
  org_name: z.string().min(1, "Organisation name is required"),
  org_base: z.string().min(1, "Organisation base is required"),
  users: z.number({ invalid_type_error: "Enter a valid number" }).min(1),
  admin_name: z.string().min(1, "Admin name is required"),
  org_host: z.string().min(1),
  admin_id: z.string().optional(),
  full_name: z.string().min(1, "Full name is required"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  latlng: z.string().optional(),
  api_key: z.string().optional(),
  timezone: z.string().optional(),

  // Boolean fields matching your API
  attendence: z.boolean().optional(),
  live_track: z.boolean().optional(),
  assign_location: z.boolean().optional(),
  onboard_user: z.boolean().optional(),
  task: z.boolean().optional(),
  expenses: z.boolean().optional(),
  learning: z.boolean().optional(),
  handle_ticket: z.boolean().optional(),
  trip: z.boolean().optional(),
  reassign_user: z.boolean().optional(),
  reports: z.boolean().optional(),
  leave: z.boolean().optional(),
  timesheet: z.boolean().optional(),
  field_job: z.boolean().optional(),
  crm: z.boolean().optional(),
  ticket: z.boolean().optional(),
  client_site: z.boolean().optional(),

  email_notify: z.boolean().optional(),
  whatsapp_notify: z.boolean().optional(),
  profile_validation: z.boolean().optional(),
  leave_validate: z.boolean().optional(),
  shift_validate: z.boolean().optional(),
  sub_department_validate: z.boolean().optional(),

  // Expense fields - exact names from your API
  allow_user_role_access: z.boolean().optional(),
  default_e_role_access: z.boolean().optional(),
  travel_policies: z.boolean().optional(),
  expense_policies: z.boolean().optional(),
  approval_workflow: z.boolean().optional(),
  expense_submission_rules: z.boolean().optional(),
  master_fields: z.boolean().optional(),
  notifications_and_alerts: z.boolean().optional(),
  budget_management: z.boolean().optional(),
  audit_trail: z.boolean().optional(),
  reports_and_analytics: z.boolean().optional(),
  fraud_detection: z.boolean().optional(),
  expense_multi_currency: z.boolean().optional(),
});

type EditOrgFormType = z.infer<typeof EditOrgSchema>;

interface EditOrganisationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  organisationData: any;
}

export default function EditOrganisationModal({
  isOpen,
  onClose,
  onSuccess,
  organisationData,
}: EditOrganisationModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditOrgFormType>({
    resolver: zodResolver(EditOrgSchema),
    defaultValues: {
      org_host: "@datamoo.ai",
      users: 1,
      // Initialize all booleans as false
      attendence: false,
      live_track: false,
      assign_location: false,
      onboard_user: false,
      task: false,
      expenses: false,
      learning: false,
      handle_ticket: false,
      trip: false,
      reassign_user: false,
      reports: false,
      leave: false,
      timesheet: false,
      field_job: false,
      crm: false,
      ticket: false,
      client_site: false,
      email_notify: false,
      whatsapp_notify: false,
      profile_validation: false,
      leave_validate: false,
      shift_validate: false,
      sub_department_validate: false,
      allow_user_role_access: false,
      default_e_role_access: false,
      travel_policies: false,
      expense_policies: false,
      approval_workflow: false,
      expense_submission_rules: false,
      master_fields: false,
      notifications_and_alerts: false,
      budget_management: false,
      audit_trail: false,
      reports_and_analytics: false,
      fraud_detection: false,
      expense_multi_currency: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const expenses = watch("expenses");
  const enableDefault = watch("default_e_role_access");
  const orgBase = watch("org_base");

  // Load organisation data when modal opens
  useEffect(() => {
    if (isOpen && organisationData) {
      loadOrganisationData();
    }
  }, [isOpen, organisationData]);

  // Auto-update org_host when org_base changes
  useEffect(() => {
    if (orgBase?.trim() !== "") {
      setValue("org_host", orgBase);
    }
  }, [orgBase, setValue]);

  // Expense toggle logic
  useEffect(() => {
    if (expenses) {
      setValue("default_e_role_access", true);
      setValue("travel_policies", true);
      setValue("expense_policies", true);
      setValue("approval_workflow", true);
      setValue("master_fields", true);
      setValue("expense_submission_rules", true);
    } else {
      setValue("default_e_role_access", false);
      setValue("travel_policies", false);
      setValue("expense_policies", false);
      setValue("approval_workflow", false);
      setValue("master_fields", false);
      setValue("expense_submission_rules", false);
      setValue("allow_user_role_access", false);
      setValue("reports_and_analytics", false);
      setValue("expense_multi_currency", false);
      setValue("notifications_and_alerts", false);
      setValue("audit_trail", false);
      setValue("fraud_detection", false);
      setValue("budget_management", false);
    }
  }, [expenses, setValue]);

  // Individual role disable logic
  useEffect(() => {
    if (enableDefault) {
      setValue("travel_policies", false);
      setValue("expense_policies", false);
      setValue("approval_workflow", false);
      setValue("master_fields", false);
      setValue("expense_submission_rules", false);
      setValue("allow_user_role_access", false);
      setValue("expense_multi_currency", false);
    }
  }, [enableDefault, setValue]);

  const loadOrganisationData = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call to fetch organisation by ID
      // For now, using mock data based on your table structure
      const mockData = {
        org_name: organisationData?.name || "",
        org_base: organisationData?.org_base || "",
        users: 10,
        admin_name: "admin",
        org_host: organisationData?.org_base || "@datamoo.ai",
        admin_id: "EMP001",
        full_name: organisationData?.admin || "",
        password: "",
        latlng: "40.7128, -74.0060",
        api_key: "abc123xyz",
        timezone: "Asia/Kolkata",
        attendence: true,
        live_track: false,
        assign_location: true,
        onboard_user: true,
        task: true,
        expenses: true,
        learning: false,
        handle_ticket: true,
        trip: true,
        reassign_user: false,
        reports: true,
        leave: false,
        timesheet: true,
        field_job: false,
        crm: false,
        ticket: true,
        client_site: true,
        email_notify: true,
        whatsapp_notify: false,
        profile_validation: true,
        leave_validate: false,
        shift_validate: true,
        sub_department_validate: false,
        allow_user_role_access: true,
        default_e_role_access: false,
        travel_policies: true,
        expense_policies: false,
        approval_workflow: true,
        expense_submission_rules: true,
        master_fields: true,
        notifications_and_alerts: false,
        budget_management: true,
        audit_trail: true,
        reports_and_analytics: true,
        fraud_detection: false,
        expense_multi_currency: true,
      };

      reset(mockData);
    } catch (error) {
      console.error("Error loading organisation data:", error);
      alert("Failed to load organisation data");
    } finally {
      setLoading(false);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileImage(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const onSubmit = async (data: EditOrgFormType) => {
    try {
      const formData = new FormData();

      // Add organisation ID to the URL (from your curl: ?org_id=3)
      const orgId = organisationData?.org_id;

      // Profile image
      if (profileImage) {
        formData.append("profile_image", profileImage);
      }

      // Text fields - exact names from your curl
      formData.append("org_name", data.org_name);
      formData.append("org_base", data.org_base);
      formData.append("users", String(data.users));
      if (data.password) {
        formData.append("password", data.password);
      }
      formData.append("admin_name", data.admin_name);
      formData.append("full_name", data.full_name);
      formData.append("admin_id", data.admin_id || "");
      formData.append("api_key", data.api_key || "");
      formData.append("timezone", data.timezone || "");
      formData.append("latlng", data.latlng || "");

      // Boolean fields - convert to "true"/"false" strings as in your curl
      const booleanFields = [
        "attendence", "live_track", "client_site", "assign_location", 
        "onboard_user", "reassign_user", "reports", "leave", "timesheet", 
        "field_job", "task", "expenses", "crm", "handle_ticket", "ticket", 
        "learning", "profile_validation", "leave_validate", "email_notify", 
        "whatsapp_notify", "shift_validate", "sub_department_validate", "trip",
        "allow_user_role_access", "default_e_role_access", "travel_policies", 
        "expense_policies", "approval_workflow", "expense_submission_rules", 
        "master_fields", "notifications_and_alerts", "budget_management", 
        "audit_trail", "reports_and_analytics", "fraud_detection", 
        "expense_multi_currency"
      ];

      booleanFields.forEach(field => {
        const value = data[field as keyof EditOrgFormType];
        formData.append(field, value ? "true" : "false");
      });

      // Make API call
      const response = await fetch(`https://uatbase.aivapm.com/update_organisation_api?org_id=${orgId}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        alert(result.message || "Organisation updated successfully!");
        onSuccess();
        onClose();
      } else {
        throw new Error(result.message || "Failed to update organisation");
      }

    } catch (error: any) {
      console.error("Update Organisation Error:", error);
      alert(error?.message || "Failed to update organisation");
    }
  };

  const renderSwitchRow = (
    key: keyof EditOrgFormType,
    label: string,
    disabled = false
  ) => {
    const value = watch(key as any) as boolean | undefined;
    return (
      <div className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 dark:bg-gray-800">
        <div className="text-sm">{label}</div>
        <Switch
          checked={!!value}
          onCheckedChange={(v) => setValue(key as any, Boolean(v))}
          disabled={disabled}
          className="
            data-[state=unchecked]:bg-[#adadad]
            data-[state=checked]:bg-[#2563eb]
            after:bg-white
          "
        />
      </div>
    );
  };

  // Field lists updated to match your API field names
  const accessFields: Array<[keyof EditOrgFormType, string]> = [
    ["attendence", "Attendence"],
    ["live_track", "Live track"],
    ["assign_location", "Assign location"],
    ["onboard_user", "Onboard user"],
    ["task", "Task"],
    ["expenses", "Expenses"],
    ["learning", "Learning Model"],
    ["handle_ticket", "Handle Ticket"],
    ["trip", "Trip"],
    ["reassign_user", "Re-assign User"],
    ["reports", "Reports"],
    ["leave", "Leave"],
    ["timesheet", "Timesheet"],
    ["field_job", "Field Job"],
    ["crm", "CRM"],
    ["ticket", "Ticket System"],
    ["client_site", "Client & Site"],
  ];

  const otherAccessFields: Array<[keyof EditOrgFormType, string]> = [
    ["email_notify", "Email Notification"],
    ["whatsapp_notify", "Whatsapp Notification"],
    ["profile_validation", "Not Validate Profile"],
    ["leave_validate", "Advanced Leave Validate"],
    ["shift_validate", "Shift Time"],
    ["sub_department_validate", "Sub-Department"],
  ];

  const expenseFields: Array<[keyof EditOrgFormType, string, boolean?]> = [
    ["default_e_role_access", "Default Expense Role Access"],
    ["travel_policies", "Travel Policies", enableDefault],
    ["expense_policies", "Expense Policies", enableDefault],
    ["approval_workflow", "Approval Workflow", enableDefault],
    ["master_fields", "Master Fields", enableDefault],
    ["expense_submission_rules", "Expense Submission Rules", enableDefault],
    ["allow_user_role_access", "Custom Expense Role Access", enableDefault],
    ["reports_and_analytics", "Reports and Analytics", enableDefault],
    ["expense_multi_currency", "Multi Currency", enableDefault],
    ["notifications_and_alerts", "Notifications and Alerts", enableDefault],
    ["audit_trail", "Audit Trail", enableDefault],
    ["fraud_detection", "Fraud Detection", enableDefault],
    ["budget_management", "Budget Management", enableDefault],
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900">
          <h2 className="text-xl font-semibold">Edit Organisation</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading organisation data...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* ORGANISATION */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Organisation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Organisation Name</label>
                    <input
                      {...register("org_name")}
                      className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-700"
                      placeholder="Organisation Name"
                    />
                    {errors.org_name && (
                      <p className="text-red-500 text-sm">{errors.org_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Organisation Base</label>
                    <input
                      {...register("org_base")}
                      className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-700"
                      placeholder="@datamoo.ai"
                    />
                    {errors.org_base && (
                      <p className="text-red-500 text-sm">{errors.org_base.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Users</label>
                    <input
                      type="number"
                      {...register("users", { valueAsNumber: true })}
                      className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-700"
                    />
                    {errors.users && (
                      <p className="text-red-500 text-sm">{errors.users.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ADMIN DETAILS */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Admin Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <div className="flex gap-2">
                      <input
                        {...register("admin_name")}
                        className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700"
                        placeholder="admin"
                      />
                      <input
                        {...register("org_host")}
                        readOnly
                        className="w-40 border px-3 py-2 rounded bg-gray-100 dark:bg-gray-600"
                      />
                    </div>
                    {errors.admin_name && (
                      <p className="text-red-500 text-sm">{errors.admin_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Admin ID</label>
                    <input
                      {...register("admin_id")}
                      className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-700"
                      placeholder="Admin ID"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Profile Image</label>
                    <input
                      type="file"
                      onChange={handleImage}
                      className="mt-1 w-full rounded"
                      accept="image/*"
                    />
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="mt-2 w-32 h-32 rounded-md object-cover"
                      />
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                      {...register("full_name")}
                      className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-700"
                    />
                    {errors.full_name && (
                      <p className="text-red-500 text-sm">{errors.full_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Password (Leave blank to keep current)</label>
                    <div className="relative">
                      <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 pr-10"
                        placeholder="Leave blank to keep current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ACCESS SWITCHES */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Access Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {accessFields.map(([key, label]) => renderSwitchRow(key, label))}
                </div>
              </div>

              {/* OTHER ACCESS */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Other Access</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Geo Location</label>
                    <input
                      {...register("latlng")}
                      className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-700"
                      placeholder="latitude, longitude"
                    />
                  </div>

                  <div className="space-y-2">
                    {otherAccessFields.map(([key, label]) => renderSwitchRow(key, label))}
                  </div>

                  <div>
                    <label className="text-sm font-medium">API Key</label>
                    <input
                      {...register("api_key")}
                      className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-700"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Time Zone</label>
                    <input
                      {...register("timezone")}
                      className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-700"
                      placeholder="Asia/Kolkata"
                    />
                  </div>
                </div>
              </div>

              {/* EXPENSE CONFIG */}
              {expenses && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Expense Access Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {expenseFields.map(([key, label, disabled]) =>
                      renderSwitchRow(key, label, Boolean(disabled))
                    )}
                  </div>
                </div>
              )}

              {/* FOOTER BUTTONS */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Update Organisation
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}