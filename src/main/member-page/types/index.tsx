export interface Member {
  id: number;
  name: string;
  username: string;
  phone: string;
  plan: string;
  joinDate: string;
  fees: string;
  membership_month: string;
  dueDate: string;
  status: "Active" | "Pending" | "Expired";
  email?: string;
  dob?: string;
  address?: string;
  avatar?: string;
  gender?: "Male" | "Female";
  profileId?: string;
  password?: string;
}
