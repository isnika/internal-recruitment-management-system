export type InterviewStatus = "SCHEDULED" | "DONE" | "CANCELLED";

export type Interview = {
  id: number;
  candidateName: string;
  jobTitle: string;
  interviewer: string;
  date: string;
  time: string;
  status: InterviewStatus;
};