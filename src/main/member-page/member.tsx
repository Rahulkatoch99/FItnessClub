import { useState } from "react";
import { MemberHeader } from "./components/member-header";
import DataTable from "../../components/table/table";
import { ColumnDef } from "@tanstack/react-table";
import { Box, IconButton, Container } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MemberDetailsDialog from "../member-details/member-details";
import { Member } from "./types";
import { data } from "./data";
import { AddMemberDialog } from "./components/member-details";

const MembersPage = () => {
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState<Member[]>(data);
  const [openDialog, setOpenDialog] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [allowEdit, setAllowEdit] = useState(false);

  const handleAddNew = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSaveMember = (newMember: Omit<Member, "id" | "status">) => {
    setMembers((prev) => [
      ...prev,
      { ...newMember, id: prev.length + 1, status: "Active" },
    ]);
  };

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setAllowEdit(false);
    setDetailsOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setAllowEdit(true);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedMember(null);
  };

  const handleUpdateMember = (updatedMember: Member) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === updatedMember.id ? { ...m, ...updatedMember } : m
      )
    );
    setSelectedMember(updatedMember);
  };

  const filteredData = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search)
  );

  const columns: ColumnDef<Member>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "plan", header: "Plan" },
    { accessorKey: "fees", header: "Fees (₹)" },
    { accessorKey: "membership_month", header: "Months" },
    { accessorKey: "joinDate", header: "Join Date" },
    { accessorKey: "dueDate", header: "Due Date" },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;

        const colors: Record<string, string> = {
          Active: "#0c7912ff",
          Pending: "#FFA500",
          Expired: "#D32F2F",
        };

        return (
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "18px",
              color: "white",
              backgroundColor: colors[status] || "#0c7912ff",
              fontSize: "13px",
            }}
          >
            {status}
          </span>
        );
      },
    },

    {
      accessorKey: "remainingDays",
      header: "Remaining Days",
      cell: ({ row }) => {
        const today = new Date();
        const dueDate = new Date(row.original.dueDate);
        const diffTime = dueDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert ms to days
        return <span>{diffDays > 0 ? diffDays : 0}</span>;
      },
    },

    {
      header: "Action",
      cell: ({ row }) => (
        <Box display="flex" gap={1}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleViewMember(row.original)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            size="small"
            color="success"
            onClick={() => handleEditMember(row.original)}
          >
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ minHeight: "auto", py: { xs: 2, md: 3 } }}>
      <Container
        component="main"
        maxWidth="xl"
        sx={{ px: { xs: 1.25, sm: 1.75, md: 3 } }}
      >
        <MemberHeader
          search={search}
          setSearch={setSearch}
          onAddNew={handleAddNew}
        />
        <Box sx={{ mt: { xs: 1.25, md: 2.5 } }}>
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: { xs: "0 8px 18px rgba(0,0,0,0.35)", md: "none" },
            }}
          >
            <DataTable data={filteredData} columns={columns} />
          </Box>
        </Box>
      </Container>
      <AddMemberDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSaveMember}
      />
      <MemberDetailsDialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        member={selectedMember}
        onSave={handleUpdateMember}
        allowEdit={allowEdit}
      />
    </Box>
  );
};

export default MembersPage;
