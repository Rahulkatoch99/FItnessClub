// components/Dashboard.tsx
import { Box, Container, Grid, Card, Typography, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { AddMemberDialog } from "../member-page/components/member-details";
import { data } from "../member-page/data";

interface Member {
  name: string;
  plan: string;
  dueDate?: string; // dd/mm/yyyy
  [key: string]: any;
}


export const Dashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [members, setMembers] = useState<Member[]>(data);

  console.log(members);

  // Get today's date without time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiredMembers = members.filter((m) => m.status === "Expired");

const stats = [
  { title: "Total Members", value: members.length },
  {
    title: "Active Plans",
    value: members.filter((m) => m.status === "Active").length,
  },
  {
    title: "Pending Fees",
    value: members.filter((m) => m.status === "Pending").length,
  },
  {
    title: "Expired Memberships",
    value: members.filter((m) => m.status === "Expired").length,
  },
];


  const handleAddMember = (member: Member) => {
    setMembers((prev) => [member, ...prev]);
  };

  // Scroll refs
  const recentRef = useRef<HTMLDivElement>(null);
  const expiredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return undefined; // null check

      const scrollContainer = ref.current;
      const scrollStep = 1;
      const speed = 50;

      const interval = setInterval(() => {
        if (
          scrollContainer.scrollTop >=
          scrollContainer.scrollHeight - scrollContainer.clientHeight
        ) {
          scrollContainer.scrollTop = 0;
        } else {
          scrollContainer.scrollTop += scrollStep;
        }
      }, speed);

      return interval;
    };

    const recentInterval = scroll(recentRef);
    const expiredInterval = scroll(expiredRef);

    return () => {
      if (recentInterval) clearInterval(recentInterval);
      if (expiredInterval) clearInterval(expiredInterval);
    };
  }, [members]);

  return (
    <Box sx={{ minHeight: "95vh", backgroundColor: "#0a0a0f", py: 5 }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          sx={{ color: "#ff6835", fontWeight: 700, mb: 4, textAlign: "center" }}
        >
        Dashboard
        </Typography>

        <Box sx={{ textAlign: { xs: "center", md: "right" }, mb: 3 }}>
          <Button
            onClick={() => setOpenDialog(true)}
            sx={{
              backgroundColor: "#ff6835",
              color: "#fff",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "6px",
              px: 3,
              py: 1.5,
              "&:hover": { backgroundColor: "#e65c2f" },
            }}
          >
            Add New Member
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Card
                sx={{
                  backgroundColor: "rgba(30,30,38,0.85)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 2,
                  p: 3,
                  textAlign: "center",
                }}
              >
                <Typography sx={{ color: "#aaa", fontWeight: 500, mb: 1 }}>
                  {stat.title}
                </Typography>
                <Typography
                  sx={{ color: "#ff6835", fontWeight: 700, fontSize: "28px" }}
                >
                  {stat.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Members Lists */}
        <Box sx={{ mt: 5 }}>
          <Grid container spacing={3}>
            {/* Recent Members */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  backgroundColor: "rgba(30,30,38,0.85)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 2,
                  p: 3,
                  overflow: "hidden",
                  height: 250,
                }}
              >
                <Typography sx={{ color: "#ff6835", fontWeight: 700, mb: 2 }}>
                  Recent Members
                </Typography>
                <Box
                  ref={recentRef}
                  sx={{ overflow: "hidden", height: "200px" }}
                >
                  {members.map((member, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#fff",
                        py: 1,
                        px: 1,
                        borderBottom: "1px solid #333",
                      }}
                    >
                      <Typography>{member.name}</Typography>
                      <Typography>{member.plan}</Typography>
                    </Box>
                  ))}
                </Box>
              </Card>
            </Grid>

            {/* Expired Members */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  backgroundColor: "rgba(30,30,38,0.85)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 2,
                  p: 3,
                  overflow: "hidden",
                  height: 250,
                }}
              >
                <Typography sx={{ color: "#ff6835", fontWeight: 700, mb: 2 }}>
                  Membership Expired
                </Typography>
                <Box
                  ref={expiredRef}
                  sx={{ overflow: "hidden", height: "200px" }}
                >
                  {expiredMembers.length === 0 ? (
                    <Typography sx={{ color: "#aaa" }}>
                      No expired memberships
                    </Typography>
                  ) : (
                    expiredMembers.map((member, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          color: "#fff",
                          py: 1,
                          px: 1,
                          borderBottom: "1px solid #333",
                        }}
                      >
                        <Typography>{member.name}</Typography>
                        <Typography>{member.plan}</Typography>
                      </Box>
                    ))
                  )}
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <AddMemberDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleAddMember}
      />
    </Box>
  );
};
