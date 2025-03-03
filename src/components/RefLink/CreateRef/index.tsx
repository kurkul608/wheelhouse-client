"use client";

import { Modal } from "@/components/Modal";
import { useState } from "react";
import { Button, Input, List, Title } from "@telegram-apps/telegram-ui";
import { useFormik } from "formik";
import { createRefCode } from "@/admin/refCode/createRef";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { useRouter } from "next/navigation";

interface FormValues {
  startDate?: string;
  name: string;
}

export const CreateRefLink = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setIsloading] = useState(false);
  const lp = useLaunchParams();
  const router = useRouter();

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { handleSubmit, values, handleChange, resetForm } =
    useFormik<FormValues>({
      initialValues: {
        startDate: undefined,
        name: "",
      },
      onSubmit: async (values) => {
        setIsloading(true);
        const refCode = await createRefCode(
          values.name,
          getAuthorization(lp) as AxiosHeaders,
        );
        if (refCode) {
          router.refresh();
          modalHandler();
          resetForm();
        }
        setIsloading(false);
      },
    });

  return (
    <div id={"create-ref-link"}>
      <div className={"flex "}>
        <Button onClick={modalHandler}>
          Добавить новую реферальную ссылку
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={modalHandler}
        elementId={"create-ref-link"}
      >
        <form onSubmit={handleSubmit}>
          <List style={{ backgroundColor: "var(--tgui--bg_color)" }}>
            <Title className={"mb-4"}>Название реферальной ссылки</Title>
            <Input
              type={"text"}
              value={values.name}
              onChange={handleChange}
              name={"name"}
              header={"Название реферальной ссылки"}
              placeholder={"Название реферальной ссылки"}
            />
            {/*<Title className={"mb-4"}>Дата</Title>*/}
          </List>
          <Button type={"submit"} loading={loading}>
            Добавить реферальный код
          </Button>
        </form>
      </Modal>
    </div>
  );
};
