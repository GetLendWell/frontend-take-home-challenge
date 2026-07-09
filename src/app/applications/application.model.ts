export type ApplicationStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

export interface Application {
  id: string;
  applicantName: string;
  status: ApplicationStatus;
  submittedAt: string; // ISO date, e.g. "2026-03-01"
  loanAmount: number;
}
