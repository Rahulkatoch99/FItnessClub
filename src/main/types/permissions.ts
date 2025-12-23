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

const base64UrlToBase64 = (input: string) =>
  input.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (input.length % 4)) % 4);

// Extract permissions from a JWT-ish token (payload.permissions: string[]).
// Fails closed ([]) when the token is missing/invalid to avoid exposing admin menus.
export function decodePermissionsFromToken(token: string | null): PermissionKey[] {
  if (!token) return [];

  const parts = token.split(".");
  if (parts.length < 2) return [];

  try {
    const payload = JSON.parse(atob(base64UrlToBase64(parts[1])));
    const perms = payload?.permissions;
    if (Array.isArray(perms)) {
      return perms.filter((p): p is PermissionKey => typeof p === "string");
    }
  } catch (error) {
    console.warn("Failed to decode permissions from token", error);
  }

  return [];
}

