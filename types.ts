
export type UserRole = 'ADMIN' | 'VOTER' | 'GUEST';

export interface User {
  id: string;
  name: string;
  email: string;
  voterId?: string;
  hasVoted: boolean;
  role: UserRole;
  password?: string;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  description: string;
  imageUrl: string;
  voteCount: number;
}

export interface Vote {
  id: string;
  voterId: string;
  candidateId: string;
  timestamp: string;
}

export interface SystemStats {
  totalVoters: number;
  totalVotes: number;
  participationRate: number;
}
