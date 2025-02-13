import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { createS3Service } from "@/actions/s3/create.s3.service";
import { createFile } from "@/actions/file/create";
import { AxiosHeaders } from "axios";
import { addToCarCard } from "@/actions/file/addToCarCard";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const token = JSON.parse(formData.get("token") as string) as AxiosHeaders;
    const carCardId = formData.get("carCardId") as string;
    console.log(`Parsed token: ${token}`);
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const key = `uploads/${Date.now()}-${file.name}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    await createS3Service(command);

    const uploadedFile = await createFile(
      key,
      process.env.NEXT_PUBLIC_S3_BUCKET || "",
      String(buffer.byteLength),
      token,
    );

    await addToCarCard(uploadedFile.id, carCardId, token);

    return NextResponse.json({ message: "File uploaded successfully", key });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 },
    );
  }
}
