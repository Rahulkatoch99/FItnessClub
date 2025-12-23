import { Staff } from "../types";
import { Member } from "./types";

const today = new Date();

export const data: Member[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    username: "user@gmail.com",
    password: "123",
    phone: "9876543210",
    plan: "Gold",
    fees: "2500",
    membership_month: "3",
    joinDate: "2024-12-01",
    dueDate: "2025-02-28",
    address: "Sector 15, Noida, Uttar Pradesh",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Karan Singh",
    username: "9087654321",
    password: "123",
    phone: "9087654321",
    plan: "Silver",
    fees: "3600",
    membership_month: "4",
    joinDate: "2024-11-15",
    dueDate: "2025-12-11",
    address: "Rohini, Delhi",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Aman Verma",
    username: "9001234567",
    password: "123",
    phone: "9001234567",
    plan: "Platinum",
    fees: "4500",
    membership_month: "6",
    joinDate: "2024-10-20",
    dueDate: "2025-06-20",
    address: "Indirapuram, Ghaziabad",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Vikram Patel",
    username: "9990123456",
    password: "123",
    phone: "9990123456",
    plan: "Bronze",
    fees: "1800",
    membership_month: "1",
    joinDate: "2025-01-05",
    dueDate: "2025-02-05",
    address: "Navrangpura, Ahmedabad",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Rajesh Kumar",
    username: "8700123498",
    password: "123",
    phone: "8700123498",
    plan: "Gold",
    fees: "2500",
    membership_month: "3",
    joinDate: "2024-12-18",
    dueDate: "2026-03-18",
    address: "Kankarbagh, Patna",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Sanjay Gupta",
    username: "9102345678",
    password: "123",
    phone: "9102345678",
    plan: "Silver",
    fees: "3600",
    membership_month: "4",
    joinDate: "2024-09-10",
    dueDate: "2025-01-10",
    address: "Civil Lines, Prayagraj",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "Anjali Sharma",
    username: "9801237654",
    password: "123",
    phone: "9801237654",
    plan: "Platinum",
    fees: "4500",
    membership_month: "6",
    joinDate: "2024-07-12",
    dueDate: "2025-01-12",
    address: "Malviya Nagar, Jaipur",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "Pooja Mehta",
    username: "9854653212",
    password: "123",
    phone: "9854653212",
    plan: "Gold",
    fees: "2500",
    membership_month: "3",
    joinDate: "2025-01-02",
    dueDate: "2025-04-02",
    address: "Satellite, Ahmedabad",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 9,
    name: "Harsh Yadav",
    username: "9988776655",
    password: "123",
    phone: "9988776655",
    plan: "Bronze",
    fees: "1800",
    membership_month: "1",
    joinDate: "2024-12-28",
    dueDate: "2025-01-28",
    address: "Alambagh, Lucknow",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 10,
    name: "Rohit Verma",
    username: "9090909090",
    password: "123",
    phone: "9090909090",
    plan: "Silver",
    fees: "3600",
    membership_month: "4",
    joinDate: "2024-08-17",
    dueDate: "2026-12-17",
    address: "Rajendra Nagar, Indore",
    avatar: "https://i.pravatar.cc/150?img=10",
  },

  // ---- continuing pattern ----

  {
    id: 40,
    name: "Rajat Kapoor",
    username: "9223344556",
    password: "123",
    phone: "9223344556",
    plan: "Platinum",
    fees: "4500",
    membership_month: "6",
    joinDate: "2024-06-01",
    dueDate: "2024-12-01",
    address: "Karol Bagh, New Delhi",
    avatar: "https://i.pravatar.cc/150?img=40",
  },
]
.map((member) => {
  const due = new Date(member.dueDate);

  const diffTime = due.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24); // difference in days

  let status: "Active" | "Pending" | "Expired" = "Active";

  if (diffDays < 0) {
    status = "Expired"; // due date passed
  } else if (diffDays <= 7) {
    status = "Pending"; // within 1 week
  } else {
    status = "Active"; // more than 1 week away
  }

  return {
    ...member,
    status,
  };
});

export const staffData: Staff[] = [
  {
    id: 1,
    name: "Jeet",
    role: "Trainer",
    phone: "9876543210",
    email: "jeet@gmail.com",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Aazad",
    role: "Trainer",
    phone: "9876501234",
    email: "aazad@gmail.com",
    status: "On Leave",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Praveen",
    role: "Receptionist",
    phone: "9876501234",
    email: "praveen@gmail.com",
    status: "On Leave",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 4,
    name: "Deep",
    role: "Receptionist",
    phone: "9876501234",
    email: "deep@gmail.com",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 5,
    name: "Jeetu",
    role: "Cleaner",
    phone: "9990123456",
    email: "jeetu@gmail.com",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Nikhil",
    role: "Trainer",
    phone: "9988776655",
    email: "nikhil@gmail.com",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];
