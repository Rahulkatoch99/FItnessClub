import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

type StoredUser = {
  id?: number;
  name?: string;
  plan?: string;
  phone?: string;
  username?: string;
  address?: string;
  avatar?: string;
  dueDate?: string;
};

const getStoredUser = (): StoredUser | null => {
  try {
    const raw = localStorage.getItem("current_user");
    if (!raw) return null;
    return JSON.parse(raw) as StoredUser;
  } catch (error) {
    console.warn("Failed to parse stored user", error);
    return null;
  }
};

const ProfileField = ({ label, value }: { label: string; value?: string }) => (
  <Box sx={{ mb: 1.2 }}>
    <Typography sx={{ color: "#888", fontSize: 13 }}>{label}</Typography>
    <Typography sx={{ color: "#fff", fontWeight: 600 }}>
      {value || "-"}
    </Typography>
  </Box>
);

const ProfilePage = () => {
  const user = getStoredUser();

  if (!user) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, color: "#fff" }}>
        <Card
          sx={{
            background: "#16161d",
            border: "1px solid #272737",
            p: 3,
          }}
        >
          <Typography sx={{ color: "#ff6835", fontWeight: 700, mb: 1 }}>
            Profile
          </Typography>
          <Typography sx={{ color: "#ccc" }}>
            No profile data found. Please sign in again.
          </Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, color: "#fff" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "#ff6835", mb: 3 }}
      >
        Profile
      </Typography>

      <Card
        sx={{
          background: "#16161d",
          border: "1px solid #272737",
          p: { xs: 2, md: 3 },
          boxShadow: "0 0 18px rgba(0,0,0,0.40)",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{ width: 96, height: 96, bgcolor: "#ff6835" }}
              />
              <Typography sx={{ fontWeight: 700, color: "#fff", mt: 1 }}>
                {user.name}
              </Typography>
              {user.plan && (
                <Chip
                  label={user.plan}
                  sx={{
                    bgcolor: "#ff6835",
                    color: "#fff",
                    fontWeight: 700,
                  }}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <CardContent sx={{ p: 0 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <ProfileField label="Phone / Username" value={user.username} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ProfileField label="Contact" value={user.phone} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ProfileField label="Plan" value={user.plan} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ProfileField label="Due Date" value={user.dueDate} />
                </Grid>
                <Grid item xs={12}>
                  <ProfileField label="Address" value={user.address} />
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ProfilePage;

