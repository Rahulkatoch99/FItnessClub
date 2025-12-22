import { Box, Button, Typography } from "@mui/material";
import SearchInput from "../../../components/searchFilter/search-filter";

interface TableHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  onAddNew: () => void;
  title?: string;
}

export const MemberHeader = ({
  search,
  setSearch,
  onAddNew,
  title = "Members",
}: TableHeaderProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Heading centered */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}>
        {/* Left accent bar */}
        <Box
          sx={{
            width: 6,
            height: 40,
            backgroundColor: "#1976d2",
            borderRadius: 2,
          }}
        />

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#1d2a30",
            fontSize: { xs: "18px", sm: "20px", md: "22px" },
          }}
        >
          {title}
        </Typography>

        {/* Optional: Subtitle */}
        <Typography variant="subtitle2" sx={{ color: "#6c757d", ml: 1 }}>
          Manage your members effectively
        </Typography>
      </Box>

      {/* Search and Button row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Left: Search Input */}
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or phone"
          width={300}
        />

        {/* Right: Add New Member Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={onAddNew}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          Add New Member
        </Button>
      </Box>
    </Box>
  );
};
