import { CarCardSpecifications } from "@/models/carCardSpecification";
import { FC } from "react";
import { Avatar } from "@telegram-apps/telegram-ui";
import { Generation } from "@/components/Icons/Generation";
import { Year } from "@/components/Icons/Year";
import { Body } from "@/components/Icons/Body";
import { Engine } from "@/components/Icons/Engine";
import { Ruble } from "@/components/Icons/Ruble";
import { Transmission } from "@/components/Icons/Transmission";
import { Drive } from "@/components/Icons/Drive";
import { Color } from "@/components/Icons/Color";
import { Vin } from "@/components/Icons/Vin";

interface AvatarBySpecificationProps {
  specification: CarCardSpecifications;
}
export const AvatarBySpecification: FC<AvatarBySpecificationProps> = ({
  specification,
}) => {
  switch (specification.field) {
    case "generation":
      return (
        <Avatar size={48}>
          <Generation color={"var(--tgui--accent_text_color)"} />
        </Avatar>
      );

    case "year":
      return (
        <Avatar size={48}>
          <Year color={"var(--tgui--accent_text_color)"} />
        </Avatar>
      );

    case "body":
      return (
        <Avatar size={48}>
          <Body color={"var(--tgui--accent_text_color)"} />
        </Avatar>
      );

    case "engine":
      return (
        <Avatar size={48}>
          <Engine color={"var(--tgui--accent_text_color)"} />
        </Avatar>
      );

    case "tax":
      return (
        <Avatar size={48}>
          <Ruble color={"var(--tgui--accent_text_color)"} />
        </Avatar>
      );

    case "transmission":
      return (
        <Avatar size={48}>
          <Transmission color={"var(--tgui--accent_text_color)"} />
        </Avatar>
      );

    case "drive":
      return (
        <Avatar size={48}>
          <Drive color={"var(--tgui--accent_text_color)"} />
        </Avatar>
      );

    case "color_ext":
    case "color_int":
      return (
        <Avatar size={48}>
          <Color color={"var(--tgui--accent_text_color)"} />
        </Avatar>
      );

    case "vin":
      return (
        <Avatar size={48}>
          <Vin color={"var(--tgui--accent_text_color)"} />
        </Avatar>
      );

    default:
      return (
        <Avatar size={48}>
          <Generation color={"var(--tgui--accent_text_color)"} />
        </Avatar>
      );
  }
};
