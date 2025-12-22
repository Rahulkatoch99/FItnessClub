// components/AddMemberDialog.tsx
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Grid,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface AddMemberDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (member: any) => void; // Replace `any` with your Member type
}

// Define plans with fees and months
const planOptions = {
  Basic: { fees: 1300, months: 1 },
  Silver: { fees: 2200, months: 2 },
  Gold: { fees: 3000, months: 3 },
  Pro: { fees: 5200, months: 6 },
  Platinum: { fees: 9000, months: 12, },
};

export const AddMemberDialog = ({
  open,
  onClose,
  onSave,
}: AddMemberDialogProps) => {
  const [memberData, setMemberData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    address: "",
    plan: "",
    fees: "",
    membership_month: "",
    joinDate: "",
    dueDate: "",
    gender: "",
    profileId: "hammer-",
    password: "",
    avatar: "",
  });

  const gymPrefix = "hammer-";

  // Generic input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMemberData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setMemberData((prev) => ({ ...prev, avatar: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // Plan change handler
  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const plan = e.target.value;
    const months = planOptions[plan as keyof typeof planOptions].months;

    setMemberData((prev) => {
      let dueDate = prev.dueDate;
      if (prev.joinDate) {
        const join = new Date(prev.joinDate);
        join.setMonth(join.getMonth() + months);
        dueDate = join.toISOString().split("T")[0];
      }
      return {
        ...prev,
        plan,
        fees: planOptions[plan as keyof typeof planOptions].fees.toString(),
        membership_month: months.toString(),
        dueDate,
      };
    });
  };

  // Join date change handler
  const handleJoinDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const joinDate = e.target.value;

    setMemberData((prev) => {
      let dueDate = prev.dueDate;
      if (prev.plan) {
        const months =
          planOptions[prev.plan as keyof typeof planOptions].months;
        const join = new Date(joinDate);
        join.setMonth(join.getMonth() + months);
        dueDate = join.toISOString().split("T")[0];
      }
      return { ...prev, joinDate, dueDate };
    });
  };

  // Save member
  const handleSave = () => {
    onSave(memberData);
    setMemberData({
      name: "",
      phone: "",
      email: "",
      dob: "",
      address: "",
      plan: "",
      fees: "",
      membership_month: "",
      joinDate: "",
      dueDate: "",
      gender: "",
      profileId: gymPrefix,
      password: "",
      avatar: "",
    });
    onClose();
  };

  const textFieldStyles = {
    input: { color: "#f5f5f5" },
    "& .MuiOutlinedInput-root": {
      background: "rgba(255,255,255,0.04)",
      borderRadius: 2,
      "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
      "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
      "&.Mui-focused fieldset": { borderColor: "#ff7a45" },
    },
    label: { color: "#cfcfcf" },
    "& .MuiInputLabel-root": { color: "#cfcfcf" },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      {/* Close button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#fff",
          backgroundColor: "rgba(255,255,255,0.1)",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        sx={{
          backgroundColor: "#0d1117",
          borderRadius: 3,
          p: { xs: 3, md: 4 },
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
        }}
      >
        <Stack spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
          <Typography
            variant="h5"
            sx={{
              color: "#ff7a45",
              fontWeight: 800,
              letterSpacing: 0.3,
              textAlign: "center",
            }}
          >
            Add New Member
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#b7b7b7", textAlign: "center", maxWidth: 560 }}
          >
            Fill in the details below to add a new gym member.
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          {/* Profile photo + upload */}
          <Grid item xs={12} sm={6} md={4}>
            <Stack
              spacing={2}
              alignItems="center"
              sx={{
                backgroundColor: "#111827",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 2,
                py: 2,
                px: 2,
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              }}
            >
              <Avatar
                src={memberData.avatar}
                sx={{
                  width: 88,
                  height: 88,
                  bgcolor: "#ff7a45",
                  fontSize: 26,
                  border: "3px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 8px 24px rgba(255,122,69,0.28)",
                }}
              >
                {memberData.name
                  ? memberData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  : "U"}
              </Avatar>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  textTransform: "none",
                  borderColor: "rgba(255,122,69,0.4)",
                  color: "#ff7a45",
                  fontWeight: 700,
                  px: 2,
                  py: 0.65,
                  borderRadius: 1.4,
                  fontSize: 13,
                  "&:hover": {
                    borderColor: "#ff7a45",
                    backgroundColor: "rgba(255,122,69,0.08)",
                  },
                }}
              >
                Upload Picture
                <input type="file" accept="image/*" hidden onChange={handleFileChange} />
              </Button>
            </Stack>
          </Grid>

          {/* Basic info */}
          {/* Name */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Name"
              name="name"
              value={memberData.name}
              onChange={handleChange}
              fullWidth
              sx={textFieldStyles}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Phone"
              name="phone"
              value={memberData.phone}
              onChange={handleChange}
              fullWidth
              sx={textFieldStyles}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Email"
              name="email"
              value={memberData.email}
              onChange={handleChange}
              fullWidth
              sx={textFieldStyles}
            />
          </Grid>

          {/* Gender */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Gender"
              name="gender"
              select
              value={memberData.gender}
              onChange={handleChange}
              fullWidth
              sx={{
                ...textFieldStyles,
                "& .MuiSelect-select": { color: "#fff" },
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          </Grid>

          {/* DOB */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="DOB"
              name="dob"
              type="date"
              value={memberData.dob}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={textFieldStyles}
            />
          </Grid>

          {/* Profile ID */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Profile ID"
              name="profileId"
              value={memberData.profileId}
              onChange={handleChange}
              fullWidth
              sx={textFieldStyles}
              helperText="Starts with gym code, e.g., hammer-"
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={memberData.password}
              onChange={handleChange}
              fullWidth
              sx={textFieldStyles}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={memberData.address}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              sx={textFieldStyles}
            />
          </Grid>

          {/* Plan */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Plan"
              name="plan"
              select
              value={memberData.plan}
              onChange={handlePlanChange}
              fullWidth
              sx={{
                ...textFieldStyles,
                "& .MuiSelect-select": { color: "#fff" },
                "& .MuiMenuItem-root": {
                  color: "#fff",
                  backgroundColor: "#1e1e26",
                  "&:hover": { backgroundColor: "#2a2a33" },
                },
              }}
            >
              {Object.keys(planOptions).map((plan) => (
                <MenuItem key={plan} value={plan}>
                  {plan}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Fees */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Fees"
              name="fees"
              type="string"
              value={memberData.fees}
              onChange={handleChange}
              fullWidth
              sx={textFieldStyles}
            />
          </Grid>

          {/* Membership Months */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Membership Months"
              name="membership_month"
              type="string"
              value={memberData.membership_month}
              onChange={handleChange}
              fullWidth
              sx={textFieldStyles}
            />
          </Grid>

          {/* Join Date */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Join Date"
              name="joinDate"
              type="date"
              value={memberData.joinDate}
              onChange={handleJoinDateChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={textFieldStyles}
            />
          </Grid>

          {/* Due Date (read-only if needed) */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Due Date"
              name="dueDate"
              type="date"
              value={memberData.dueDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={textFieldStyles}
            />
          </Grid>
        </Grid>

        {/* Save button */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              backgroundColor: "#ff6835",
              color: "#fff",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "6px",
              py: 1.5,
              width: "200px",
              "&:hover": { backgroundColor: "#e65c2f" },
            }}
          >
            Save Member
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
