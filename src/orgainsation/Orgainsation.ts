import { z } from "zod";

/* ============================
   ZOD SCHEMA
============================= */
export const OrganisationSchema = z.object({
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

  /* MAIN ACCESS MODULE */
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

  /* OTHER ACCESS */
  email_notify: z.boolean().optional(),
  whatsapp_notify: z.boolean().optional(),
  profile_validation: z.boolean().optional(),
  leave_validate: z.boolean().optional(),
  shift_validate: z.boolean().optional(),
  sub_department_validate: z.boolean().optional(),

  /* EXPENSE ACCESS */
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

/* ============================
   TS TYPE (EXPORT)
============================= */
export type OrganisationForm = z.infer<typeof OrganisationSchema>;
