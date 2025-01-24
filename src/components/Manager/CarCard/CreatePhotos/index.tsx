"use client";

import { Button, Cell, FileInput } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getAuthorization } from "@/utils/getAuthorization";
import { createFile } from "@/actions/file/create";
import Image from "next/image";
import { addToCarCard } from "@/actions/file/addToCarCard";
import { useRouter } from "next/navigation";

export const CreatePhotos = ({ carId }: { carId: string }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const lp = useLaunchParams();
  const router = useRouter();

  const isSuitableSize = (file: File) => {
    const maxSize = 1024 * 1024;
    if (file.size > maxSize) {
      alert("Размер файла не должен превышать 1 МБ");
    }
    return file.size <= maxSize;
  };

  const isSuitableType = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    // alert("Файл должен быть изображением (jpg, jpeg, png)");
    console.log(allowedTypes.includes(file.type));
    return true;
  };

  const handleUpload = async () => {
    if (!loading && files) {
      let isCorrectFile = true;
      for (const file of files) {
        if (!isSuitableSize(file) || !isSuitableType(file)) {
          isCorrectFile = false;
        }
      }
      if (isCorrectFile) {
        const fileResponse: string[] = [];
        for (const file of files) {
          const f = await createFile(file, getAuthorization(lp));
          fileResponse.push(f.id);
        }

        for (const fileId of fileResponse) {
          await addToCarCard(fileId, carId, getAuthorization(lp));
        }
        setFiles(null);
        router.refresh();
      }
    }
    setLoading(false);
  };

  const removeFile = (fileIndex: number) => {
    if (files) {
      const dataTransfer = new DataTransfer();
      Array.from(files).forEach((file, index) => {
        if (index !== fileIndex) {
          dataTransfer.items.add(file);
        }
      });
      setFiles(dataTransfer.files);
    }
  };

  return (
    <>
      <FileInput
        title={"Добавить фото"}
        accept="image/jpeg,image/png,image/jpg"
        onChange={(event) => setFiles(event.target.files)}
      >
        {files &&
          Array.from(files).map((file, fileIndex) => (
            <Cell
              key={file.name}
              before={
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={100}
                  height={100}
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
                />
              }
              subtitle={`${file.size} bytes`}
              after={
                <Button
                  mode={"bezeled"}
                  onClick={() => {
                    removeFile(fileIndex);
                  }}
                  type={"button"}
                >
                  Удалить
                </Button>
              }
            >
              {file.name}
            </Cell>
          ))}
      </FileInput>
      <Button
        onClick={() => {
          setLoading(true);
          handleUpload();
        }}
        type={"button"}
        loading={loading}
      >
        Добавить выбранные фото к карточке авто
      </Button>
      {/*{loading && <Spinner size={"l"} />}*/}
    </>
  );
};
