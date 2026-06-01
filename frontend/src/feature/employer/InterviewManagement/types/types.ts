export type Interview = {
  id: number;

  scheduleTime: string; // ISO string

  location: string;

  status: InterviewStatus;

  result?: InterviewResult;

  note?: string;

  application: {
    id: number;

    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
    };

    job: {
      id: number;
      title: string;
    };
  };
};