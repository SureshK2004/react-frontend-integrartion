// src/components/leave/LeaveEditModal.tsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData: any;
  onSubmit: (data: any) => void;
  title?: string;
}

const LeaveEditModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  title = "Edit Leave",
}) => {
  const [form, setForm] = useState({
    id: 0,
    name: "",
    no_of_leave: "",
    leave_config_type: "Yearly",
    monthly_split: false,
    leave_carry_forward: false,
    carry_forward_limit: 0,
  });

  // Load data when editing
  useEffect(() => {
    if (isOpen && initialData) {
      setForm({
        id: initialData.id,
        name: initialData.name,
        no_of_leave: String(initialData.no_of_leave),
        leave_config_type: initialData.leave_config_type ?? "Yearly",
        monthly_split: Boolean(initialData.monthly_split),
        leave_carry_forward: Boolean(initialData.leave_carry_forward),
        carry_forward_limit: Number(initialData.carry_forward_limit ?? 0),
      });
    }
  }, [isOpen, initialData]);

  const change = (k: string, v: any) => {
    setForm((p) => ({ ...p, [k]: v }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      carry_forward_limit: form.leave_carry_forward ? form.carry_forward_limit : 0,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-[#0f1724] rounded-xl">

        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          {/* Leave Name */}
          <div>
            <Label>Leave Name</Label>
            <Input
              value={form.name}
              onChange={(e) => change("name", e.target.value)}
            />
          </div>

          {/* No of Leave + Yearly/Monthly */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Number of Leave</Label>
              <Input
                type="number"
                value={form.no_of_leave}
                onChange={(e) => change("no_of_leave", e.target.value)}
              />
            </div>

            <div>
              <Label>Yearly / Monthly</Label>
              <select
                value={form.leave_config_type}
                onChange={(e) => change("leave_config_type", e.target.value)}
                className="w-full h-11 px-3 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>

          {/* Monthly Split */}
          <div className="flex items-center gap-6">
            <Label>Monthly Split</Label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="monthly_split_edit"
                checked={form.monthly_split}
                onChange={() => change("monthly_split", true)}
              />
              Yes
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="monthly_split_edit"
                checked={!form.monthly_split}
                onChange={() => {
                  change("monthly_split", false);
                  change("leave_carry_forward", false);
                  change("carry_forward_limit", 0);
                }}
              />
              No
            </label>
          </div>

          {/* Leave Carry Forward (only when monthly_split = true) */}
          {form.monthly_split && (
            <div className="flex items-center gap-6">
              <Label>Leave Carry Forward</Label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="carry_forward_edit"
                  checked={form.leave_carry_forward}
                  onChange={() => change("leave_carry_forward", true)}
                />
                Yes
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="carry_forward_edit"
                  checked={!form.leave_carry_forward}
                  onChange={() => {
                    change("leave_carry_forward", false);
                    change("carry_forward_limit", 0);
                  }}
                />
                No
              </label>
            </div>
          )}

          {/* Carry Forward Limit – only when both true */}
          {form.monthly_split && form.leave_carry_forward && (
            <div>
              <Label>Carry Forward Limit</Label>
              <Input
                type="number"
                value={form.carry_forward_limit}
                onChange={(e) => change("carry_forward_limit", e.target.value)}
              />
            </div>
          )}

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-primary text-white" onClick={handleSubmit}>
            Update
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default LeaveEditModal;
