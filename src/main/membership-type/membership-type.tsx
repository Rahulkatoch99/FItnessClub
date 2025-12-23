import { useMemo, useState } from "react";
import {
  Box,
  Card,
  IconButton,
  Typography,
  Grid,
  Button,
  Chip,
  Tooltip,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PaymentIcon from "@mui/icons-material/Payment";
import { membershipTypeData } from "./types";

const base64UrlToBase64 = (input: string) =>
  input.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (input.length % 4)) % 4);

const decodeRoleFromToken = (token: string | null) => {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = JSON.parse(atob(base64UrlToBase64(parts[1])));
    return payload?.role ?? null;
  } catch (error) {
    console.warn("Failed to decode role from token", error);
    return null;
  }
};

export const MembershipTypePage = () => {
  const [memberships, setMemberships] = useState(membershipTypeData);
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  const role = useMemo(() => decodeRoleFromToken(token), [token]);
  const isMemberRole = role === "member";

  const handleDelete = (id: number) => {
    setMemberships((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#ff6835",
            textAlign: { xs: "center", sm: "left" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Membership Types
        </Typography>

        {!isMemberRole && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff6835",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 1,
              px: 3,
              textTransform: "none",
              "&:hover": { backgroundColor: "#e35a2d" },
            }}
          >
            + Add Membership
          </Button>
        )}
      </Box>

      {/* Cards Section */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {memberships.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                background: "#16161d",
                borderRadius: 3,
                p: { xs: 1.6, sm: 2 },
                position: "relative",
                transition: "0.3s",
                border: "1px solid #272737",
                boxShadow: "0 0 18px rgba(0,0,0,0.40)",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 0 24px rgba(0,0,0,0.60)",
                },
              }}
            >
              {!isMemberRole && (
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      background: "#ff3e3e",
                      color: "#fff",
                      p: "4px",
                      "&:hover": { background: "#d62929" },
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              )}

              <Typography
                sx={{ color: "#fff", fontSize: 20, fontWeight: 700 }}
              >
                {item.title}
              </Typography>

              <Chip
                size="small"
                label={item.duration}
                sx={{
                  background: "#111",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: "6px",
                }}
              />

              <Typography
                sx={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: "#43d97e",
                }}
              >
                ₹ {item.price}
              </Typography>

              <Divider sx={{ borderColor: "#2c2c3e", my: 2 }} />

              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#b5b5b5",
                }}
              >
                Includes
              </Typography>

              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {item.features.map((f) => (
                  <li key={f} style={{ color: "#dcdcdc", marginBottom: 1 }}>
                    <span style={{ color: "#ff6835", marginRight: 4 }}>•</span>
                    {f}
                  </li>
                ))}
              </ul>

              {isMemberRole ? (
                <Button
                  fullWidth
                  startIcon={<PaymentIcon />}
                  sx={{
                    mt: 1,
                    textTransform: "none",
                    fontWeight: 700,
                    color: "#fff",
                    background: "#2c3e50",
                    borderRadius: "10px",
                    "&:hover": { background: "#1f2d3a" },
                  }}
                >
                  Pay
                </Button>
              ) : (
                <Button
                  fullWidth
                  startIcon={<EditIcon />}
                  sx={{
                    mt: 1,
                    textTransform: "none",
                    fontWeight: 700,
                    color: "#fff",
                    background: "#22222c",
                    borderRadius: "10px",
                    "&:hover": { background: "#2d2d38" },
                  }}
                >
                  Edit
                </Button>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
