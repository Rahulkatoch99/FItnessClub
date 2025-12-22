export interface MembershipType {
  id: number;
  title: string;
  duration: string;
  price: number;
  status: "Active" | "Inactive";
  features: string[];
}

export const membershipTypeData: MembershipType[] = [
  {
    id: 1,
    title: "Basic Membership",
    duration: "1 Month",
    price: 1300,
    status: "Active",
    features: [
      "Weight Training",
      "Cardio",
      "Crossfit",
      "Yoga",
      "Zumba",
    ],
  },
  {
    id: 2,
    title: "Silver Membership",
    duration: "2 Months",
    price: 2200,
    status: "Active",
    features: [
      "Weight Training",
      "Cardio",
      "Crossfit",
      "Yoga",
      "Zumba",
    ],
  },
  {
    id: 2,
    title: "Gold Membership",
    duration: "3 Months",
    price: 3000,
    status: "Active",
    features: [
      "Weight Training",
      "Cardio",
      "Crossfit",
      "Yoga",
      "Zumba",
    ],
  },
  {
    id: 2,
    title: "Pro Membership",
    duration: "6 Months",
    price: 5200,
    status: "Active",
    features: [
      "Weight Training",
      "Cardio",
      "Crossfit",
      "Yoga",
      "Zumba",
    ],
  },

  {
    id: 3,
    title: "Premium Membership",
    duration: "1 Year",
    price: 9000,
    status: "Active",
    features: [
      "Weight Training",
      "Cardio",
      "Crossfit",
      "Yoga",
      "Zumba",
    ],
  },
];
