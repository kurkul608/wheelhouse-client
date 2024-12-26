"use client";

import { useContext } from "react";
import { BucketContext } from "@/contexts/bucketContext";
import { Avatar, Cell, Section } from "@telegram-apps/telegram-ui";
import { useRouter } from "next/navigation";
import { deleteFromBucket } from "@/actions/bucket/deleteTo";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getAuthorization } from "@/utils/getAuthorization";
import { useMainButton } from "@/hooks/useMainButton";
import { TrashSvg } from "@/components/Bucket/Icons";

export const Bucket = () => {
  const lp = useLaunchParams();
  const { bucket, update } = useContext(BucketContext);
  const router = useRouter();

  useMainButton({
    main: true,
    text: "Продолжить оформление",
    mainButtonOnClick: () => {
      console.log("Продолжить оформление нажато ");
    },
  });

  return (
    <Section
      header={"Ваша корзина:"}
      footer={
        "Нажмите на кнопку «Продолжить оформление», и с вами свяжется наш менеджер"
      }
    >
      {bucket?.BucketCarCard.map((bucket) => {
        const model = bucket.carCard.specifications?.find(
          (spec) => spec.field === "model",
        );
        const specification = bucket.carCard.specifications?.find(
          (spec) => spec.field === "specification",
        );

        const onCellClick = () => {
          const targetURL = new URL(
            `cars/${bucket.carCardId}`,
            window.location.toString(),
          );
          router.push(`${targetURL.toString()}`);
        };

        return (
          <Cell
            key={bucket.id}
            subtitle={specification?.value || ""}
            before={
              <Avatar
                size={48}
                src={bucket.carCard?.importedPhotos[0] ?? undefined}
              />
            }
            onClick={onCellClick}
            after={
              <TrashSvg
                onClick={async (e) => {
                  e.stopPropagation();
                  const headers = getAuthorization(lp);
                  await deleteFromBucket(bucket.carCardId, headers);
                  if (update) {
                    await update();
                  }
                }}
              />
            }
          >
            {model?.value || ""}
          </Cell>
        );
      })}
    </Section>
  );
};
