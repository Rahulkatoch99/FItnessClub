import {
  Box,
  Container,
  Card,
  Typography,
  Button,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { AddStaffDialog } from "./components/staff-dialog";
import { Staff } from "../types";
import { staffData } from "../member-page/data";

export const StaffPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [staffMembers, setStaffMembers] = useState<Staff[]>(staffData);

  const activeStaff = staffMembers.filter((s) => s.status === "Active");
  const inactiveStaff = staffMembers.filter((s) => s.status === "Inactive");
  const leaveStaff = staffMembers.filter((s) => s.status === "On Leave");

  const stats = [
    { title: "Total Staff", value: staffMembers.length },
    { title: "Active Staff", value: activeStaff.length },
    { title: "Inactive Staff", value: inactiveStaff.length },
    { title: "On Leave", value: leaveStaff.length },
  ];

  const handleAddStaff = (staff: Staff) => {
    setStaffMembers((prev) => [staff, ...prev]);
  };

  const renderStaffCards = (staffList: Staff[]) => (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        py: 1,
        flexWrap: { xs: "wrap", md: "nowrap" },
        justifyContent: { xs: "center", md: "flex-start" },
        overflowX: { xs: "visible", md: "auto" },
        scrollBehavior: "smooth",
      }}
    >
      {staffList.length ? (
        staffList.map((staff) => (
          <Card
            key={staff.id}
            sx={{
              minWidth: { xs: "48%", sm: 200, md: 220 },
              flex: { xs: "1 1 48%", md: "0 0 auto" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
              backgroundColor: "#16161d",
              borderRadius: 2,
              textAlign: "center",
              boxShadow: "0 0 12px rgba(0,0,0,0.45)",
            }}
          >
            <Avatar
              src={staff.avatar || ""}
              sx={{ width: 80, height: 80, mb: 2 }}
            />
            <Typography sx={{ color: "#fff", fontWeight: 700, mb: 0.3 }}>
              {staff.name}
            </Typography>
            <Typography sx={{ color: "#ff6835", mb: 0.5 }}>
              {staff.role}
            </Typography>
            <Typography sx={{ color: "#c6c6c6", fontSize: 14 }}>
              {staff.email}
            </Typography>
            <Typography sx={{ color: "#c6c6c6", fontSize: 14 }}>
              {staff.phone}
            </Typography>
          </Card>
        ))
      ) : (
        <Typography sx={{ color: "#777", px: 1 }}>No staff found</Typography>
      )}
    </Box>
  );

  return (
    <Box sx={{ minHeight: "95vh", backgroundColor: "#0a0a0f", py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl" sx={{ position: "relative", px: { xs: 2, md: 3 } }}>
        {/* Add Button */}
        <Box
          sx={{
            position: { xs: "static", md: "absolute" },
            top: 8,
            right: 0,
            mb: { xs: 2, md: 0 },
            textAlign: { xs: "center", md: "right" },
          }}
        >
          <Button
            onClick={() => setOpenDialog(true)}
            sx={{
              backgroundColor: "#ff6835",
              color: "#fff",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 1,
              px: 3,
              py: 1.2,
              "&:hover": { backgroundColor: "#e65c2f" },
            }}
          >
            Add Staff
          </Button>
        </Box>

        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            color: "#ff6835",
            fontWeight: 700,
            mb: { xs: 3, md: 4 },
            textAlign: "center",
            letterSpacing: 0.5,
          }}
        >
          Staff Members
        </Typography>

        {/* Stats */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: { xs: 4, md: 6 } }}>
          {stats.map((stat) => (
            <Card
              key={stat.title}
              sx={{
                flex: "1 1 140px",
                backgroundColor: "#16161d",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                boxShadow: "0 0 12px rgba(0,0,0,0.35)",
              }}
            >
              <Typography sx={{ color: "#c6c6c6", fontWeight: 500, mb: 1 }}>
                {stat.title}
              </Typography>
              <Typography
                sx={{ color: "#ff6835", fontWeight: 700, fontSize: "28px" }}
              >
                {stat.value}
              </Typography>
            </Card>
          ))}
        </Box>

        <Box
          sx={{
            maxHeight: { xs: "none", md: "560px" },
            overflowY: { xs: "visible", md: "auto" },
          }}
        >
          {/* STAFF SECTIONS */}
          <Accordion defaultExpanded sx={{ backgroundColor: "#101015" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#ff6835" }} />}
            >
              <Typography sx={{ color: "#ff6835", fontWeight: 700 }}>
                Active Staff ({activeStaff.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: { xs: 1, md: 2 } }}>
              <Box
                sx={{
                  maxHeight: { xs: "none", md: "240px" },
                  overflowY: { xs: "visible", md: "auto" },
                  pr: { xs: 0, md: 1 },
                }}
              >
                {renderStaffCards(activeStaff)}
              </Box>
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ borderColor: "#222" }} />
          <Accordion sx={{ backgroundColor: "#101015" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#ff6835" }} />}
            >
              <Typography sx={{ color: "#ff6835", fontWeight: 700 }}>
                Inactive Staff ({inactiveStaff.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: { xs: 1, md: 2 } }}>
              <Box
                sx={{
                  maxHeight: { xs: "none", md: "240px" },
                  overflowY: { xs: "visible", md: "auto" },
                  pr: { xs: 0, md: 1 },
                }}
              >
                {renderStaffCards(inactiveStaff)}
              </Box>
            </AccordionDetails>
          </Accordion>
          <Divider sx={{ borderColor: "#222" }} />
          <Accordion sx={{ backgroundColor: "#101015" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#ff6835" }} />}
            >
              <Typography sx={{ color: "#ff6835", fontWeight: 700 }}>
                Staff On Leave ({leaveStaff.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: { xs: 1, md: 2 } }}>
              <Box
                sx={{
                  maxHeight: { xs: "none", md: "240px" },
                  overflowY: { xs: "visible", md: "auto" },
                  pr: { xs: 0, md: 1 },
                }}
              >
                {renderStaffCards(leaveStaff)}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>

      <AddStaffDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleAddStaff}
      />
    </Box>
  );
};
