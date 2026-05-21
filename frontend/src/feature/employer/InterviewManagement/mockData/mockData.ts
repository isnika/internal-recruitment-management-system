import type { Interview } from "./types/types";

export const mockData: Interview[] = [
  {
    id: 1,
    candidateName: "Nguyen Van A",
    jobTitle: "Frontend Developer",
    interviewer: "HR Team A",
    date: "2026-05-22",
    time: "09:00",
    status: "SCHEDULED",

    candidateEmail: "vana@gmail.com",
    candidatePhone: "0901234567",
    duration: "60m",
    locationType: "ONLINE",
    meetingLink: "https://meet.google.com/abc-defg-hij",

    createdAt: "2026-05-20",
    updatedAt: "2026-05-21",
    createdBy: "HR Admin",

    notes: "Candidate is strong in React fundamentals.",
  },

  {
    id: 2,
    candidateName: "Tran Thi B",
    jobTitle: "Backend Developer",
    interviewer: "HR Team B",
    date: "2026-05-21",
    time: "14:00",
    status: "DONE",

    candidateEmail: "thib@gmail.com",
    candidatePhone: "0912345678",
    duration: "45m",
    locationType: "OFFLINE",
    location: "Company Office - District 1",

    result: "PASSED",
    score: 8.5,
    feedback: "Good system design knowledge, strong Node.js skills.",

    createdAt: "2026-05-19",
    updatedAt: "2026-05-21",
    createdBy: "HR Admin",

    notes: "Recommended for next round technical interview.",
  },

  {
    id: 3,
    candidateName: "Le Van C",
    jobTitle: "UI/UX Designer",
    interviewer: "Design Lead",
    date: "2026-05-20",
    time: "10:30",
    status: "CANCELLED",

    candidateEmail: "vanc@gmail.com",
    candidatePhone: "0923456789",
    duration: "30m",
    locationType: "ONLINE",
    meetingLink: "https://meet.google.com/cancel-demo",

    result: "PENDING",
    feedback: "Candidate requested to reschedule.",

    createdAt: "2026-05-18",
    updatedAt: "2026-05-19",
    createdBy: "HR Admin",

    notes: "Cancelled due to candidate schedule conflict.",
  },

  {
    id: 4,
    candidateName: "Pham Thi D",
    jobTitle: "Fullstack Developer",
    interviewer: "Tech Lead",
    date: "2026-05-23",
    time: "11:00",
    status: "SCHEDULED",

    candidateEmail: "thid@gmail.com",
    candidatePhone: "0934567890",
    duration: "90m",
    locationType: "ONLINE",
    meetingLink: "https://meet.google.com/fullstack-demo",

    createdAt: "2026-05-21",
    updatedAt: "2026-05-21",
    createdBy: "HR Admin",

    notes: "Focus on React + Spring Boot interview.",
  },
];