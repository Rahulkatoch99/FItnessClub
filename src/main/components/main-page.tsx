// LayoutMainPageLayout.tsx
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import MembersPage from "../member-page/member";
import { Dashboard } from "../dashboard/dashboard";
import { StaffPage } from "../staff-member/staff-member-page";
import { MembershipTypePage } from "../membership-type/membership-type";
import AccountantPage from "../accountant/accountant-page";
import AttendancePage from "../attendance/attendance";
import {
  ALL_PERMISSIONS,
  PERMISSION_KEYS,
  type PermissionKey,
  decodePermissionsFromToken,
} from "../types/permissions";
// import Dashboard from "../dashboard/dashboard"; // Example

const pagePermissionMap: Record<string, PermissionKey> = {
  Dashboard: PERMISSION_KEYS.DASHBOARD_VIEW,
  "Staff Member": PERMISSION_KEYS.STAFF_MANAGE,
  "Membership Type": PERMISSION_KEYS.MEMBERSHIP_TYPE_VIEW,
  Member: PERMISSION_KEYS.MEMBER_VIEW,
  Attendance: PERMISSION_KEYS.ATTENDANCE_VIEW,
  Accountant: PERMISSION_KEYS.ACCOUNTANT_VIEW,
};

export const LayoutMainPageLayout = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [permissions, setPermissions] = useState<PermissionKey[]>(ALL_PERMISSIONS);

  // In a real app, replace localStorage read with your auth context/provider.
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setPermissions(decodePermissionsFromToken(token));
  }, []);

  const activePagePermission = pagePermissionMap[activePage];

  const renderPage = () => {
    if (activePagePermission && !permissions.includes(activePagePermission)) {
      return (
        <div style={{ padding: 24, fontWeight: 600 }}>
          You do not have access to view "{activePage}".
        </div>
      );
    }

    switch (activePage) {
      case "Member":
        return <MembersPage />;
      case "Dashboard":
        return <Dashboard />;
      case "Staff Member":
        return <StaffPage />;
      case "Membership Type":
        return <MembershipTypePage />;
      case "Accountant":
        return <AccountantPage />;
      case "Attendance":
        return <AttendancePage />;

      // add more sidebar items here
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onSelect={setActivePage} permissions={permissions} />
      <div style={{ flex: 1, background: "#f5f6fa", padding: 20 }}>
        {renderPage()}
      </div>
    </div>
  );
};
