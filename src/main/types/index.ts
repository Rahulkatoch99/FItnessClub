export interface Staff {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive" | "On Leave";
  avatar?: string;
}

export interface Member {
  name: string;
  phone: string;
  email: string;
  dob: string;
  address: string;
  plan: string;
  fees: number;
  membership_month: number;
  joinDate: string;
  dueDate: string;
  status?: "Active" | "Inactive" | "Expired";
}

export interface MemberDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  member: Member | null;
}
