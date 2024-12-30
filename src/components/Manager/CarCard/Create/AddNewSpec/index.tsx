"use client";

import { ReactNode, useState } from "react";
import { Modal } from "@telegram-apps/telegram-ui";

export const AddNewSpec = ({
  // isShow,
  // isShowHandler,
  trigger,
}: {
  //   isShow: boolean;
  //   isShowHandler(): void;
  trigger: ReactNode;
}) => {
  // const [showModal, setShowModal] = useState(false);

  return (
    <Modal header={"Добавить новую характеристику"} trigger={trigger}></Modal>
  );
};
