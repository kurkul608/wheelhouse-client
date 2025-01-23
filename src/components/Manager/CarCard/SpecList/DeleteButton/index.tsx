"use client";

import { FC, useState } from "react";
import { Button } from "@telegram-apps/telegram-ui";
import { deleteSpecification } from "@/actions/manager/specifications/delete";
import { useRouter } from "next/navigation";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
interface DeleteButtonProps {
  specificationId: string;
  disabled?: boolean;
}
export const DeleteButton: FC<DeleteButtonProps> = ({
  specificationId,
  disabled,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const lp = useLaunchParams();
  const router = useRouter();

  const deleteHandler = async () => {
    await deleteSpecification(
      specificationId,
      getAuthorization(lp) as AxiosHeaders,
    );
    setIsLoading(false);
    router.refresh();
  };

  return (
    <Button
      type={"button"}
      loading={isLoading}
      onClick={async () => {
        if (!isLoading || !disabled) {
          setIsLoading(true);
          await deleteHandler();
        }
      }}
      disabled={disabled}
    >
      Удалить
    </Button>
  );
};
