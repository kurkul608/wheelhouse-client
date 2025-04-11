"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAuthorization } from "@/utils/getAuthorization";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { File as FileModel } from "@/models/file";

interface Photo {
  id: string;
  file: File;
  preview: string;
  status: "pending" | "success" | "error";
  errorMessage?: string;
}

interface IMultiPhotoUploadProps {
  onUpload(file: FileModel): Promise<void>;
}

export const MultiPhotoUpload: React.FC<IMultiPhotoUploadProps> = ({
  onUpload,
}) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const lp = useLaunchParams();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);

    const newPhotos: Photo[] = fileArray.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: "pending",
    }));

    setPhotos(newPhotos);

    const updatedPhotos = [...newPhotos];
    for (let i = 0; i < updatedPhotos.length; i++) {
      const photo = updatedPhotos[i];
      const formData = new FormData();
      formData.append("file", photo.file);
      formData.append("token", JSON.stringify(getAuthorization(lp)));

      try {
        const res = await fetch("/api/uploadPhoto", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Ошибка загрузки файла:", errorText);
          updatedPhotos[i].status = "error";
          updatedPhotos[i].errorMessage = errorText;
        } else {
          const data = await res.json();

          if (data.uploadedFile && onUpload) {
            await onUpload(data.uploadedFile);
          }
          console.log("Файл успешно загружен:", data);
          updatedPhotos[i].status = "success";
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
        updatedPhotos[i].status = "error";
        updatedPhotos[i].errorMessage = (error as Error).message;
      }
      setPhotos([...updatedPhotos]);
    }

    router.refresh();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // const updateHandler = () => {
  //   router.refresh();
  //   if (inputRef.current) {
  //     inputRef.current.value = "";
  //   }
  // };

  return (
    <div>
      <input ref={inputRef} type="file" multiple onChange={handleFileChange} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Image
              src={photo.preview}
              alt={photo.file.name}
              style={{ width: "100px", height: "auto", objectFit: "cover" }}
              width={100}
              height={100}
            />
            <div>
              <div>{photo.file.name}</div>
              <div>{(photo.file.size / 1024).toFixed(2)} KB</div>
              <div>
                {photo.status === "success" && (
                  <span style={{ color: "green" }}>Загружено</span>
                )}
                {photo.status === "error" && (
                  <span style={{ color: "red" }}>
                    Ошибка загрузки{" "}
                    {photo.errorMessage && `(${photo.errorMessage})`}
                  </span>
                )}
                {photo.status === "pending" && <span>Загрузка...</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*<Button onClick={updateHandler}>Обновить старницу</Button>*/}
    </div>
  );
};
