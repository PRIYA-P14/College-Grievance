export const mockComplaints = [
  {
    id: "G-1001",
    category: "Hostel",
    title: "Water supply disruption",
    description: "The hostel water supply has been inconsistent for the last week.",
    status: "In Progress",
    createdAt: "2026-02-11T08:00:00Z",
    remarks: "Maintenance team notified. Awaiting spare parts.",
    escalated: false,
    department: "Hostel Management",
    rating: null,
    studentId: "S-501"
  },
  {
    id: "G-1002",
    category: "Academic",
    title: "Delayed grade updates",
    description: "Grades for last semester are still missing in the portal.",
    status: "Resolved",
    createdAt: "2026-02-09T10:30:00Z",
    remarks: "Faculty uploaded grades. Please verify.",
    escalated: false,
    department: "Academic Affairs",
    rating: 4,
    studentId: "S-502"
  },
  {
    id: "G-1003",
    category: "Harassment",
    title: "Anonymous safety concern",
    description: "There have been recurring incidents near the library after 9 PM.",
    status: "Escalated",
    createdAt: "2026-02-08T12:15:00Z",
    remarks: "Escalated to security & student welfare committee.",
    escalated: true,
    department: "Security",
    rating: null,
    studentId: "S-503"
  }
];
