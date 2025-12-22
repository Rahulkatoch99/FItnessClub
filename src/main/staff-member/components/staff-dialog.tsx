// components/staff-page/components/add-staff-dialog.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

interface Staff {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive" | "On Leave";
}

interface AddStaffDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (staff: Staff) => void;
}

export const AddStaffDialog = ({
  open,
  onClose,
  onSave,
}: AddStaffDialogProps) => {
  const [staffData, setStaffData] = useState<Omit<Staff, "id">>({
    name: "",
    role: "",
    phone: "",
    email: "",
    status: "Active",
  });

  const handleChange = (field: keyof Omit<Staff, "id">, value: string) => {
    setStaffData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const newStaff: Staff = {
      id: Date.now(), // simple unique ID
      ...staffData,
    };
    onSave(newStaff);
    setStaffData({
      name: "",
      role: "",
      phone: "",
      email: "",
      status: "Active",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: "#ff6835", fontWeight: 700 }}>
        Add New Staff
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={staffData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <TextField
          label="Role"
          variant="outlined"
          fullWidth
          value={staffData.role}
          onChange={(e) => handleChange("role", e.target.value)}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          value={staffData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={staffData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <TextField
          select
          label="Status"
          variant="outlined"
          fullWidth
          value={staffData.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
          <MenuItem value="On Leave">On Leave</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#fff",
            backgroundColor: "#333",
            "&:hover": { backgroundColor: "#444" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          sx={{
            color: "#fff",
            backgroundColor: "#ff6835",
            "&:hover": { backgroundColor: "#e65c2f" },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
