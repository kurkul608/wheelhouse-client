"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/s3";

export const createS3Service = async (uploadParams: PutObjectCommand) => {
  try {
    const upld = await s3Client.send(uploadParams);
    console.log("upload data: ", upld);
    return "File uploaded successfully";
  } catch (error) {
    console.log("Error with uploadL ", error);
    throw error;
  }
};
