export interface userType {
  _id: string;
  name: string;
  email: string;
  role: string;
  notes?: noteType[];
  createdAt: Date;
  updatedAt: Date;
}
export interface noteType {
  _id: string;
  title: string;
  description: string;
  category: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
