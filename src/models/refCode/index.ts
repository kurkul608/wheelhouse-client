export interface RefCodeModel {
  id: string;
  name: string;
  startDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpandedRefCodeModel extends RefCodeModel {
  usersCount: number;
  usersWithOrderCount: number;
}
