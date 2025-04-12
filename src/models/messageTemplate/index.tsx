import { FileModel } from "@/models/file";
export interface MessageTemplate {
  id: string;
  name: string;
  text: string;
  links: string[];
  photoIds: string[];
  photos: FileModel[];

  createdAt: string;
  updatedAt: string;
}
