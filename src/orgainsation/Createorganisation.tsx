import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeToggle } from "@/components/theme-toggle";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createOrganisation } from "@/orgainsation/service/createOrganisation"; 






const OrgSchema = z.object({
    org_name: z.string().min(1, "Organisation name is required"),
    org_base: z.string().min(1, "Organisation base is required"),
    users: z.number({ invalid_type_error: "Enter a valid number" }).min(1),
    admin_name: z.string().min(1, "Email user part required"),
    org_host: z.string().min(1),
    admin_id: z.string().optional(),
    full_name: z.string().min(1, "Full name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    latlng: z.string().optional(),
    api_key: z.string().optional(),
    timezone: z.string().optional(),

    // Booleans
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

    // Expense fields
    allow_default_e_role_access: z.boolean().optional(),
    allow_travel_policies: z.boolean().optional(),
    expense_policies: z.boolean().optional(),
    allow_approval_workflow: z.boolean().optional(),
    allow_master_fields: z.boolean().optional(),
    allow_expense_submission_rules: z.boolean().optional(),
    allow_user_role_access: z.boolean().optional(),
    allow_reports_and_analytics: z.boolean().optional(),
    expense_multi_currency: z.boolean().optional(),
    allow_notifications_and_alerts: z.boolean().optional(),
    allow_audit_trail: z.boolean().optional(),
    allow_fraud_detection: z.boolean().optional(),
});

type OrgFormType = z.infer<typeof OrgSchema>;

/* ============================
   2) COMPONENT
============================= */
export default function CreateOrganisation() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<OrgFormType>({
        resolver: zodResolver(OrgSchema),
        defaultValues: {
            org_host: "@datamoo.ai",
            users: 1,
            // initialize booleans explicitly
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
            allow_default_e_role_access: false,
            allow_travel_policies: false,
            expense_policies: false,
            allow_approval_workflow: false,
            allow_master_fields: false,
            allow_expense_submission_rules: false,
            allow_user_role_access: false,
            allow_reports_and_analytics: false,
            expense_multi_currency: false,
            allow_notifications_and_alerts: false,
            allow_audit_trail: false,
            allow_fraud_detection: false,
        } as Partial<OrgFormType>,
    });

    /* States */
    const [showPassword, setShowPassword] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const expenses = watch("expenses");
    const enableDefault = watch("allow_default_e_role_access");
    const orgBase = watch("org_base");

    /* AUTO UPDATE org_host */
    useEffect(() => {
        if (orgBase?.trim() !== "") {
            setValue("org_host", orgBase);
        }
    }, [orgBase, setValue]);

    /* EXPENSE TOGGLE LOGIC */
    useEffect(() => {
        if (expenses) {
            setValue("allow_default_e_role_access", true);
            setValue("allow_travel_policies", true);
            setValue("expense_policies", true);
            setValue("allow_approval_workflow", true);
            setValue("allow_master_fields", true);
            setValue("allow_expense_submission_rules", true);
        } else {
            setValue("allow_default_e_role_access", false);
            setValue("allow_travel_policies", false);
            setValue("expense_policies", false);
            setValue("allow_approval_workflow", false);
            setValue("allow_master_fields", false);
            setValue("allow_expense_submission_rules", false);
            setValue("allow_user_role_access", false);
            setValue("allow_reports_and_analytics", false);
            setValue("expense_multi_currency", false);
            setValue("allow_notifications_and_alerts", false);
            setValue("allow_audit_trail", false);
            setValue("allow_fraud_detection", false);
        }
    }, [expenses, setValue]);

    /* INDIVIDUAL ROLE DISABLE LOGIC */
    useEffect(() => {
        if (enableDefault) {
            setValue("allow_travel_policies", false);
            setValue("expense_policies", false);
            setValue("allow_approval_workflow", false);
            setValue("allow_master_fields", false);
            setValue("allow_expense_submission_rules", false);
            setValue("allow_user_role_access", false);
            setValue("expense_multi_currency", false);
        }
    }, [enableDefault, setValue]);

    /* FILE UPLOAD */
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

    /* Handle Back button click */
    const handleBack = () => {
        navigate(-1);
    };

    /* SUBMIT (NO API) */
   const onSubmit = async (data: OrgFormType) => {
    try {
        const formData = new FormData();

        if (profileImage) {
            formData.append("profile_image", profileImage);
        }

      
        formData.append("org_name", data.org_name);
        formData.append("org_base", data.org_base);
        formData.append("users", String(data.users));
        formData.append("password", data.password);
        formData.append("admin_name", data.admin_name);
        formData.append("full_name", data.full_name);
        formData.append("admin_id", data.admin_id || "");
        formData.append("api_key", data.api_key || "");
        formData.append("timezone", data.timezone || "");
        formData.append("latlng", data.latlng || "");

   
        const fieldMap: Record<keyof OrgFormType, string> = {
            attendence: "attendence",
            live_track: "live_track",
            client_site: "client_site",
            assign_location: "assign_location",
            onboard_user: "onboard_user",
            reassign_user: "reassign_user",
            reports: "reports",
            leave: "leave",
            timesheet: "timesheet",
            field_job: "field_job",
            task: "task",
            expenses: "expenses",
            crm: "crm",
            handle_ticket: "handle_ticket",
            ticket: "ticket",
            learning: "learning",
            profile_validation: "profile_validation",
            leave_validate: "leave_validate",
            shift_validate: "shift_validate",
            sub_department_validate: "sub_department_validate",
            email_notify: "email_notify",
            whatsapp_notify: "whatsapp_notify",
            trip: "trip",

            allow_default_e_role_access: "default_e_role_access",
            allow_travel_policies: "travel_policies",
            expense_policies: "expense_policies",
            allow_approval_workflow: "approval_workflow",
            allow_master_fields: "master_fields",
            allow_expense_submission_rules: "expense_submission_rules",
            allow_user_role_access: "allow_user_role_access",
            allow_reports_and_analytics: "reports_and_analytics",
            expense_multi_currency: "expense_multi_currency",
            allow_notifications_and_alerts: "notifications_and_alerts",
            allow_audit_trail: "audit_trail",
            allow_fraud_detection: "fraud_detection",
        };

        Object.keys(fieldMap).forEach((key) => {
            const typedKey = key as keyof OrgFormType;
            const backendKey = fieldMap[typedKey];
            const value = data[typedKey] ? "true" : "false";
            formData.append(backendKey, value);
        });

  
        const res = await createOrganisation(formData);

        alert(res.message || "Organisation created successfully!");
    } catch (error: any) {
        console.error("Create Organisation Error:", error?.response?.data || error);
        alert(error?.response?.data?.message || "Something went wrong");
    }
};


    const renderSwitchRow = (
        key: keyof OrgFormType,
        label: string,
        disabled = false
    ) => {
        const value = watch(key as any) as boolean | undefined;
        return (
            <div
                key={String(key)}
                className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 dark:bg-gray-800"
            >
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

    const accessFields: Array<[keyof OrgFormType, string]> = [
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

    const otherAccessFields: Array<[keyof OrgFormType, string]> = [
        ["email_notify", "Email Notification"],
        ["whatsapp_notify", "Whatsapp Notification"],
        ["profile_validation", "Not Validate Profile"],
        ["leave_validate", "Advanced Leave Validate"],
        ["shift_validate", "Shift Time"],
        ["sub_department_validate", "Sub-Department"],
    ];

    const expenseFields: Array<[keyof OrgFormType, string, boolean?]> = [
        ["allow_default_e_role_access", "Default Expense Role Access"],
        ["allow_travel_policies", "Travel Policies", enableDefault],
        ["expense_policies", "Expense Policies", enableDefault],
        ["allow_approval_workflow", "Approval Workflow", enableDefault],
        ["allow_master_fields", "Master Fields", enableDefault],
        [
            "allow_expense_submission_rules",
            "Expense Submission Rules",
            enableDefault,
        ],
        ["allow_user_role_access", "Custom Expense Role Access", enableDefault],
        ["allow_reports_and_analytics", "Reports and Analytics", enableDefault],
        ["expense_multi_currency", "Multi Currency", enableDefault],
        ["allow_notifications_and_alerts", "Notifications and Alerts", enableDefault],
        ["allow_audit_trail", "Audit Trail", enableDefault],
        ["allow_fraud_detection", "Fraud Detection", enableDefault],
    ];

    return (
        <div className="max-w-6xl mx-auto p-6">
      
            <div className="flex justify-end items-center gap-3 mb-4">
                <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft size={16} />
                    Back
                </Button>
                <ThemeToggle />
            </div>

            <h1 className="text-2xl font-bold mb-6">Create Organisation</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
                <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Organisation</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Organisation Name</label>
                            <input
                                {...register("org_name")}
                                className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-800"
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
                                className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-800"
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
                                className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-800"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Admin Details</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <div className="flex gap-2">
                                <input
                                    {...register("admin_name")}
                                    className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800"
                                    placeholder="admin"
                                />
                                <input
                                    {...register("org_host")}
                                    readOnly
                                    className="w-40 border px-3 py-2 rounded bg-gray-100 dark:bg-gray-800/60"
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
                                className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-800"
                                placeholder="Admin ID"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Profile Image</label>
                            <input
                                type="file"
                                onChange={handleImage}
                                className="mt-1 w-full rounded"
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
                                className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-800"
                            />
                            {errors.full_name && (
                                <p className="text-red-500 text-sm">{errors.full_name.message}</p>
                            )}
                        </div>

                    
                        <div>
                            <label className="text-sm font-medium">Password</label>
                            <div className="relative">
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-800"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-500"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Access Details</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {accessFields.map(([key, label]) => renderSwitchRow(key, label))}
                    </div>
                </div>

 
                <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Other Access</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Geo Location</label>
                            <input
                                {...register("latlng")}
                                className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-800"
                            />
                        </div>

                        <div className="space-y-2">
                            {otherAccessFields.map(([key, label]) => (
                                <div
                                    key={String(key)}
                                    className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 dark:bg-gray-800"
                                >
                                    <div className="text-sm">{label}</div>
                                    <Switch
                                        checked={!!watch(key as any)}
                                        onCheckedChange={(v) => setValue(key as any, Boolean(v))}
                                        className="
    data-[state=unchecked]:bg-[#adadad]
    data-[state=checked]:bg-[#2563eb]
    after:bg-white
  "
                                    />

                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="text-sm font-medium">API Key</label>
                            <input
                                {...register("api_key")}
                                className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-800"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Time Zone</label>
                            <input
                                {...register("timezone")}
                                className="mt-1 w-full border px-3 py-2 rounded bg-white dark:bg-gray-800"
                                placeholder="Asia/Kolkata"
                            />
                        </div>
                    </div>
                </div>

                {expenses && (
                    <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Expense Access Details</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {expenseFields.map(([key, label, disabled]) =>
                                renderSwitchRow(key, label, Boolean(disabled))
                            )}
                        </div>
                    </div>
                )}

            
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}