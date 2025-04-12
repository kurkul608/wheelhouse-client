import { FileModel } from "@/models/file";

export const getFileLink = (value?: FileModel) => {
  if (!value) {
    return "";
  }
  return `${value.domain}/${value.bucket}/${value.key}`;
};
