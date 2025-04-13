import { Form, useFormik } from "formik";
import { Button, Input, Subheadline } from "@telegram-apps/telegram-ui";
import { MessageLink } from "@/models/messageTemplate";
import { FC, useEffect } from "react";
import { classNames } from "@telegram-apps/sdk-react";
import * as yup from "yup";

interface ILinkFormProps {
  addLink(link: MessageLink): Promise<void>;
  modalHandler(): void;
  linkForUpdate: MessageLink | null;
}
export const LinkForm: FC<ILinkFormProps> = ({
  addLink,
  modalHandler,
  linkForUpdate,
}) => {
  const validationSchema = yup.object({
    label: yup.string().required("Название ссылки обязательно"),
    value: yup
      .string()
      .url("Значение должно быть корректной ссылкой")
      .required("Ссылка обязательна"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: { label: "", value: "" },
    onSubmit: async (values, formikHelpers) => {
      await addLink(values);
      formikHelpers.resetForm();
      modalHandler();
    },
  });

  useEffect(() => {
    if (linkForUpdate) {
      formik.setValues({
        value: linkForUpdate.value,
        label: linkForUpdate.label,
      });
    }
  }, [linkForUpdate]);

  return (
    <Form onSubmit={formik.submitForm}>
      <div>
        <Subheadline>Название ссылки</Subheadline>
        <Input
          disabled={!!linkForUpdate}
          value={formik.values.label}
          name={"label"}
          id={"label"}
          onChange={formik.handleChange}
        />
        {formik.touched.label && formik.errors.label && (
          <div style={{ color: "red" }}>{formik.errors.label}</div>
        )}
      </div>
      <div className={"mt-2"}>
        <Subheadline>Ссылка</Subheadline>
        <Input
          disabled={!!linkForUpdate}
          value={formik.values.value}
          name={"value"}
          id={"value"}
          onChange={formik.handleChange}
        />
        {formik.touched.value && formik.errors.value && (
          <div style={{ color: "red" }}>{formik.errors.value}</div>
        )}
      </div>
      <div className={"mt-2 flex justify-center"}>
        <Button
          type={"submit"}
          className={classNames({ hidden: linkForUpdate })}
        >
          {linkForUpdate ? "Обновить ссылку" : "Добавить ссылку"}
        </Button>
      </div>
    </Form>
  );
};
