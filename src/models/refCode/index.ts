export interface RefCodeModel {
  id: string;
  name: string;
  clicks?: number;
  startDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpandedRefCodeModel extends RefCodeModel {
  usersCount: number;
  usersWithOrderCount: number;
}
