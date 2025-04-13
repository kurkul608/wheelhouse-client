import { FileModel } from "@/models/file";

export interface MessageLink {
  label: string;
  value: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  text: string;
  links: MessageLink[];
  photoIds: string[];
  photos: FileModel[];

  createdAt: string;
  updatedAt: string;
}
