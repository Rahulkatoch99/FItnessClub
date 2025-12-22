import { useEffect, useMemo, useState, type ReactNode } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import BadgeIcon from "@mui/icons-material/Badge";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PERMISSION_KEYS, type PermissionKey } from "../../main/types/permissions";

type SidebarItem = {
  title: string;
  icon: ReactNode;
  permission?: PermissionKey;
};

const items: SidebarItem[] = [
  { title: "Dashboard", icon: <DashboardIcon />, permission: PERMISSION_KEYS.DASHBOARD_VIEW },
  { title: "Staff Member", icon: <SupportAgentIcon />, permission: PERMISSION_KEYS.STAFF_MANAGE },
  { title: "Membership Type", icon: <BadgeIcon />, permission: PERMISSION_KEYS.MEMBERSHIP_TYPE_VIEW },
  { title: "Member", icon: <PersonIcon />, permission: PERMISSION_KEYS.MEMBER_VIEW },
  { title: "Group", icon: <GroupsIcon />, permission: PERMISSION_KEYS.GROUP_VIEW },
  { title: "Class Schedule", icon: <CalendarMonthIcon />, permission: PERMISSION_KEYS.CLASS_SCHEDULE_VIEW },
  { title: "Attendance", icon: <FactCheckIcon />, permission: PERMISSION_KEYS.ATTENDANCE_VIEW },
  { title: "Accountant", icon: <AccountBalanceIcon />, permission: PERMISSION_KEYS.ACCOUNTANT_VIEW },
];

export default function Sidebar({
  onSelect,
  permissions,
}: {
  onSelect: (name: string) => void;
  permissions?: PermissionKey[];
}) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [active, setActive] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const visibleItems = useMemo(
    () =>
      items.filter(
        (item) =>
          !item.permission || !permissions || permissions.includes(item.permission)
      ),
    [permissions]
  );

  const navActive = "#ff6835";
  const navHover = "#1C2C33";
  const sidebarBg = "#0a0a0f";
  const collapsedWidth = "80px";
  const expandedWidth = "250px";

  const handleClick = (item: string) => {
    setActive(item);
    onSelect(item);
    if (isMobile) setCollapsed(true);
  };

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  // Keep the active tab in sync with allowed menu items.
  useEffect(() => {
    if (!visibleItems.length) return;
    const stillAllowed = visibleItems.some((item) => item.title === active);
    if (!stillAllowed) {
      const next = visibleItems[0].title;
      setActive(next);
      onSelect(next);
    }
  }, [active, visibleItems, onSelect]);

  const handleSignOut = () => {
    console.log("Sign Out Clicked");
    navigate("/");
    // Add your signout logic here
  };

  return (
    <>
      {/* Mobile toggle button when collapsed */}
      {isMobile && collapsed && (
        <IconButton
          onClick={() => setCollapsed(false)}
          sx={{
            position: "fixed",
            top: 12,
            left: 12,
            zIndex: 1300,
            bgcolor: "rgba(0,0,0,0.6)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
          }}
          size="large"
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile overlay */}
      {!collapsed && isMobile && (
        <Box
          onClick={() => setCollapsed(true)}
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.45)",
            zIndex: 1099,
          }}
        />
      )}

      <Box
        sx={{
          width: {
            xs: collapsed ? 0 : "72vw",
            sm: collapsed ? collapsedWidth : expandedWidth,
          },
          maxWidth: { xs: "72vw", sm: collapsed ? collapsedWidth : expandedWidth },
          minWidth: { xs: 0, sm: collapsed ? collapsedWidth : expandedWidth },
          height: "100vh",
          maxHeight: "100vh",
          overflowY: "auto",
          bgcolor: sidebarBg,
          color: "#B8C5CA",
          transition: "width 0.3s ease",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          position: { xs: "fixed", sm: "relative" },
          top: 0,
          left: 0,
          zIndex: 1100,
          boxShadow: { xs: "0 8px 24px rgba(0,0,0,0.35)", sm: "none" },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            px: collapsed ? 1 : 2,
            py: 2,
          }}
        >
          {!collapsed && (
            <span style={{ fontSize: 20, color: "white", fontWeight: 700 }}>
              FITNESS CLUB
            </span>
          )}
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{ color: "#B8C5CA" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "#1C2C33" }} />

        {/* Menu */}
        <List sx={{ mt: 1, flex: 1 }}>
          {visibleItems.map((item) => {
            const isActive = active === item.title;
            return (
              <ListItemButton
                key={item.title}
                onClick={() => handleClick(item.title)}
                sx={{
                  py: 1.2,
                  borderLeft: isActive
                    ? `6px solid ${navActive}`
                    : "6px solid transparent",
                  bgcolor: isActive ? navActive : "transparent",
                  color: isActive ? "#fff" : "#B8C5CA",
                  "&:hover": {
                    bgcolor: isActive ? navActive : navHover,
                    color: "#fff",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "#fff" : "#B8C5CA",
                    minWidth: collapsed ? "100%" : 38,
                    display: "flex",
                    justifyContent: collapsed ? "center" : "flex-start",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{ fontSize: 14 }}
                  />
                )}
              </ListItemButton>
            );
          })}
        </List>

        {/* Sign Out Button */}
        <ListItemButton
          onClick={handleSignOut}
          sx={{
            py: 1.5,
            mt: "auto",
            borderTop: "1px solid #333",
            "&:hover": { bgcolor: navHover, color: "#fff" },
          }}
        >
          <ListItemIcon sx={{ color: "#B8C5CA" }}>
            <LogoutIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Sign Out" />}
        </ListItemButton>
      </Box>
    </>
  );
}
