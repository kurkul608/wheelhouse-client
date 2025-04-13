"use client";

import { useFormikContext } from "formik";
import { Button, Cell, Subheadline } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { CreateMessageTemplateFormValues } from "@/components/MessageTemplate/MessageTemplateForm";
import { MessageLink } from "@/models/messageTemplate";
import { Modal } from "@/components/Modal";
import { LinkForm } from "@/components/MessageTemplate/MessageTemplate/CreateLink/LinkForm";

export const CreateLink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [linkForUpdate, setLinkForUpdate] = useState<null | MessageLink>(null);
  const { values, setFieldValue } =
    useFormikContext<CreateMessageTemplateFormValues>();

  const onDelete = async (linkForDelete: MessageLink) => {
    await setFieldValue(
      "links",
      values.links.filter((link) => link.value !== linkForDelete.value),
    );
  };

  const addLink = async (link: MessageLink) => {
    await setFieldValue("links", [...values.links, link]);
  };

  const modalHandler = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setLinkForUpdate(null);
    }
  };

  return (
    <div className={"mt-2"} id={"create-link"}>
      <Subheadline>Ссылки к сообщению</Subheadline>
      <div className={"relative"}>
        {values.links.map((link) => (
          <Cell
            key={link.value}
            after={
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete(link);
                }}
              >
                Удалить
              </Button>
            }
            onClick={() => {
              modalHandler();
              setLinkForUpdate(link);
            }}
          >
            {link.label}
          </Cell>
        ))}
      </div>
      <div className={"flex"}>
        <Modal isOpen={isOpen} onClose={modalHandler} elementId={"create-link"}>
          <LinkForm
            addLink={addLink}
            modalHandler={modalHandler}
            linkForUpdate={linkForUpdate}
          />
        </Modal>
        <Button onClick={modalHandler}>Добавить</Button>
      </div>
    </div>
  );
};
