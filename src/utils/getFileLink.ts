import { File } from "@/models/file";

export const getFileLink = (value?: File) => {
  if (!value) {
    return "";
  }
  return `${value.domain}/${value.bucket}/${value.key}`;
};
