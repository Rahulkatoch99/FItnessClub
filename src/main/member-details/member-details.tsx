import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  TextField,
  Box,
  Button,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { Member } from "../member-page/types";

interface MemberDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  member: Member | null;
  onSave: (member: Member) => void;
  allowEdit?: boolean;
}

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 2,
    "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&.Mui-focused fieldset": { borderColor: "#ff7a45" },
  },
  "& .MuiInputLabel-root": { color: "#b0b0b0" },
};

const MemberDetailsDialog = ({
  open,
  onClose,
  member,
  onSave,
  allowEdit = false,
}: MemberDetailsDialogProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<Member | null>(null);

  useEffect(() => {
    if (member) setFormData(member);
    setIsEdit(allowEdit); // start in edit mode only when allowed
  }, [member, allowEdit]);

  if (!formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev!, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEdit(false);
  };

  const handleClose = () => {
    setIsEdit(false);
    onClose();
  };

  const initials = formData.name
    ? formData.name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const statusColors: Record<string, { bg: string; color: string }> = {
    Active: { bg: "rgba(16,185,129,0.15)", color: "#34d399" },
    Pending: { bg: "rgba(251,191,36,0.2)", color: "#fbbf24" },
    Expired: { bg: "rgba(239,68,68,0.2)", color: "#f87171" },
  };

  const statusStyle = statusColors[formData.status] || statusColors.Active;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          mx: { xs: 1.5, sm: 2, md: "auto" },
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#fff",
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        sx={{
          background: "linear-gradient(135deg, #0b0c12 0%, #0f1724 100%)",
          borderRadius: 3,
          p: { xs: 2.5, md: 4 },
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
        }}
      >
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Left column: avatar + summary */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                p: { xs: 2, md: 3 },
                borderRadius: 2.5,
                background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
              }}
            >
              <Avatar
                src={formData.avatar}
                alt={formData.name}
                sx={{
                  width: { xs: 96, md: 120 },
                  height: { xs: 96, md: 120 },
                  bgcolor: "#ff7a45",
                  fontSize: { xs: 24, md: 28 },
                  boxShadow: "0 10px 30px rgba(255,122,69,0.35)",
                  border: "3px solid rgba(255,255,255,0.12)",
                }}
              >
                {initials}
              </Avatar>

              <Box textAlign="center">
                <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                  {formData.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#aaa" }}>
                  {formData.plan || "Plan not set"}
                </Typography>
              </Box>

              <Chip
                label={formData.status ?? "Active"}
                sx={{
                  backgroundColor: statusStyle.bg,
                  color: statusStyle.color,
                  fontWeight: 700,
                  letterSpacing: 0.3,
                  px: 1,
                  py: 0.5,
                }}
              />
            </Box>
          </Grid>

          {/* Right column: details */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#ff7a45",
                  fontWeight: 800,
                  letterSpacing: 0.3,
                  mb: 1,
                }}
              >
                Member Details
              </Typography>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

              <Grid container spacing={{ xs: 1.5, md: 2 }}>
                {[
                  ["name", "Name"],
                  ["phone", "Phone"],
                  ["email", "Email"],
                  ["dob", "DOB"],
                  ["plan", "Plan"],
                  ["fees", "Fees"],
                  ["membership_month", "Membership Months"],
                  ["joinDate", "Join Date"],
                  ["dueDate", "Due Date"],
                ].map(([key, label]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      name={key}
                      label={label}
                      value={(formData as any)[key] ?? ""}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{ readOnly: !isEdit }}
                      sx={textFieldStyles}
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <TextField
                    name="address"
                    label="Address"
                    value={formData.address ?? ""}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    InputProps={{ readOnly: !isEdit }}
                    sx={textFieldStyles}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Actions */}
        {allowEdit && (
          <Box
            sx={{
              mt: { xs: 3, md: 4 },
              display: "flex",
              justifyContent: "center",
              gap: { xs: 1.5, md: 2 },
              flexWrap: "wrap",
            }}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                color: "#cfcfcf",
                borderColor: "rgba(255,255,255,0.12)",
                fontWeight: 600,
                px: 3,
                borderRadius: 2,
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #ff7a45, #ff5c8a)",
                fontWeight: 800,
                px: 3,
                borderRadius: 2,
                boxShadow: "0 12px 30px rgba(255,122,69,0.35)",
                "&:hover": {
                  background: "linear-gradient(135deg, #ff8c5c, #ff6aa0)",
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MemberDetailsDialog;
