// Central permission keys shared between sidebar and page routing.
export const PERMISSION_KEYS = {
  DASHBOARD_VIEW: "dashboard:view",
  STAFF_MANAGE: "staff:manage",
  MEMBERSHIP_TYPE_VIEW: "membership-type:view",
  MEMBER_VIEW: "member:view",
  GROUP_VIEW: "group:view",
  CLASS_SCHEDULE_VIEW: "class-schedule:view",
  ATTENDANCE_VIEW: "attendance:view",
  ACCOUNTANT_VIEW: "accountant:view",
  PROFILE_VIEW: "profile:view",
  EXERCISE_LOG_VIEW: "exercise-log:view",
  WORKOUT_PLAN_VIEW: "workout-plan:view",
} as const;

export type PermissionKey = (typeof PERMISSION_KEYS)[keyof typeof PERMISSION_KEYS];

export const ALL_PERMISSIONS: PermissionKey[] = Object.values(PERMISSION_KEYS);

// Extract permissions from a JWT-ish token (payload.permissions: string[]).
// Falls back to ALL_PERMISSIONS so the UI still renders in dev if no token exists.
export function decodePermissionsFromToken(token: string | null): PermissionKey[] {
  if (!token) return ALL_PERMISSIONS;

  const parts = token.split(".");
  if (parts.length < 2) return ALL_PERMISSIONS;

  try {
    const payload = JSON.parse(atob(parts[1]));
    const perms = payload?.permissions;
    if (Array.isArray(perms)) {
      return perms.filter((p): p is PermissionKey => typeof p === "string");
    }
  } catch (error) {
    console.warn("Failed to decode permissions from token", error);
  }

  return ALL_PERMISSIONS;
}

